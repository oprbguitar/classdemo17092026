$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$pidPath = Join-Path $projectRoot '.pizarra-ia-dev.pid'

if (-not (Test-Path -LiteralPath $pidPath)) {
  Write-Host 'No hay un proceso de Nemo IA registrado.'
  exit 0
}

$processId = (Get-Content -LiteralPath $pidPath -Raw).Trim()
if ($processId -match '^\d+$') {
  $rootId = [int]$processId
  & taskkill.exe /PID $rootId /T /F 2>$null | Out-Null
}

Remove-Item -LiteralPath $pidPath -Force -ErrorAction SilentlyContinue
Write-Host 'Proceso de Nemo IA detenido.'
