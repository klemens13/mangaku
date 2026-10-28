import { Manga, ReadingProgress } from '../types';
import { isChapterDownloaded } from '../utils/storage';
import MangaCover from './MangaCover';

interface Props {
  manga: Manga;
  progress: ReadingProgress[];
  isBookmarked: boolean;
  onBack: () => void;
  onReadChapter: (manga: Manga, chapterIndex: number, page: number) => void;
  onToggleBookmark: () => void;
}

export default function MangaDetail({ manga, progress, isBookmarked, onBack, onReadChapter, onToggleBookmark }: Props) {
  const getChapterProgress = (chapterId: string) => {
    return progress.find(p => p.chapterId === chapterId);
  };

  const latestChapter = progress
    .filter(p => p.mangaId === manga.id)
    .sort((a, b) => b.timestamp - a.timestamp)[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64">
        <MangaCover
          src={manga.cover}
          alt={manga.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f23] via-[#0f0f23]/60 to-transparent" />
        
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Bookmark button */}
        <button
          onClick={onToggleBookmark}
          className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
        >
          <span className="text-xl">{isBookmarked ? '⭐' : '☆'}</span>
        </button>
      </div>

      {/* Info Section */}
      <div className="px-4 -mt-16 relative">
        <div className="flex gap-4">
          <MangaCover
            src={manga.cover}
            alt={manga.title}
            className="w-24 h-32 rounded-lg object-cover shadow-xl border-2 border-[#1a1a2e]"
          />
          <div className="flex-1 pt-4">
            <h1 className="text-xl font-bold text-white leading-tight">{manga.title}</h1>
            <p className="text-sm text-gray-400 mt-1">{manga.author}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-yellow-400 text-sm">★ {manga.rating}</span>
              <span className="text-gray-600">•</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                manga.status === 'ongoing' ? 'bg-green-900/50 text-green-400' : 'bg-blue-900/50 text-blue-400'
              }`}>
                {manga.status === 'ongoing' ? 'Ongoing' : 'Completed'}
              </span>
            </div>
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mt-4">
          {manga.genre.map((g) => (
            <span key={g} className="px-3 py-1 bg-[#1a1a2e] rounded-full text-xs text-purple-300 border border-purple-900/30">
              {g}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 mt-4 leading-relaxed">{manga.description}</p>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          {latestChapter ? (
            <button
              onClick={() => {
                const chIdx = manga.chapters.findIndex(c => c.id === latestChapter.chapterId);
                onReadChapter(manga, chIdx, latestChapter.page);
              }}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium text-sm transition-colors"
            >
              ▶ Lanjutkan Baca
            </button>
          ) : (
            <button
              onClick={() => onReadChapter(manga, 0, 0)}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium text-sm transition-colors"
            >
              ▶ Mulai Baca
            </button>
          )}
          <button
            onClick={() => onReadChapter(manga, manga.chapters.length - 1, 0)}
            className="px-4 bg-[#1a1a2e] border border-gray-700 text-white py-3 rounded-xl text-sm hover:bg-[#252547] transition-colors"
          >
            Ch. Terakhir
          </button>
        </div>

        {/* Chapter List */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-white mb-3">
            Daftar Chapter ({manga.chapters.length})
          </h2>
          <div className="space-y-2 pb-4">
            {manga.chapters.map((chapter, index) => {
              const chProgress = getChapterProgress(chapter.id);
              const downloaded = isChapterDownloaded(manga.id, chapter.id);
              
              return (
                <button
                  key={chapter.id}
                  onClick={() => onReadChapter(manga, index, chProgress?.page || 0)}
                  className="w-full flex items-center justify-between p-3 bg-[#1a1a2e] rounded-xl hover:bg-[#252547] transition-colors border border-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-purple-400 text-sm font-bold">{chapter.number}</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-white font-medium">{chapter.title}</p>
                      <p className="text-xs text-gray-500">{chapter.pages.length} halaman</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {downloaded && (
                      <span className="text-green-400 text-xs">📥</span>
                    )}
                    {chProgress ? (
                      <span className="text-xs text-green-400">
                        Hal. {chProgress.page + 1}/{chapter.pages.length}
                      </span>
                    ) : (
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
