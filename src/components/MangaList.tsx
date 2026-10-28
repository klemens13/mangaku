import { useState, useEffect } from 'react';
import { Manga, ReadingProgress } from '../types';
import { mangadexAPI } from '../services/mangadex';

interface Props {
  mangaList: Manga[];
  progress: ReadingProgress[];
  bookmarks: string[];
  onSelectManga: (manga: Manga) => void;
  onToggleBookmark: (mangaId: string) => void;
  isOnline: boolean;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export default function MangaList({ mangaList, progress, bookmarks, onSelectManga, onToggleBookmark, isOnline, loading, error, onRetry }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'bookmarks' | 'continue'>('all');
  const [searchResults, setSearchResults] = useState<Manga[] | null>(null);
  const [searching, setSearching] = useState(false);

  // Search from API when query changes
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const timer = setTimeout(async () => {
        try {
          setSearching(true);
          const results = await mangadexAPI.searchManga(searchQuery);
          setSearchResults(results);
        } catch (err) {
          console.error('Search failed:', err);
          setSearchResults(null);
        } finally {
          setSearching(false);
        }
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchResults(null);
    }
  }, [searchQuery]);

  const filteredManga = (searchResults || mangaList).filter((manga) => {
    const matchesSearch = searchResults ? true : (
      manga.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manga.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manga.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
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
          <p className="text-sm text-gray-400">Baca manga dari MangaDex</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-orange-500'}`}></span>
          <span className="text-xs text-gray-400">{isOnline ? 'Online' : 'Offline'}</span>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-900/20 border border-blue-800/50 rounded-xl p-3 mb-4">
        <p className="text-xs text-blue-300">
          ℹ️ Manga berasal dari <a href="https://mangadex.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">MangaDex</a> - Platform baca manga legal & gratis. 
          Dukung creator dengan membeli manga official!
        </p>
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

      {/* Loading Indicator */}
      {(loading || searching) && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-gray-400 text-sm">
              {searching ? 'Mencari manga...' : 'Memuat manga dari MangaDex...'}
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && !loading && (
        <div className="bg-red-900/20 border border-red-800 rounded-xl p-4 mb-4">
          <p className="text-red-400 text-sm mb-2">{error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
            >
              Coba Lagi
            </button>
          )}
        </div>
      )}

      {/* Manga Grid */}
      {!loading && !searching && filteredManga.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Tidak ada manga ditemukan</p>
          <p className="text-gray-600 text-sm mt-2">Coba kata kunci lain</p>
        </div>
      ) : !loading && !searching ? (
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
      ) : null}
    </div>
  );
}
