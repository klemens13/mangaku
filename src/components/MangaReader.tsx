import { useState, useEffect, useRef, useCallback } from 'react';
import { Manga } from '../types';
import { AppSettings } from '../utils/storage';
import { saveReadingProgress, cacheChapterPages, isChapterDownloaded } from '../utils/storage';
import { mangadexAPI } from '../services/mangadex';

interface Props {
  manga: Manga;
  chapterIndex: number;
  startPage: number;
  settings: AppSettings;
  onBack: () => void;
  onProgressUpdate: () => void;
}

export default function MangaReader({ manga, chapterIndex, startPage, settings, onBack, onProgressUpdate }: Props) {
  const [currentPage, setCurrentPage] = useState(startPage);
  const [showControls, setShowControls] = useState(true);
  const [showDownloadPrompt, setShowDownloadPrompt] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [pages, setPages] = useState<string[]>([]);
  const [loadingPages, setLoadingPages] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const chapter = manga.chapters[chapterIndex];
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setCurrentPage(startPage);
    setDownloaded(isChapterDownloaded(manga.id, chapter.id));
    loadChapterPages();
  }, [chapterIndex, startPage, manga.id, chapter.id]);

  const loadChapterPages = async () => {
    try {
      setLoadingPages(true);
      
      // Jika chapter sudah punya pages, gunakan itu
      if (chapter.pages && chapter.pages.length > 0) {
        setPages(chapter.pages);
      } else {
        // Fetch dari API
        const fetchedPages = await mangadexAPI.getChapterPages(chapter.id);
        setPages(fetchedPages);
      }
    } catch (err) {
      console.error('Failed to load chapter pages:', err);
      setPages([]);
    } finally {
      setLoadingPages(false);
    }
  };

  // Save progress
  useEffect(() => {
    saveReadingProgress({
      mangaId: manga.id,
      chapterId: chapter.id,
      page: currentPage,
      timestamp: Date.now(),
    });
    onProgressUpdate();
  }, [currentPage, manga.id, chapter.id, onProgressUpdate]);

  // Auto-hide controls
  const resetHideTimer = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

  useEffect(() => {
    resetHideTimer();
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [showControls, resetHideTimer]);

  const toggleControls = () => {
    setShowControls(!showControls);
    if (!showControls) resetHideTimer();
  };

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextChapter = () => {
    if (chapterIndex < manga.chapters.length - 1) {
      setCurrentPage(0);
      // Parent will handle chapter change
      window.location.hash = `chapter-${chapterIndex + 1}`;
    }
  };

  const goToPrevChapter = () => {
    if (chapterIndex > 0) {
      setCurrentPage(0);
      window.location.hash = `chapter-${chapterIndex - 1}`;
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await cacheChapterPages(pages, manga.id, chapter.id);
      setDownloaded(true);
      setShowDownloadPrompt(false);
    } catch (e) {
      console.error('Download failed:', e);
    }
    setIsDownloading(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    
    // Only handle horizontal swipes (not vertical scrolling)
    if (absDeltaX > 50 && absDeltaX > absDeltaY * 1.5) {
      if (deltaX > 0) {
        goToPrevPage();
      } else {
        goToNextPage();
      }
    } else if (absDeltaX < 10 && absDeltaY < 10) {
      // It's a tap
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = e.changedTouches[0].clientX - rect.left;
      const width = rect.width;

      if (x < width * 0.3) {
        goToPrevPage();
      } else if (x > width * 0.7) {
        goToNextPage();
      } else {
        toggleControls();
      }
    }
    
    touchStartRef.current = null;
  };

  const handleImageError = (url: string) => {
    setFailedImages(prev => new Set(prev).add(url));
  };

  const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    let clientX: number;
    
    if ('touches' in e) {
      clientX = e.touches[0]?.clientX || e.changedTouches[0]?.clientX || rect.width / 2;
    } else {
      clientX = e.clientX;
    }
    
    const x = clientX - rect.left;
    const width = rect.width;

    if (x < width * 0.3) {
      goToPrevPage();
    } else if (x > width * 0.7) {
      goToNextPage();
    } else {
      toggleControls();
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col" ref={containerRef}>
      {/* Top Controls */}
      {showControls && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent p-4 pt-2">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-center">
              <p className="text-white text-sm font-medium truncate max-w-[200px]">
                {manga.title}
              </p>
              <p className="text-gray-400 text-xs">
                Chapter {chapter.number}: {chapter.title}
              </p>
            </div>
            <button
              onClick={() => setShowDownloadPrompt(!showDownloadPrompt)}
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <span className="text-lg">{downloaded ? '✅' : '📥'}</span>
            </button>
          </div>

          {/* Chapter navigation */}
          <div className="flex items-center justify-between mt-3">
            <button
              onClick={goToPrevChapter}
              disabled={chapterIndex === 0}
              className="px-3 py-1.5 bg-white/10 rounded-lg text-xs text-white disabled:opacity-30"
            >
              ← Prev
            </button>
            <span className="text-xs text-gray-400">
              {chapterIndex + 1} / {manga.chapters.length}
            </span>
            <button
              onClick={goToNextChapter}
              disabled={chapterIndex === manga.chapters.length - 1}
              className="px-3 py-1.5 bg-white/10 rounded-lg text-xs text-white disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Download Prompt */}
      {showDownloadPrompt && showControls && (
        <div className="absolute top-28 left-4 right-4 z-50 bg-[#1a1a2e] rounded-xl p-4 border border-gray-700 shadow-xl">
          <p className="text-white text-sm font-medium mb-2">
            {downloaded ? '✅ Chapter sudah diunduh' : '📥 Download untuk offline'}
          </p>
          <p className="text-gray-400 text-xs mb-3">
            {pages.length} halaman • ~{Math.round(pages.length * 0.5)}MB
          </p>
          {!downloaded && (
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {isDownloading ? 'Mengunduh...' : 'Download Chapter'}
            </button>
          )}
          {downloaded && (
            <button
              onClick={() => setShowDownloadPrompt(false)}
              className="w-full bg-gray-700 text-white py-2 rounded-lg text-sm"
            >
              Tutup
            </button>
          )}
        </div>
      )}

      {/* Loading Pages */}
      {loadingPages && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 text-sm">Memuat halaman...</p>
          </div>
        </div>
      )}

      {/* Manga Page - Vertical Scroll Mode */}
      {!loadingPages && settings.readingMode === 'vertical' ? (
        <div
          className="flex-1 overflow-y-auto"
          onClick={toggleControls}
        >
          <div className="flex flex-col items-center">
            {pages.map((page, index) => (
              failedImages.has(page) ? (
                <div key={page} className="w-full max-w-[800px] mx-auto min-h-[200px] flex items-center justify-center bg-[#1a1a2e]">
                  <div className="text-center p-4">
                    <span className="text-2xl">📄</span>
                    <p className="text-gray-500 text-xs mt-1">Halaman {index + 1} gagal dimuat</p>
                  </div>
                </div>
              ) : (
                <img
                  key={page}
                  src={page}
                  alt={`Page ${index + 1}`}
                  className="w-full max-w-[800px] mx-auto"
                  loading="lazy"
                  onError={() => handleImageError(page)}
                />
              )
            ))}
          </div>
          
          {/* Chapter end */}
          <div className="bg-[#0f0f23] py-8 px-4 text-center">
            <p className="text-gray-400 text-sm mb-4">
              — End of Chapter {chapter.number} —
            </p>
            <div className="flex gap-3 justify-center">
              {chapterIndex > 0 && (
                <button
                  onClick={goToPrevChapter}
                  className="px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-sm text-white"
                >
                  ← Chapter Sebelumnya
                </button>
              )}
              {chapterIndex < manga.chapters.length - 1 && (
                <button
                  onClick={goToNextChapter}
                  className="px-4 py-2 bg-purple-600 rounded-lg text-sm text-white"
                >
                  Chapter Berikutnya →
                </button>
              )}
            </div>
          </div>
        </div>
      ) : !loadingPages ? (
        /* Page-by-page Mode */
        <div
          className="flex-1 flex items-center justify-center relative select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={handleTap}
        >
          {failedImages.has(pages[currentPage]) ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <span className="text-4xl mb-3">📄</span>
              <p className="text-gray-400 text-sm">Gagal memuat halaman</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFailedImages(prev => {
                    const next = new Set(prev);
                    next.delete(pages[currentPage]);
                    return next;
                  });
                }}
                className="mt-3 px-4 py-2 bg-purple-600 rounded-lg text-sm text-white"
              >
                Coba Lagi
              </button>
            </div>
          ) : (
            <img
              src={pages[currentPage]}
              alt={`Page ${currentPage + 1}`}
              className="max-h-full max-w-full object-contain"
              onError={() => handleImageError(pages[currentPage])}
            />
          )}
          
          {/* Navigation arrows */}
          {showControls && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevPage(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center"
                disabled={currentPage === 0}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToNextPage(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center"
                disabled={currentPage === pages.length - 1}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      ) : null}

      {/* Bottom Controls */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/90 to-transparent p-4 pb-6">
          {/* Page slider (only for page mode) */}
          {settings.readingMode === 'horizontal' && (
            <div className="mb-3">
              <input
                type="range"
                min={0}
                max={pages.length - 1}
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {settings.readingMode === 'horizontal' && `Halaman ${currentPage + 1} / ${pages.length}`}
              {settings.readingMode === 'vertical' && `Scroll Mode • ${pages.length} halaman`}
            </span>
            <div className="flex gap-2">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 0 && settings.readingMode === 'horizontal'}
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center disabled:opacity-30"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNextPage}
                disabled={currentPage === pages.length - 1 && settings.readingMode === 'horizontal'}
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center disabled:opacity-30"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
