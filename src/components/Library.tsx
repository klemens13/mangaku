import { Manga, ReadingProgress } from '../types';
import { getDownloads, getDownloadedChapters } from '../utils/storage';
import MangaCover from './MangaCover';

interface Props {
  mangaList: Manga[];
  progress: ReadingProgress[];
  bookmarks: string[];
  onSelectManga: (manga: Manga) => void;
  onReadChapter: (manga: Manga, chapterIndex: number, page: number) => void;
}

export default function Library({ mangaList, progress, bookmarks, onSelectManga, onReadChapter }: Props) {
  const downloads = getDownloads();
  
  // Get manga with progress
  const continueReading = mangaList.filter((manga) =>
    progress.some((p) => p.mangaId === manga.id)
  );

  // Get bookmarked manga
  const bookmarkedManga = mangaList.filter((manga) =>
    bookmarks.includes(manga.id)
  );

  // Get manga with downloaded chapters
  const downloadedManga = mangaList.filter((manga) => {
    const chs = getDownloadedChapters(manga.id);
    return chs.length > 0;
  });

  const getLatestProgress = (mangaId: string) => {
    return progress
      .filter(p => p.mangaId === mangaId)
      .sort((a, b) => b.timestamp - a.timestamp)[0];
  };

  return (
    <div className="px-4 pt-4">
      <h1 className="text-2xl font-bold text-white mb-1">Perpustakaan</h1>
      <p className="text-sm text-gray-400 mb-6">Koleksi manga kamu</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-[#1a1a2e] rounded-xl p-3 text-center border border-gray-800">
          <p className="text-2xl font-bold text-purple-400">{continueReading.length}</p>
          <p className="text-xs text-gray-400 mt-1">Sedang Dibaca</p>
        </div>
        <div className="bg-[#1a1a2e] rounded-xl p-3 text-center border border-gray-800">
          <p className="text-2xl font-bold text-yellow-400">{bookmarkedManga.length}</p>
          <p className="text-xs text-gray-400 mt-1">Favorit</p>
        </div>
        <div className="bg-[#1a1a2e] rounded-xl p-3 text-center border border-gray-800">
          <p className="text-2xl font-bold text-green-400">{downloads.length}</p>
          <p className="text-xs text-gray-400 mt-1">Downloaded</p>
        </div>
      </div>

      {/* Continue Reading */}
      {continueReading.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white mb-3">📖 Lanjutkan Membaca</h2>
          <div className="space-y-2">
            {continueReading.map((manga) => {
              const latest = getLatestProgress(manga.id);
              const chIdx = manga.chapters.findIndex(c => c.id === latest?.chapterId);
              
              return (
                <div
                  key={manga.id}
                  className="flex items-center gap-3 bg-[#1a1a2e] rounded-xl p-3 border border-gray-800 cursor-pointer hover:bg-[#252547] transition-colors"
                  onClick={() => onSelectManga(manga)}
                >
                  <MangaCover
                    src={manga.cover}
                    alt={manga.title}
                    className="w-12 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{manga.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Chapter {(latest ? chIdx + 1 : 1)} • Hal. {(latest?.page || 0) + 1}
                    </p>
                    {/* Progress bar */}
                    {latest && (
                      <div className="mt-1.5 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${((latest.page + 1) / manga.chapters[chIdx].pages.length) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (latest) onReadChapter(manga, chIdx, latest.page);
                    }}
                    className="px-3 py-1.5 bg-purple-600 rounded-lg text-xs text-white font-medium"
                  >
                    Baca
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Downloaded */}
      {downloadedManga.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white mb-3">📥 Tersedia Offline</h2>
          <div className="space-y-2">
            {downloadedManga.map((manga) => {
              const chs = getDownloadedChapters(manga.id);
              return (
                <div
                  key={manga.id}
                  className="flex items-center gap-3 bg-[#1a1a2e] rounded-xl p-3 border border-gray-800 cursor-pointer hover:bg-[#252547] transition-colors"
                  onClick={() => onSelectManga(manga)}
                >
                  <MangaCover
                    src={manga.cover}
                    alt={manga.title}
                    className="w-12 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{manga.title}</p>
                    <p className="text-xs text-green-400 mt-0.5">
                      {chs.length} chapter tersedia offline
                    </p>
                  </div>
                  <span className="text-green-400 text-lg">✅</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All Manga */}
      <div>
        <h2 className="text-lg font-bold text-white mb-3">📚 Semua Manga</h2>
        <div className="space-y-2">
          {mangaList.map((manga) => (
            <div
              key={manga.id}
              className="flex items-center gap-3 bg-[#1a1a2e] rounded-xl p-3 border border-gray-800 cursor-pointer hover:bg-[#252547] transition-colors"
              onClick={() => onSelectManga(manga)}
            >
              <MangaCover
                src={manga.cover}
                alt={manga.title}
                className="w-12 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{manga.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{manga.author}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-yellow-400">★ {manga.rating}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-400">{manga.chapters.length} ch</span>
                  {bookmarks.includes(manga.id) && (
                    <>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-yellow-400">⭐</span>
                    </>
                  )}
                </div>
              </div>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
