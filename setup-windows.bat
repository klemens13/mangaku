@echo off
echo ========================================
echo   MangaKu - Setup Awal
echo ========================================
echo.
echo Script ini akan menginstall semua dependencies
echo yang diperlukan untuk menjalankan MangaKu.
echo.

:: Cek Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js tidak ditemukan!
    echo.
    echo Silakan download dan install Node.js dari:
    echo https://nodejs.org/
    echo.
    echo Pilih versi LTS (Long Term Support)
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js ditemukan
node --version
echo.

:: Cek npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm tidak ditemukan!
    pause
    exit /b 1
)

echo [OK] npm ditemukan
npm --version
echo.

echo [1/2] Menginstall dependencies utama...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Gagal install dependencies
    pause
    exit /b 1
)

echo.
echo [2/2] Setup selesai!
echo.
echo ========================================
echo   Langkah selanjutnya:
echo.
echo   1. Jalankan: run-windows.bat
echo      (untuk menjalankan aplikasi)
echo.
echo   2. Atau jalankan: build-windows.bat
echo      (untuk membuat installer .exe)
echo ========================================
echo.
pause
