# 📱 MangaKu - Versi Windows Desktop

Aplikasi baca manga untuk Windows (7/8/10/11) yang bisa dijalankan secara offline.

## 🖥️ Spesifikasi Sistem

| Komponen | Minimum | Rekomendasi |
|----------|---------|-------------|
| OS | Windows 7 SP1 | Windows 10/11 |
| RAM | 2 GB | 4 GB+ |
| Storage | 200 MB | 500 MB |
| Display | 1024x768 | 1920x1080 |

## 🚀 Cara Install & Jalankan

### Metode 1: Jalankan Langsung (Paling Mudah)

1. **Double-click** file `setup-windows.bat`
   - Script akan otomatis install semua dependencies
   - Tunggu sampai selesai

2. **Double-click** file `run-windows.bat`
   - Aplikasi MangaKu akan terbuka
   - Siap digunakan!

### Metode 2: Buat Installer (.exe)

1. **Double-click** file `build-windows.bat`
   - Script akan build aplikasi
   - Membuat installer Windows (.exe)
   - File installer ada di folder `release/`

2. **Install aplikasi**:
   - Buka folder `release/`
   - Double-click `MangaKu-1.0.0-Setup.exe`
   - Ikuti wizard instalasi
   - Selesai!

### Metode 3: Manual (Command Line)

Buka Command Prompt atau PowerShell di folder project:

```bash
# Install dependencies
npm install

# Build aplikasi web
npm run build

# Jalankan aplikasi
npx electron electron/main.js

# ATAU buat installer
npx electron-builder --win --config electron-builder.yml
```

## 📦 Struktur File Windows

```
mangaku/
├── electron/
│   ├── main.js          # Main process Electron
│   └── preload.js       # Preload script
├── electron-builder.yml # Konfigurasi build
├── setup-windows.bat    # Script setup awal
├── run-windows.bat      # Script jalankan aplikasi
├── build-windows.bat    # Script build installer
└── release/             # Folder hasil build (setelah build)
    ├── MangaKu-1.0.0-Setup.exe      # Installer
    └── MangaKu-1.0.0-Portable.exe   # Versi portable
```

## ⚙️ Konfigurasi package.json

Tambahkan field berikut ke `package.json` untuk integrasi Electron yang lebih baik:

```json
{
  "name": "mangaku",
  "version": "1.0.0",
  "main": "electron/main.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "electron": "electron electron/main.js",
    "electron-dev": "concurrently \"npm run dev\" \"wait-on http://localhost:3000 && electron electron/main.js\"",
    "build-win": "electron-builder --win --config electron-builder.yml",
    "build-all": "electron-builder --win --mac --linux --config electron-builder.yml"
  },
  "build": {
    "appId": "com.mangaku.app",
    "productName": "MangaKu",
    "files": [
      "dist/**/*",
      "electron/**/*",
      "public/**/*"
    ],
    "win": {
      "target": ["nsis", "portable"],
      "icon": "public/icon.svg"
    }
  }
}
```

## 🎮 Fitur Aplikasi Windows

### Keyboard Shortcuts

| Shortcut | Fungsi |
|----------|--------|
| `Ctrl + R` | Refresh halaman |
| `Ctrl + +` | Zoom in |
| `Ctrl + -` | Zoom out |
| `Ctrl + 0` | Reset zoom |
| `F11` | Toggle fullscreen |
| `F12` | Toggle DevTools |
| `Ctrl + Q` | Keluar aplikasi |

### Fitur Utama

- ✅ **Offline Mode** - Baca manga tanpa internet
- ✅ **Auto-save Progress** - Progress baca tersimpan otomatis
- ✅ **Download Chapter** - Download untuk baca offline
- ✅ **Bookmark** - Tandai manga favorit
- ✅ **Dark Theme** - Nyaman untuk membaca
- ✅ **Touch Support** - Support layar sentuh (tablet)
- ✅ **Multi-window** - Bisa buka beberapa manga

## 🔧 Troubleshooting

### Error: "Node.js tidak ditemukan"
- Download dan install Node.js dari https://nodejs.org/
- Pilih versi LTS
- Restart Command Prompt setelah install

### Error: "Electron tidak ditemukan"
```bash
npm install electron --save-dev
```

### Error: "Build gagal"
```bash
# Hapus node_modules dan install ulang
rmdir /s /q node_modules
del package-lock.json
npm install
npm run build
```

### Aplikasi tidak terbuka
```bash
# Jalankan dengan log
npx electron electron/main.js --enable-logging
```

### Installer tidak bisa diinstall
- Matikan antivirus sementara
- Run as Administrator
- Cek apakah Windows SmartScreen memblokir

## 📊 Ukuran Aplikasi

| Tipe | Ukuran |
|------|--------|
| Source code | ~50 MB |
| Build (dist) | ~5 MB |
| Installer (.exe) | ~80 MB |
| Portable (.exe) | ~75 MB |
| Installed | ~150 MB |

## 🔄 Update Aplikasi

```bash
# Pull update dari repository
git pull

# Install dependencies baru (jika ada)
npm install

# Build ulang
npm run build

# Jalankan ulang
run-windows.bat
```

## 📝 Catatan Penting

1. **First Run**: Saat pertama kali dijalankan, aplikasi akan download beberapa resource
2. **Storage**: Data tersimpan di `%APPDATA%/MangaKu`
3. **Uninstall**: Gunakan Control Panel → Programs → Uninstall
4. **Portable**: Versi portable bisa dijalankan dari USB flash drive

## 🆘 Bantuan

Jika ada masalah:
1. Cek log di `%APPDATA%/MangaKu/log.log`
2. Jalankan dengan `--enable-logging` untuk debug
3. Pastikan semua dependencies terinstall
4. Cek requirements sistem minimum

---

**Made with ❤️ for Windows users**
