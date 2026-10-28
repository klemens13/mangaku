# 📱 MangaKu - Baca Manga Online & Offline

Aplikasi Progressive Web App (PWA) untuk membaca manga secara online maupun offline. Kompatibel dengan Android 6.0+.

![MangaKu](https://img.shields.io/badge/MangaKu-v1.0.0-purple?style=for-the-badge)
![PWA](https://img.shields.io/badge/PWA-Ready-green?style=for-the-badge)
![Android](https://img.shields.io/badge/Android-6.0+-brightgreen?style=for-the-badge)

## ✨ Fitur Utama

- 📚 **Katalog Manga** - Jelajahi koleksi manga dengan berbagai genre
- 🔍 **Pencarian** - Cari berdasarkan judul, author, atau genre
- 📖 **Mode Baca** - Scroll vertikal atau halaman per halaman
- ⭐ **Bookmark** - Tandai manga favorit
- 📥 **Download Offline** - Baca tanpa internet
- 📊 **Progress Tracking** - Otomatis simpan progress baca
- 📱 **PWA Installable** - Install seperti aplikasi native
- 🎨 **Dark Theme** - Nyaman untuk membaca di malam hari
- 👆 **Touch Gestures** - Swipe & tap untuk navigasi

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
