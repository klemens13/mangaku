@echo off
echo ========================================
echo   MangaKu - Build untuk Windows
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

echo [1/4] Mengecek dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Gagal install dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Building aplikasi web...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Gagal build aplikasi
    pause
    exit /b 1
)

echo.
echo [3/4] Membuat installer Windows...
call npx electron-builder --win --config electron-builder.yml
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Gagal membuat installer
    pause
    exit /b 1
)

echo.
echo [4/4] Selesai!
echo.
echo ========================================
echo   Installer tersedia di folder: release\
echo ========================================
echo.
pause
