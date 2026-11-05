import { useState, useEffect } from 'react';
import { Manga, ReadingProgress } from './types';
import { mangaData } from './data/manga';
import { mangadexAPI } from './services/mangadex';
import { getReadingProgress, getBookmarks, isBookmarked, toggleBookmark, getSettings, saveSettings, AppSettings } from './utils/storage';
import MangaList from './components/MangaList';
import MangaDetail from './components/MangaDetail';
import MangaReader from './components/MangaReader';
import Library from './components/Library';
import Settings from './components/Settings';
import BottomNav from './components/BottomNav';
import InstallPrompt from './components/InstallPrompt';

type Page = 'home' | 'library' | 'settings' | 'detail' | 'reader';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number>(0);
  const [startPage, setStartPage] = useState<number>(0);
  const [progress, setProgress] = useState<ReadingProgress[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [settings, setSettings] = useState<AppSettings>(getSettings());
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [mangaList, setMangaList] = useState<Manga[]>(mangaData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setProgress(getReadingProgress());
    setBookmarks(getBookmarks());

    const handleOnline = () => {
      setIsOnline(true);
      setError(null);
      void loadMangaFromAPI();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setMangaList(mangaData);
      setError('Mode offline: menampilkan data lokal.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }

    // Load manga from MangaDex API
    if (!navigator.onLine) {
      setMangaList(mangaData);
      setError('Mode offline: menampilkan data lokal.');
    } else {
      void loadMangaFromAPI();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadMangaFromAPI = async () => {
    if (!navigator.onLine) {
      setMangaList(mangaData);
      setError('Mode offline: menampilkan data lokal.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const manga = await mangadexAPI.getPopularManga(20);

      if (Array.isArray(manga) && manga.length > 0) {
        setMangaList(manga);
        return;
      }

      setMangaList(mangaData);
    } catch (err) {
      console.error('Failed to load manga from API:', err);
      setMangaList((current) => current.length > 0 ? current : mangaData);
      setError('Tidak dapat terhubung ke server MangaDex. Menampilkan data offline.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectManga = async (manga: Manga) => {
    setSelectedManga(manga);
    setCurrentPage('detail');

    // Jika chapters kosong, fetch dari API
    if (manga.chapters.length === 0) {
      try {
        const details = await mangadexAPI.getMangaDetails(manga.id);
        if (details) {
          setSelectedManga(details);
        }
      } catch (err) {
        console.error('Failed to load manga details:', err);
      }
    }
  };

  const handleReadChapter = (manga: Manga, chapterIndex: number, page: number = 0) => {
    setSelectedManga(manga);
    setSelectedChapter(chapterIndex);
    setStartPage(page);
    setCurrentPage('reader');
  };

  const handleBack = () => {
    if (currentPage === 'reader') {
      setCurrentPage('detail');
    } else if (currentPage === 'detail') {
      setCurrentPage('home');
    }
  };

  const handleToggleBookmark = (mangaId: string) => {
    toggleBookmark(mangaId);
    setBookmarks(getBookmarks());
  };

  const handleSettingsChange = (newSettings: AppSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleProgressUpdate = () => {
    setProgress(getReadingProgress());
  };

  return (
    <div className="min-h-screen bg-[#0f0f23] text-white flex flex-col">
      {/* Status bar indicator */}
      {!isOnline && (
        <div className="bg-orange-600 text-white text-center py-1 text-xs font-medium">
          ⚠️ Mode Offline - Beberapa fitur terbatas
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 pb-16 overflow-auto">
        {currentPage === 'home' && (
          <MangaList
            mangaList={mangaList}
            progress={progress}
            bookmarks={bookmarks}
            onSelectManga={handleSelectManga}
            onToggleBookmark={handleToggleBookmark}
            isOnline={isOnline}
            loading={loading}
            error={error}
            onRetry={() => void loadMangaFromAPI()}
          />
        )}
        {currentPage === 'library' && (
          <Library
            mangaList={mangaData}
            progress={progress}
            bookmarks={bookmarks}
            onSelectManga={handleSelectManga}
            onReadChapter={handleReadChapter}
          />
        )}
        {currentPage === 'settings' && (
          <Settings
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />
        )}
        {currentPage === 'detail' && selectedManga && (
          <MangaDetail
            manga={selectedManga}
            progress={progress}
            isBookmarked={isBookmarked(selectedManga.id)}
            onBack={handleBack}
            onReadChapter={handleReadChapter}
            onToggleBookmark={() => handleToggleBookmark(selectedManga.id)}
          />
        )}
        {currentPage === 'reader' && selectedManga && (
          <MangaReader
            manga={selectedManga}
            chapterIndex={selectedChapter}
            startPage={startPage}
            settings={settings}
            onBack={handleBack}
            onProgressUpdate={handleProgressUpdate}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      {(currentPage === 'home' || currentPage === 'library' || currentPage === 'settings') && (
        <BottomNav
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />
      )}

      {/* Install PWA Prompt */}
      <InstallPrompt />
    </div>
  );
}
