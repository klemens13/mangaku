# 📚 MangaDex API Integration

Dokumentasi integrasi MangaDex API di MangaKu.

---

## 🎯 Overview

MangaKu sekarang menggunakan **MangaDex API** sebagai sumber manga legal dan gratis. MangaDex adalah platform open-source dengan 50,000+ manga dari berbagai grup scanlation.

### Kenapa MangaDex?

✅ **Legal** - Platform yang dihormati industri  
✅ **Gratis** - Tidak perlu bayar  
✅ **Banyak Konten** - 50,000+ manga  
✅ **Bahasa Indonesia** - Support translation Indonesia  
✅ **API Publik** - Bisa integrasi langsung  
✅ **CORS Enabled** - Bisa dari browser  
✅ **Komunitas Aktif** - Scanlation groups resmi  

---

## 🛠️ Implementasi

### File yang Dibuat

```
src/services/mangadex.ts    # API service untuk MangaDex
```

### File yang Diupdate

```
src/App.tsx                 # Fetch manga dari API
src/components/MangaList.tsx    # Display manga dari API + search
src/components/MangaReader.tsx  # Load pages dari API
```

---

## 📡 API Endpoints

### 1. Get Popular Manga
```typescript
GET https://api.mangadex.org/manga
  ?limit=20
  &order[followedCount]=desc
  &includes[]=cover_art
  &includes[]=author
  &contentRating[]=safe
  &contentRating[]=suggestive
  &availableTranslatedLanguage[]=id
  &availableTranslatedLanguage[]=en
```

### 2. Search Manga
```typescript
GET https://api.mangadex.org/manga
  ?title={query}
  &limit=20
  &includes[]=cover_art
  &contentRating[]=safe
  &availableTranslatedLanguage[]=id
```

### 3. Get Manga Details
```typescript
GET https://api.mangadex.org/manga/{id}
  ?includes[]=cover_art
  &includes[]=author
  &includes[]=artist
```

### 4. Get Chapters
```typescript
GET https://api.mangadex.org/manga/{id}/feed
  ?limit=100
  &translatedLanguage[]=id
  &translatedLanguage[]=en
  &order[chapter]=asc
```

### 5. Get Chapter Pages
```typescript
GET https://api.mangadex.org/at-home/server/{chapterId}
```

---

## 🔧 Cara Kerja

### 1. Load Manga List
```typescript
// App.tsx
useEffect(() => {
  loadMangaFromAPI();
}, []);

const loadMangaFromAPI = async () => {
  const manga = await mangadexAPI.getPopularManga(20);
  setMangaList(manga);
};
```

### 2. Search Manga
```typescript
// MangaList.tsx
useEffect(() => {
  if (searchQuery.length >= 2) {
    const results = await mangadexAPI.searchManga(searchQuery);
    setSearchResults(results);
  }
}, [searchQuery]);
```

### 3. Load Manga Details
```typescript
// App.tsx
const handleSelectManga = async (manga: Manga) => {
  if (manga.chapters.length === 0) {
    const details = await mangadexAPI.getMangaDetails(manga.id);
    setSelectedManga(details);
  }
};
```

### 4. Load Chapter Pages
```typescript
// MangaReader.tsx
const loadChapterPages = async () => {
  const pages = await mangadexAPI.getChapterPages(chapter.id);
  setPages(pages);
};
```

---

## 🔄 Data Transformation

### MangaDex Response → App Format

```typescript
// MangaDex
{
  id: "manga-id",
  attributes: {
    title: { en: "One Piece", "ja-ro": "One Piece" },
    description: { en: "Description...", id: "Deskripsi..." },
    status: "ongoing",
    tags: [{ attributes: { name: { en: "Action" } } }]
  },
  relationships: [
    { type: "cover_art", attributes: { fileName: "cover.jpg" } },
    { type: "author", attributes: { name: "Eiichiro Oda" } }
  ]
}

// App Format
{
  id: "manga-id",
  title: "One Piece",
  author: "Eiichiro Oda",
  cover: "https://uploads.mangadex.org/covers/manga-id/cover.jpg.256.jpg",
  description: "Deskripsi...",
  genre: ["Action", "Adventure"],
  status: "ongoing",
  rating: 0,
  chapters: []
}
```

---

## ⚡ Rate Limiting

MangaDex API memiliki rate limit **5 requests/second**.

### Implementasi
```typescript
// services/mangadex.ts
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async getPopularManga() {
  await delay(300); // Wait 300ms between requests
  const response = await axios.get(...);
  return response.data;
}
```

---

## 🌐 CORS

MangaDex API mendukung CORS, jadi bisa dipanggil langsung dari browser tanpa proxy.

```typescript
// Bisa langsung dari browser
const response = await fetch('https://api.mangadex.org/manga');
```

---

## 📊 Response Examples

### Popular Manga Response
```json
{
  "result": "ok",
  "response": "collection",
  "data": [
    {
      "id": "manga-id",
      "type": "manga",
      "attributes": {
        "title": {
          "en": "One Piece",
          "ja-ro": "One Piece"
        },
        "description": {
          "en": "Gol D. Roger...",
          "id": "Gol D. Roger..."
        },
        "status": "ongoing",
        "year": 1997,
        "rating": "safe",
        "tags": [
          {
            "id": "tag-id",
            "type": "tag",
            "attributes": {
              "name": {
                "en": "Action"
              }
            }
          }
        ]
      },
      "relationships": [
        {
          "id": "cover-id",
          "type": "cover_art",
          "attributes": {
            "fileName": "cover.jpg",
            "locale": null
          }
        },
        {
          "id": "author-id",
          "type": "author",
          "attributes": {
            "name": "Eiichiro Oda"
          }
        }
      ]
    }
  ],
  "limit": 20,
  "offset": 0,
  "total": 50000
}
```

### Chapter Pages Response
```json
{
  "result": "ok",
  "baseUrl": "https://uploads.mangadex.org",
  "chapter": {
    "hash": "chapter-hash",
    "data": [
      "page1.jpg",
      "page2.jpg",
      "page3.jpg"
    ],
    "dataSaver": [
      "page1-saver.jpg",
      "page2-saver.jpg"
    ]
  }
}
```

### Full Image URL
```
https://uploads.mangadex.org/data/{chapter-hash}/{filename}
```

---

## 🎨 Cover Images

### URL Format
```
https://uploads.mangadex.org/covers/{manga-id}/{filename}.256.jpg
```

### Sizes Available
- `.256.jpg` - 256px (thumbnail)
- `.512.jpg` - 512px (medium)
- Original - Full size

---

## 🔄 Error Handling

```typescript
try {
  const manga = await mangadexAPI.getPopularManga(20);
  setMangaList(manga);
} catch (error) {
  console.error('Failed to load manga:', error);
  setError('Gagal memuat manga dari server');
  // Fallback ke data offline
  setMangaList(mangaData);
}
```

---

## 📝 Features

### ✅ Implemented
- [x] Load popular manga
- [x] Search manga
- [x] Get manga details
- [x] Get chapters list
- [x] Load chapter pages
- [x] Rate limiting
- [x] Error handling
- [x] Loading states
- [x] Cover images
- [x] Multi-language support (ID, EN)

### 🔄 Coming Soon
- [ ] Advanced filters (genre, status, year)
- [ ] Manga recommendations
- [ ] Update notifications
- [ ] User authentication (MangaDex login)
- [ ] Follow/unfollow manga
- [ ] Reading history sync

---

## 🔗 Links

- **MangaDex Website**: https://mangadex.org
- **API Documentation**: https://api.mangadex.org/docs/
- **API Swagger**: https://api.mangadex.org/swagger.html
- **GitHub**: https://github.com/mangadex

---

## ⚖️ Legal & Ethics

### ✅ Yang BOLEH
- Gunakan API resmi MangaDex
- Credit author & artist
- Support creator dengan beli manga official
- Gunakan untuk personal/educational

### ❌ Yang TIDAK BOLEH
- Scraping situs ilegal
- Distribusi tanpa izin
- Monetisasi konten orang lain
- Violate MangaDex Terms of Service

### 💡 Best Practices
1. **Credit creators** - Selalu cantumkan author & artist
2. **Support official** - Tambah link ke platform official
3. **Disclaimer** - Jelaskan ini adalah aggregator
4. **Respect rate limits** - Jangan overload API
5. **Cache responsibly** - Jangan cache berlebihan

---

## 📞 Support

Jika ada masalah dengan API:
- 📧 Email: support@mangadex.org
- 💬 Discord: https://discord.gg/mangadex
- 🐛 Issues: https://github.com/mangadex/issues

---

**Terima kasih kepada MangaDex atas API yang luar biasa!** 🙏

⭐ Support MangaDex di: https://mangadex.org
