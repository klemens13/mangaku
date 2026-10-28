# 📱 MangaKu - Baca Manga Online & Offline

Aplikasi baca manga yang tersedia dalam 2 versi: **Web/PWA** (Android, iOS, Desktop Browser) dan **Desktop** (Windows, macOS, Linux).

![MangaKu](https://img.shields.io/badge/MangaKu-v1.0.0-purple?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 🎯 Pilih Versi Anda

| Versi | Platform | Install | Offline | Ukuran |
|-------|----------|---------|---------|--------|
| 🌐 **Web/PWA** | Android 6+, iOS, Desktop | Via Browser | ✅ | ~5 MB |
| 🖥️ **Desktop** | Windows 7+, macOS, Linux | Installer .exe/.dmg | ✅ | ~80 MB |

---

## 🌐 VERSI 1: WEB/PWA (Android, iOS, Desktop Browser)

### 📱 Spesifikasi Sistem

| Komponen | Minimum | Rekomendasi |
|----------|---------|-------------|
| OS | Android 6.0 / iOS 11 | Android 10+ / iOS 14+ |
| Browser | Chrome 50+ / Safari 11+ | Chrome 90+ / Safari 15+ |
| Storage | 50 MB | 200 MB |
| Internet | Diperlukan saat pertama kali | WiFi untuk download chapter |

### 🚀 Cara Install Web/PWA

#### Deploy ke Server (Pilih salah satu)

**Opsi A: Netlify (Paling Mudah - 2 Menit)**
```bash
1. Buka https://app.netlify.com
2. Login/Daftar
3. Drag & drop folder dist/
4. Dapat URL: https://mangaku-xxx.netlify.app
```

**Opsi B: Vercel**
```bash
1. Buka https://vercel.com
2. Import dari GitHub atau upload manual
3. Auto-deploy setiap push
```

**Opsi C: GitHub Pages**
```bash
1. Upload folder dist/ ke repository GitHub
2. Settings → Pages → Enable
3. URL: https://username.github.io/mangaku
```

**Opsi D: Hosting Manual (cPanel, dll)**
```bash
1. Upload isi folder dist/ ke public_html
2. Pastikan HTTPS aktif (wajib untuk PWA)
```

#### Install di Android

**Via Google Chrome:**
1. Buka URL aplikasi di Chrome
2. Tap **"Install"** pada banner pop-up
3. Atau: Menu **⋮** → **"Install app"**
4. Icon muncul di home screen ✅

**Via Samsung Internet:**
1. Buka URL di Samsung Internet
2. Menu **☰** → **"Add page to"** → **"Home screen"**
3. Selesai!

#### Install di iOS (iPhone/iPad)

**Via Safari:**
1. Buka URL di Safari
2. Tap icon **Share** (kotak dengan panah)
3. Scroll → Tap **"Add to Home Screen"**
4. Tap **"Add"**
5. Icon muncul di home screen ✅

#### Install di Desktop Browser

**Via Chrome/Edge:**
1. Buka URL aplikasi
2. Klik icon **Install** di address bar (📥)
3. Atau: Menu **⋮** → **"Install MangaKu"**
4. Aplikasi terbuka sebagai window terpisah

### 📖 Cara Penggunaan Web/PWA

1. **Baca Online**: Langsung buka chapter yang tersedia
2. **Baca Offline**: 
   - Buka chapter → Tap icon **📥** → **"Download Chapter"**
   - Sekarang bisa dibaca tanpa internet!
3. **Bookmark**: Tap icon **⭐** di halaman detail manga
4. **Progress**: Otomatis tersimpan, lanjutkan baca kapan saja

### ⚙️ Fitur Web/PWA

- ✅ Install sebagai aplikasi native
- ✅ Baca offline setelah download
- ✅ Auto-save progress
- ✅ Bookmark manga favorit
- ✅ Pencarian cepat
- ✅ 2 mode baca (scroll/page-by-page)
- ✅ Dark theme
- ✅ Touch gestures
- ✅ Responsive design
- ✅ Lightweight (~5 MB)

### 🔧 Troubleshooting Web/PWA

| Masalah | Solusi |
|---------|--------|
| Banner install tidak muncul | Gunakan menu browser → "Install app" |
| Tidak bisa install | Pastikan URL menggunakan HTTPS |
| Gambar tidak muncul offline | Download chapter dulu |
| Halaman blank | Clear cache browser, reload |
| Android 6 tidak support | Update Chrome ke versi terbaru |

---

## 🖥️ VERSI 2: DESKTOP (Windows, macOS, Linux)

### 💻 Spesifikasi Sistem

| Komponen | Windows | macOS | Linux |
|----------|---------|-------|-------|
| OS | 7 SP1 / 8 / 10 / 11 | 10.13+ | Ubuntu 18.04+ |
| RAM | 2 GB | 4 GB | 2 GB |
| Storage | 200 MB | 250 MB | 200 MB |
| Display | 1024x768 | 1280x800 | 1024x768 |

### 🚀 Cara Install Desktop

#### Windows

**Metode 1: Jalankan Langsung (Paling Mudah)**
```bash
1. Install Node.js dari https://nodejs.org (LTS)
2. Double-click: setup-windows.bat
3. Tunggu 5-10 menit
4. Double-click: run-windows.bat
5. Aplikasi terbuka! ✅
```

**Metode 2: Buat Installer .exe**
```bash
1. Pastikan sudah jalankan setup-windows.bat
2. Double-click: build-windows.bat
3. Tunggu 10-15 menit
4. Buka folder: release\
5. Install: MangaKu-1.0.0-Setup.exe
```

**Metode 3: Command Line**
```bash
# Install dependencies
npm install

# Build aplikasi
npm run build

# Jalankan
npx electron electron/main.js

# Buat installer
npx electron-builder --win --config electron-builder.yml
```

#### macOS

```bash
# Install dependencies
npm install

# Build aplikasi
npm run build

# Jalankan
npx electron electron/main.js

# Buat installer .dmg
npx electron-builder --mac --config electron-builder.yml
```

#### Linux

```bash
# Install dependencies
npm install

# Build aplikasi
npm run build

# Jalankan
npx electron electron/main.js

# Buat installer
npx electron-builder --linux --config electron-builder.yml
```

### ⌨️ Keyboard Shortcuts Desktop

| Shortcut | Fungsi |
|----------|--------|
| `Ctrl/Cmd + R` | Refresh halaman |
| `Ctrl/Cmd + +` | Zoom in |
| `Ctrl/Cmd + -` | Zoom out |
| `Ctrl/Cmd + 0` | Reset zoom |
| `F11` | Toggle fullscreen |
| `F12` | Toggle DevTools |
| `Ctrl/Cmd + Q` | Keluar aplikasi |

### 📦 Struktur File Desktop

```
mangaku/
├── electron/
│   ├── main.js              # Main process
│   └── preload.js           # Preload script
├── electron-builder.yml     # Build config
├── setup-windows.bat        # Setup Windows
├── run-windows.bat          # Run Windows
├── build-windows.bat        # Build installer
├── configure-electron.bat   # Configure package.json
└── release/                 # Output folder
    ├── MangaKu-1.0.0-Setup.exe
    └── MangaKu-1.0.0-Portable.exe
```

### ⚙️ Fitur Desktop

- ✅ Aplikasi native (bukan browser)
- ✅ Baca offline penuh
- ✅ Auto-save progress
- ✅ Keyboard shortcuts
- ✅ Multi-window support
- ✅ Custom menu bar
- ✅ Fullscreen mode
- ✅ Zoom in/out
- ✅ Touch support (tablet)
- ✅ Portable version (Windows)

### 🔧 Troubleshooting Desktop

| Masalah | Solusi |
|---------|--------|
| "Node.js tidak ditemukan" | Install Node.js dari nodejs.org |
| "Gagal install dependencies" | Cek internet, matikan antivirus |
| Aplikasi tidak terbuka | Jalankan dengan `--enable-logging` |
| Build gagal | Hapus node_modules, install ulang |
| Installer tidak bisa install | Run as Administrator |

---

## 📊 Perbandingan Versi

| Fitur | Web/PWA | Desktop |
|-------|---------|---------|
| Install | Via browser | Installer .exe/.dmg |
| Ukuran | ~5 MB | ~80 MB |
| Offline | ✅ (setelah download) | ✅ (full) |
| Update | Otomatis | Manual |
| Performance | Good | Excellent |
| Storage | Browser cache | Local disk |
| Multi-device | ✅ (sync via browser) | ❌ (per device) |
| Keyboard shortcuts | Limited | Full |
| System integration | Limited | Full |

---

## 🛠️ Development

### Setup Development Environment

```bash
# Clone repository
git clone https://github.com/USERNAME/mangaku.git
cd mangaku

# Install dependencies
npm install

# Jalankan development server (web)
npm run dev

# Jalankan desktop app (development)
npm run electron-dev

# Build untuk production
npm run build
```

### Build untuk Semua Platform

```bash
# Web/PWA
npm run build

# Windows
npm run build-win

# macOS
npm run build-mac

# Linux
npm run build-linux

# Semua platform
npm run build-all
```

---

## 📱 Download & Release

📥 **Download versi terbaru**: [RELEASE.md](RELEASE.md)

### Quick Links

- 🌐 **Web Demo**: [https://mangaku-demo.netlify.app](https://mangaku-demo.netlify.app) (contoh)
- 📦 **Windows Installer**: [MangaKu-1.0.0-Setup.exe](release/MangaKu-1.0.0-Setup.exe)
- 🎒 **Windows Portable**: [MangaKu-1.0.0-Portable.exe](release/MangaKu-1.0.0-Portable.exe)

---

## 📄 Lisensi

MIT License - Bebas digunakan dan dimodifikasi. Lihat [LICENSE](LICENSE) untuk detail.

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:
1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📞 Support & Kontak

- 📧 Email: support@mangaku.app
- 🐛 Issues: [GitHub Issues](https://github.com/USERNAME/mangaku/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/USERNAME/mangaku/discussions)

---

## 🙏 Credits

- React & Vite Team
- Electron Team
- Tailwind CSS Team
- Semua kontributor open source

---

**Made with ❤️ for manga lovers**

⭐ Star repo ini jika bermanfaat!

## 🚀 Demo

Setelah deploy, akses aplikasi di URL yang di-hosting.

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS 4** - Styling
- **Vite** - Build Tool
- **Service Worker** - Offline Support
- **LocalStorage** - Data Persistence
- **Cache API** - Image Caching

## 📦 Instalasi & Development

```bash
# Clone repository
git clone https://github.com/klemens13/mangaku.git
cd mangaku

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build
```

## 🖥️ Versi Windows Desktop

Aplikasi juga tersedia sebagai aplikasi desktop Windows (.exe) menggunakan Electron.

### Quick Start Windows

1. **Install Node.js** dari https://nodejs.org
2. **Double-click** `setup-windows.bat` (install dependencies)
3. **Double-click** `run-windows.bat` (jalankan aplikasi)

### Buat Installer Windows

```bash
# Jalankan script build
build-windows.bat

# Atau manual
npm run build
npx electron-builder --win --config electron-builder.yml
```

File installer akan tersedia di folder `release/`

📖 Baca [README-WINDOWS.md](README-WINDOWS.md) untuk detail lengkap

## 📱 Install di Android

1. Deploy aplikasi ke hosting (Netlify/Vercel/GitHub Pages)
2. Buka URL di **Google Chrome**
3. Tap **"Install app"** atau menu **⋮ → Install app**
4. Aplikasi akan terpasang di home screen!

## 📂 Struktur Project

```
mangaku/
├── public/
│   ├── manifest.json      # PWA Manifest
│   ├── sw.js              # Service Worker
│   └── icon.svg           # App Icon
├── src/
│   ├── components/
│   │   ├── BottomNav.tsx       # Navigasi bawah
│   │   ├── InstallPrompt.tsx   # Prompt install PWA
│   │   ├── Library.tsx         # Halaman perpustakaan
│   │   ├── MangaDetail.tsx     # Detail manga
│   │   ├── MangaList.tsx       # Daftar manga
│   │   ├── MangaReader.tsx     # Pembaca manga
│   │   └── Settings.tsx        # Pengaturan
│   ├── data/
│   │   └── manga.ts       # Data manga
│   ├── utils/
│   │   └── storage.ts     # Utility storage
│   ├── types.ts           # TypeScript types
│   ├── App.tsx            # Main component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.js
```

## 📋 Persyaratan Sistem

| Item | Minimum |
|------|---------|
| OS | Android 6.0 (Marshmallow) |
| Browser | Chrome 50+ / Samsung Internet 5+ |
| Storage | ~50MB |
| Internet | Diperlukan saat pertama kali |

## 📄 License

MIT License - Bebas digunakan dan dimodifikasi.

---

Made with ❤️ for manga lovers
