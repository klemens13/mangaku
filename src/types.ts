export interface Manga {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  genre: string[];
  status: 'ongoing' | 'completed';
  rating: number;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  pages: string[];
  downloaded?: boolean;
}

export interface ReadingProgress {
  mangaId: string;
  chapterId: string;
  page: number;
  timestamp: number;
}

export interface DownloadedChapter {
  mangaId: string;
  chapterId: string;
  pages: string[];
  downloadedAt: number;
}
