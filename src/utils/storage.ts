import { ReadingProgress, DownloadedChapter } from '../types';

const STORAGE_KEYS = {
  PROGRESS: 'mangaku_progress',
  DOWNLOADS: 'mangaku_downloads',
  BOOKMARKS: 'mangaku_bookmarks',
  SETTINGS: 'mangaku_settings',
};

// Reading Progress
export const getReadingProgress = (): ReadingProgress[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveReadingProgress = (progress: ReadingProgress): void => {
  try {
    const allProgress = getReadingProgress();
    const existingIndex = allProgress.findIndex(
      (p) => p.mangaId === progress.mangaId && p.chapterId === progress.chapterId
    );
    if (existingIndex >= 0) {
      allProgress[existingIndex] = progress;
    } else {
      allProgress.push(progress);
    }
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(allProgress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
};

export const getMangaProgress = (mangaId: string): ReadingProgress | undefined => {
  const allProgress = getReadingProgress();
  return allProgress
    .filter((p) => p.mangaId === mangaId)
    .sort((a, b) => b.timestamp - a.timestamp)[0];
};

// Bookmarks
export const getBookmarks = (): string[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const toggleBookmark = (mangaId: string): boolean => {
  try {
    const bookmarks = getBookmarks();
    const index = bookmarks.indexOf(mangaId);
    if (index >= 0) {
      bookmarks.splice(index, 1);
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
      return false;
    } else {
      bookmarks.push(mangaId);
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
      return true;
    }
  } catch {
    return false;
  }
};

export const isBookmarked = (mangaId: string): boolean => {
  return getBookmarks().includes(mangaId);
};

// Downloads (for offline reading)
export const getDownloads = (): DownloadedChapter[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.DOWNLOADS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveDownload = (download: DownloadedChapter): void => {
  try {
    const downloads = getDownloads();
    const existingIndex = downloads.findIndex(
      (d) => d.mangaId === download.mangaId && d.chapterId === download.chapterId
    );
    if (existingIndex >= 0) {
      downloads[existingIndex] = download;
    } else {
      downloads.push(download);
    }
    localStorage.setItem(STORAGE_KEYS.DOWNLOADS, JSON.stringify(downloads));
  } catch (e) {
    console.error('Failed to save download:', e);
  }
};

export const removeDownload = (mangaId: string, chapterId: string): void => {
  try {
    const downloads = getDownloads();
    const filtered = downloads.filter(
      (d) => !(d.mangaId === mangaId && d.chapterId === chapterId)
    );
    localStorage.setItem(STORAGE_KEYS.DOWNLOADS, JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to remove download:', e);
  }
};

export const isChapterDownloaded = (mangaId: string, chapterId: string): boolean => {
  return getDownloads().some(
    (d) => d.mangaId === mangaId && d.chapterId === chapterId
  );
};

export const getDownloadedChapters = (mangaId: string): string[] => {
  return getDownloads()
    .filter((d) => d.mangaId === mangaId)
    .map((d) => d.chapterId);
};

// Settings
export interface AppSettings {
  readingMode: 'vertical' | 'horizontal';
  brightness: number;
  showPageNumber: boolean;
}

export const getSettings = (): AppSettings => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : { readingMode: 'vertical', brightness: 100, showPageNumber: true };
  } catch {
    return { readingMode: 'vertical', brightness: 100, showPageNumber: true };
  }
};

export const saveSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
};

// Cache images for offline
export const cacheImage = async (url: string): Promise<void> => {
  try {
    if ('caches' in window) {
      const cache = await caches.open('mangaku-images-v1');
      const cachedResponse = await cache.match(url);
      if (!cachedResponse) {
        const response = await fetch(url);
        if (response.ok) {
          await cache.put(url, response);
        }
      }
    }
  } catch (e) {
    console.error('Failed to cache image:', e);
  }
};

export const cacheChapterPages = async (pages: string[], mangaId: string, chapterId: string): Promise<void> => {
  try {
    // Cache all pages
    await Promise.all(pages.map((page) => cacheImage(page)));
    
    // Save download record
    saveDownload({
      mangaId,
      chapterId,
      pages,
      downloadedAt: Date.now(),
    });
  } catch (e) {
    console.error('Failed to cache chapter:', e);
  }
};
