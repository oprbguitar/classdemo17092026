@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\Start-PizarraIA.ps1"
if errorlevel 1 (
  echo.
  echo No se pudo iniciar Nemo IA. Revisa el mensaje anterior.
  pause
)
