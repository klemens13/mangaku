@echo off
echo ========================================
echo   MangaKu - Konfigurasi Electron
echo ========================================
echo.
echo Script ini akan menambahkan konfigurasi
echo Electron ke package.json
echo.

:: Cek Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js tidak ditemukan!
    pause
    exit /b 1
)

echo [1/2] Menginstall dependencies tambahan...
call npm install concurrently wait-on --save-dev
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Gagal install dependencies
    pause
    exit /b 1
)

echo.
echo [2/2] Mengupdate package.json...
node scripts/setup-electron.js
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Gagal update package.json
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Konfigurasi selesai!
echo.
echo   Sekarang Anda bisa:
echo   1. npm run electron      (jalankan app)
echo   2. npm run build-win     (buat installer)
echo ========================================
echo.
pause
