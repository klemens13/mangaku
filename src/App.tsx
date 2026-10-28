import { useState, useEffect } from 'react';
import { Manga, ReadingProgress } from './types';
import { mangaData } from './data/manga';
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
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    setProgress(getReadingProgress());
    setBookmarks(getBookmarks());

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSelectManga = (manga: Manga) => {
    setSelectedManga(manga);
    setCurrentPage('detail');
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
            mangaList={mangaData}
            progress={progress}
            bookmarks={bookmarks}
            onSelectManga={handleSelectManga}
            onToggleBookmark={handleToggleBookmark}
            isOnline={isOnline}
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
