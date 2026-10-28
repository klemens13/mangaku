import { useState } from 'react';
import { Manga, ReadingProgress } from '../types';

interface Props {
  mangaList: Manga[];
  progress: ReadingProgress[];
  bookmarks: string[];
  onSelectManga: (manga: Manga) => void;
  onToggleBookmark: (mangaId: string) => void;
  isOnline: boolean;
}

export default function MangaList({ mangaList, progress, bookmarks, onSelectManga, onToggleBookmark, isOnline }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'bookmarks' | 'continue'>('all');

  const filteredManga = mangaList.filter((manga) => {
    const matchesSearch = manga.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manga.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manga.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === 'bookmarks') {
      return matchesSearch && bookmarks.includes(manga.id);
    }
    if (activeTab === 'continue') {
      return matchesSearch && progress.some(p => p.mangaId === manga.id);
    }
    return matchesSearch;
  });

  const getLatestProgress = (mangaId: string) => {
    return progress
      .filter(p => p.mangaId === mangaId)
      .sort((a, b) => b.timestamp - a.timestamp)[0];
  };

  return (
    <div className="px-4 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">MangaKu</h1>
          <p className="text-sm text-gray-400">Baca manga favoritmu</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-orange-500'}`}></span>
          <span className="text-xs text-gray-400">{isOnline ? 'Online' : 'Offline'}</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Cari manga, author, genre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#1a1a2e] border border-gray-700 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
        />
        <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {[
          { key: 'all', label: 'Semua' },
          { key: 'bookmarks', label: '⭐ Favorit' },
          { key: 'continue', label: '📖 Lanjutkan' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-purple-600 text-white'
                : 'bg-[#1a1a2e] text-gray-400 hover:bg-[#252547]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Manga Grid */}
      {filteredManga.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Tidak ada manga ditemukan</p>
          <p className="text-gray-600 text-sm mt-2">Coba kata kunci lain</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {filteredManga.map((manga) => {
            const latestProgress = getLatestProgress(manga.id);
            const isFav = bookmarks.includes(manga.id);
            
            return (
              <div
                key={manga.id}
                className="relative group cursor-pointer"
                onClick={() => onSelectManga(manga)}
              >
                {/* Cover */}
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#1a1a2e]">
                  <img
                    src={manga.cover}
                    alt={manga.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Bookmark indicator */}
                  {isFav && (
                    <div className="absolute top-1 right-1">
                      <span className="text-yellow-400 text-sm">⭐</span>
                    </div>
                  )}
                  
                  {/* Rating */}
                  <div className="absolute top-1 left-1 bg-black/60 rounded px-1.5 py-0.5">
                    <span className="text-yellow-400 text-xs">★ {manga.rating}</span>
                  </div>

                  {/* Progress bar */}
                  {latestProgress && (
                    <div className="absolute bottom-8 left-1 right-1">
                      <div className="bg-black/60 rounded px-1.5 py-0.5">
                        <span className="text-[10px] text-green-400">
                          Ch.{manga.chapters.findIndex(c => c.id === latestProgress.chapterId) + 1} - Hal.{latestProgress.page + 1}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <p className="text-white text-xs font-medium leading-tight line-clamp-2">
                      {manga.title}
                    </p>
                  </div>
                </div>

                {/* Bookmark button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(manga.id);
                  }}
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#1a1a2e] border border-gray-700 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {isFav ? '⭐' : '☆'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
