$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$port = 5173
$url = "http://127.0.0.1:$port/"
$pidPath = Join-Path $projectRoot '.pizarra-ia-dev.pid'
$logPath = Join-Path $projectRoot 'pizarra-ia-dev.log'

Set-Location -LiteralPath $projectRoot

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  throw 'No se encontro npm. Instala Node.js LTS y vuelve a ejecutar este boton.'
}

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot 'node_modules'))) {
  Write-Host 'Instalando dependencias de Nexo...'
  npm install
}

$listener = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $listener) {
  Write-Host 'Iniciando Nexo...'
  $child = Start-Process -FilePath 'cmd.exe' -ArgumentList @('/d', '/c', 'npm run dev -- --host 127.0.0.1 > pizarra-ia-dev.log 2>&1') -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru
  Set-Content -LiteralPath $pidPath -Value $child.Id -Encoding ascii
}

$ready = $false
foreach ($attempt in 1..30) {
  try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2
    if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
      $ready = $true
      break
    }
  } catch {
    Start-Sleep -Milliseconds 500
  }
}

if (-not $ready) {
  throw "Nexo no respondio en $url. Revisa pizarra-ia-dev.log."
}

Start-Process $url
Write-Host "Nexo esta listo: $url"
