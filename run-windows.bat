@echo off
echo ========================================
echo   MangaKu - Jalankan di Windows
echo ========================================
echo.

:: Cek Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js tidak ditemukan!
    echo Download dari: https://nodejs.org/
    pause
    exit /b 1
)

echo [1/3] Mengecek dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Gagal install dependencies
    pause
    exit /b 1
)

echo.
echo [2/3] Building aplikasi...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Gagal build aplikasi
    pause
    exit /b 1
)

echo.
echo [3/3] Menjalankan MangaKu...
echo.
echo Tekan Ctrl+C untuk menghentikan aplikasi
echo ========================================
echo.

call npx electron electron/main.js
pause
