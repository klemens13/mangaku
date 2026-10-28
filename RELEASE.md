# 📦 MangaKu - Release Notes

## 🎉 Versi Terbaru: v1.0.0 (Stable)

**Tanggal Rilis**: 2024  
**Status**: ✅ Stable Release  
**License**: MIT

---

## 📥 Download

### 🌐 Versi Web/PWA

| Platform | Cara Install | Ukuran | Link |
|----------|--------------|--------|------|
| **Android** | Via Chrome → Install | ~5 MB | [Demo Link](https://mangaku-demo.netlify.app) |
| **iOS** | Via Safari → Add to Home Screen | ~5 MB | [Demo Link](https://mangaku-demo.netlify.app) |
| **Desktop Browser** | Via Chrome/Edge → Install | ~5 MB | [Demo Link](https://mangaku-demo.netlify.app) |

**Cara Deploy Sendiri:**
1. Download source code: [mangaku-v1.0.0-source.zip](#)
2. Extract & jalankan `npm install`
3. Jalankan `npm run build`
4. Upload folder `dist/` ke hosting (Netlify/Vercel/GitHub Pages)

### 🖥️ Versi Desktop

#### Windows

| File | Tipe | Ukuran | Download |
|------|------|--------|----------|
| **MangaKu-1.0.0-Setup.exe** | Installer | ~80 MB | [⬇️ Download](release/MangaKu-1.0.0-Setup.exe) |
| **MangaKu-1.0.0-Portable.exe** | Portable | ~75 MB | [⬇️ Download](release/MangaKu-1.0.0-Portable.exe) |

**System Requirements:**
- OS: Windows 7 SP1 / 8 / 10 / 11
- RAM: 2 GB minimum
- Storage: 200 MB
- Display: 1024x768

#### macOS

| File | Tipe | Ukuran | Download |
|------|------|--------|----------|
| **MangaKu-1.0.0.dmg** | Installer | ~90 MB | [⬇️ Download](release/MangaKu-1.0.0.dmg) |
| **MangaKu-1.0.0.zip** | Portable | ~85 MB | [⬇️ Download](release/MangaKu-1.0.0.zip) |

**System Requirements:**
- OS: macOS 10.13 (High Sierra) atau lebih baru
- RAM: 4 GB minimum
- Storage: 250 MB
- Display: 1280x800

#### Linux

| File | Tipe | Ukuran | Download |
|------|------|--------|----------|
| **MangaKu-1.0.0.AppImage** | Portable | ~75 MB | [⬇️ Download](release/MangaKu-1.0.0.AppImage) |
| **mangaku_1.0.0_amd64.deb** | Debian/Ubuntu | ~70 MB | [⬇️ Download](release/mangaku_1.0.0_amd64.deb) |

**System Requirements:**
- OS: Ubuntu 18.04+ / Fedora 30+ / Debian 10+
- RAM: 2 GB minimum
- Storage: 200 MB
- Display: 1024x768

---

## 📋 Changelog v1.0.0

### ✨ Fitur Baru

#### Aplikasi Web/PWA
- 📚 **Katalog Manga** - 6 manga sample dengan 40+ chapter
- 🔍 **Pencarian** - Cari berdasarkan judul, author, genre
- 📖 **Mode Baca Scroll** - Baca dengan scroll vertikal
- 📖 **Mode Baca Halaman** - Baca halaman per halaman
- ⭐ **Bookmark** - Tandai manga favorit
- 📥 **Download Offline** - Download chapter untuk baca offline
- 📊 **Progress Tracking** - Auto-save progress baca
- 📱 **PWA Installable** - Install di Android, iOS, Desktop
- 🎨 **Dark Theme** - Tema gelap yang nyaman untuk mata
- 👆 **Touch Gestures** - Swipe & tap untuk navigasi
- 🌐 **Offline Support** - Service Worker untuk offline mode
- 📶 **Status Indicator** - Indikator online/offline

#### Aplikasi Desktop
- 🖥️ **Native App** - Aplikasi desktop menggunakan Electron
- 📦 **Installer** - Installer Windows (.exe), macOS (.dmg), Linux (.AppImage/.deb)
- 🎒 **Portable** - Versi portable tanpa install (Windows)
- ⌨️ **Keyboard Shortcuts** - Ctrl+R, F11, F12, dll
- 🔍 **Zoom** - Zoom in/out dengan keyboard
- 🖥️ **Fullscreen** - Mode fullscreen (F11)
- 📋 **Custom Menu** - Menu bar custom
- 🔒 **Security** - Context isolation, no node integration
- 📊 **Multi-window** - Support multiple windows
- 💾 **Local Storage** - Data tersimpan lokal

### 🛠️ Tech Stack

**Frontend:**
- React 18.2.0
- TypeScript 5.x
- Tailwind CSS 4.x
- Vite 6.x

**Desktop:**
- Electron (latest)
- electron-builder

**Offline:**
- Service Worker
- Cache API
- LocalStorage

### 📊 Statistik

- **6** manga sample
- **40+** chapter total
- **400+** halaman manga
- **2** mode baca
- **100%** offline capable (setelah download)
- **< 200KB** gzipped (web app)
- **~80MB** installer (desktop)

### 🐛 Known Issues

1. **Gambar Placeholder**
   - Saat ini menggunakan picsum.photos untuk gambar manga
   - Gambar mungkin lambat dimuat tergantung koneksi
   - Solusi: Download chapter untuk akses offline

2. **iOS PWA Limitations**
   - Beberapa fitur PWA tidak bekerja di iOS Safari
   - Download chapter mungkin tidak persisten
   - Workaround: Gunakan Chrome di iOS

3. **Desktop App Size**
   - Installer cukup besar (~80MB) karena bundling Electron
   - Ini normal untuk aplikasi Electron
   - Future: Akan dioptimasi di versi berikutnya

4. **Storage Limit**
   - Browser memiliki limit storage (~50MB-1GB tergantung browser)
   - Download terlalu banyak chapter mungkin penuh
   - Solusi: Hapus chapter yang sudah dibaca

### 🔄 Upgrade Guide

#### Dari Versi Sebelumnya

**Web/PWA:**
```bash
# Tidak perlu upgrade manual
# Aplikasi otomatis update saat online
# Clear cache browser jika ada masalah:
# Chrome: Settings → Privacy → Clear browsing data
```

**Desktop:**
```bash
# Windows:
1. Download installer terbaru
2. Jalankan installer
3. Otomatis upgrade (data tetap tersimpan)

# macOS:
1. Download .dmg terbaru
2. Drag ke Applications folder
3. Replace versi lama

# Linux:
# AppImage:
1. Download AppImage terbaru
2. chmod +x MangaKu-1.0.0.AppImage
3. Jalankan

# Debian/Ubuntu:
sudo dpkg -i mangaku_1.0.0_amd64.deb
```

---

## 📦 Release Archives

### Versi Sebelumnya

#### v0.9.0-beta (Beta Release)
**Tanggal**: 2024-xx-xx  
**Status**: ⚠️ Beta

**Perubahan:**
- Initial beta release
- Basic manga reader
- Offline support (experimental)

**Download:**
- [mangaku-v0.9.0-beta.zip](#)

---

## 🔐 Checksums (SHA256)

Untuk verifikasi integritas file download:

```
# Windows
MangaKu-1.0.0-Setup.exe:      [SHA256_HASH]
MangaKu-1.0.0-Portable.exe:   [SHA256_HASH]

# macOS
MangaKu-1.0.0.dmg:            [SHA256_HASH]
MangaKu-1.0.0.zip:            [SHA256_HASH]

# Linux
MangaKu-1.0.0.AppImage:       [SHA256_HASH]
mangaku_1.0.0_amd64.deb:      [SHA256_HASH]

# Source
mangaku-v1.0.0-source.zip:    [SHA256_HASH]
```

**Cara verifikasi:**
```bash
# Windows (PowerShell)
Get-FileHash MangaKu-1.0.0-Setup.exe -Algorithm SHA256

# macOS/Linux
shasum -a 256 MangaKu-1.0.0.dmg
```

---

## 📝 Installation Guides

### 🌐 Web/PWA Installation

#### Android (Chrome)
1. Buka Chrome
2. Kunjungi URL aplikasi
3. Tap "Install" pada banner
4. Atau: Menu ⋮ → "Install app"
5. Konfirmasi → Selesai ✅

#### iOS (Safari)
1. Buka Safari
2. Kunjungi URL aplikasi
3. Tap icon Share (📤)
4. Scroll → "Add to Home Screen"
5. Tap "Add" → Selesai ✅

#### Desktop (Chrome/Edge)
1. Buka Chrome/Edge
2. Kunjungi URL aplikasi
3. Klik icon Install (📥) di address bar
4. Atau: Menu ⋮ → "Install MangaKu"
5. Konfirmasi → Selesai ✅

### 🖥️ Desktop Installation

#### Windows (Installer)
```bash
1. Download MangaKu-1.0.0-Setup.exe
2. Double-click file installer
3. Ikuti wizard instalasi
4. Pilih lokasi install (default: C:\Program Files\MangaKu)
5. Tunggu proses install
6. Launch MangaKu → Selesai ✅
```

#### Windows (Portable)
```bash
1. Download MangaKu-1.0.0-Portable.exe
2. Copy ke folder yang diinginkan
3. Double-click untuk jalankan
4. Tidak perlu install ✅
```

#### macOS
```bash
1. Download MangaKu-1.0.0.dmg
2. Double-click file .dmg
3. Drag MangaKu ke Applications folder
4. Eject disk image
5. Buka Applications → MangaKu → Selesai ✅
```

#### Linux (AppImage)
```bash
1. Download MangaKu-1.0.0.AppImage
2. Buka terminal di folder download
3. Jalankan:
   chmod +x MangaKu-1.0.0.AppImage
   ./MangaKu-1.0.0.AppImage
4. Selesai ✅
```

#### Linux (Debian/Ubuntu)
```bash
1. Download mangaku_1.0.0_amd64.deb
2. Buka terminal:
   sudo dpkg -i mangaku_1.0.0_amd64.deb
3. Jika ada error dependencies:
   sudo apt-get install -f
4. Launch dari applications menu → Selesai ✅
```

---

## 🚀 Quick Start

### Web/PWA
```bash
1. Deploy ke hosting (Netlify/Vercel/GitHub Pages)
2. Buka URL di browser
3. Install sebagai PWA
4. Mulai baca manga!
```

### Desktop (Windows)
```bash
1. Install Node.js dari nodejs.org
2. Double-click: setup-windows.bat
3. Double-click: run-windows.bat
4. Aplikasi terbuka! ✅
```

---

## 📞 Support & Feedback

### Report Issues
- 🐛 **Bug Report**: [GitHub Issues](https://github.com/USERNAME/mangaku/issues)
- 💡 **Feature Request**: [GitHub Discussions](https://github.com/USERNAME/mangaku/discussions)

### Contact
- 📧 Email: support@mangaku.app
- 💬 Discord: [Join Community](#)
- 🐦 Twitter: [@MangaKuApp](#)

### Documentation
- 📖 **Full Docs**: [README.md](README.md)
- 🪟 **Windows Guide**: [README-WINDOWS.md](README-WINDOWS.md)
- 📋 **Changelog**: [CHANGELOG.md](CHANGELOG.md)

---

## 🗺️ Roadmap

### v1.1.0 (Planned)
- [ ] Integrasi API manga real (MangaDex)
- [ ] Sinkronisasi progress antar device
- [ ] Custom themes
- [ ] Download multiple chapters
- [ ] Reading statistics

### v1.2.0 (Planned)
- [ ] User authentication
- [ ] Cloud sync
- [ ] Manga recommendations
- [ ] Notifications
- [ ] Social sharing

### v2.0.0 (Future)
- [ ] Complete UI redesign
- [ ] Advanced reader features
- [ ] Plugin system
- [ ] Multi-language support
- [ ] Performance optimization

---

## 📜 License

MIT License - Lihat [LICENSE](LICENSE) untuk detail lengkap.

---

## 🙏 Acknowledgments

- React Team
- Vite Team
- Electron Team
- Tailwind CSS Team
- Semua kontributor open source
- Beta testers

---

**Terima kasih telah menggunakan MangaKu!** 🎉

⭐ Jika aplikasi ini bermanfaat, jangan lupa star repository ini!

---

*Last Updated: 2024*
