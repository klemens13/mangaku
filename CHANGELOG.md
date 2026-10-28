# Changelog

Semua perubahan signifikan pada project ini akan didokumentasikan di file ini.

Format berdasarkan [Keep a Changelog](https://keepachangelog.com/id-ID/1.0.0/),
dan project ini mengikuti [Semantic Versioning](https://semver.org/lang/id/).

## [1.0.1] - 2026-10-28

### 🐛 Perbaikan Bug

#### Gambar Cover Manga Tidak Muncul
- 🖼️ Semua tag `<img>` cover diganti komponen `MangaCover` baru (`src/components/MangaCover.tsx`) yang otomatis menampilkan placeholder jika URL cover kosong atau gagal dimuat (mis. manga di MangaDex tanpa cover art)
- 🔧 Ukuran cover MangaDex diubah dari `.256.jpg` ke `.512.jpg` yang lebih andal tersedia untuk semua file cover
- 🔄 Service Worker tidak lagi menyimpan respons gambar yang gagal/error ke cache, dan versi cache dinaikkan (`mangaku-cache-v3`) sehingga cache lama yang rusak dibersihkan saat update

## [1.0.0] - 2024

### ✨ Fitur Baru

#### Aplikasi Web (PWA)
- 📚 Katalog manga dengan 6 judul manga sample
- 🔍 Pencarian berdasarkan judul, author, dan genre
- 📖 Mode baca scroll vertikal
- 📖 Mode baca halaman per halaman (horizontal)
- ⭐ Bookmark/favorit manga
- 📥 Download chapter untuk baca offline
- 📊 Tracking progress baca otomatis
- 🎨 Dark theme yang nyaman untuk mata
- 👆 Touch gestures (swipe & tap)
- 📱 Installable sebagai PWA di Android
- 🔌 Offline support dengan Service Worker
- 🌐 Status indikator online/offline

#### Aplikasi Desktop (Windows)
- 🖥️ Aplikasi desktop menggunakan Electron
- 📦 Installer Windows (.exe)
- 🎒 Versi portable (tanpa install)
- ⌨️ Keyboard shortcuts
- 🔍 Zoom in/out
- 🖥️ Fullscreen mode
- 📋 Custom menu bar
- 🔒 Security: context isolation
- 📊 Multi-window support

### 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS 4
- **Build Tool**: Vite
- **Desktop**: Electron
- **Offline**: Service Worker, Cache API
- **Storage**: LocalStorage

### 📱 Kompatibilitas

**Web/PWA:**
- Android 6.0+ (Marshmallow)
- Chrome 50+
- Samsung Internet 5+
- Firefox 50+
- Safari 11+

**Desktop:**
- Windows 7 SP1 / 8 / 10 / 11
- macOS 10.13+
- Linux (Ubuntu 18.04+, Fedora 30+)

### 📊 Statistik

- 6 manga sample dengan total 40+ chapter
- 400+ halaman manga
- Support 2 mode baca
- 100% offline capable (setelah download)
- < 200KB gzipped (web app)
- ~80MB installer (desktop)

### 🐛 Known Issues

- Gambar manga menggunakan placeholder (picsum.photos)
- Beberapa fitur PWA mungkin tidak bekerja di iOS Safari
- Electron app ukuran cukup besar (~80MB)

### 🚀 Roadmap (Coming Soon)

- [ ] Integrasi API manga real (MangaDex, etc)
- [ ] Sinkronisasi progress antar device
- [ ] Custom manga reader themes
- [ ] Download multiple chapters
- [ ] Manga update notifications
- [ ] Reading statistics & analytics
- [ ] Share manga ke social media
- [ ] Light theme option
- [ ] Custom font size
- [ ] Vertical/horizontal page flip animation

---

## [Unreleased]

### Planned Features
- User authentication
- Cloud sync
- Manga recommendations
- Reading history export
- Custom manga sources
- Batch download
- Reading time estimation

---

**Catatan**: Versi ini adalah release pertama. Feedback dan saran sangat diharapkan!
