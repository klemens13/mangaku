import axios from 'axios';
import { Manga, Chapter } from '../types';

const MANGADEX_API = 'https://api.mangadex.org';

// Hanya tampilkan konten yang aman untuk semua umur
const CONTENT_RATING = ['safe', 'suggestive'];

// Helper untuk delay agar tidak melebihi rate limit
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mangadexAPI = {
  /**
   * Ambil manga populer
   */
  async getPopularManga(limit: number = 20, offset: number = 0): Promise<Manga[]> {
    try {
      await delay(300); // Rate limiting
      
      const response = await axios.get(`${MANGADEX_API}/manga`, {
        params: {
          limit,
          offset,
          'order[followedCount]': 'desc',
          'includes[]': ['cover_art', 'author', 'artist'],
          'contentRating[]': CONTENT_RATING,
          'availableTranslatedLanguage[]': ['id', 'en']
        }
      });

      return this.transformMangaList(response.data.data);
    } catch (error) {
      console.error('Error fetching popular manga:', error);
      throw error;
    }
  },

  /**
   * Search manga
   */
  async searchManga(title: string, limit: number = 20): Promise<Manga[]> {
    try {
      await delay(300);
      
      const response = await axios.get(`${MANGADEX_API}/manga`, {
        params: {
          title,
          limit,
          'includes[]': ['cover_art', 'author', 'artist'],
          'contentRating[]': CONTENT_RATING,
          'availableTranslatedLanguage[]': ['id', 'en']
        }
      });

      return this.transformMangaList(response.data.data);
    } catch (error) {
      console.error('Error searching manga:', error);
      throw error;
    }
  },

  /**
   * Ambil detail manga
   */
  async getMangaDetails(mangaId: string): Promise<Manga | null> {
    try {
      await delay(300);
      
      const response = await axios.get(`${MANGADEX_API}/manga/${mangaId}`, {
        params: {
          'includes[]': ['cover_art', 'author', 'artist']
        }
      });

      // Endpoint detail tidak mendukung filter contentRating, jadi cek manual
      if (!CONTENT_RATING.includes(response.data.data?.attributes?.contentRating)) {
        return null;
      }

      const manga = this.transformManga(response.data.data);
      
      // Ambil chapters
      const chapters = await this.getMangaChapters(mangaId);
      manga.chapters = chapters;
      
      return manga;
    } catch (error) {
      console.error('Error fetching manga details:', error);
      throw error;
    }
  },

  /**
   * Ambil daftar chapter manga
   */
  async getMangaChapters(mangaId: string, limit: number = 100): Promise<Chapter[]> {
    try {
      await delay(300);
      
      const response = await axios.get(`${MANGADEX_API}/manga/${mangaId}/feed`, {
        params: {
          limit,
          'translatedLanguage[]': ['id', 'en'],
          'contentRating[]': CONTENT_RATING,
          'order[chapter]': 'asc',
          'includeFuturePublishAt': 0
        }
      });

      return this.transformChapters(response.data.data);
    } catch (error) {
      console.error('Error fetching chapters:', error);
      throw error;
    }
  },

  /**
   * Ambil halaman-halaman chapter
   */
  async getChapterPages(chapterId: string): Promise<string[]> {
    try {
      await delay(300);
      
      const response = await axios.get(`${MANGADEX_API}/at-home/server/${chapterId}`);
      
      const { baseUrl, chapter } = response.data;
      const pages: string[] = [];

      // Main pages
      if (chapter.data) {
        chapter.data.forEach((filename: string) => {
          pages.push(`${baseUrl}/data/${chapter.hash}/${filename}`);
        });
      }

      return pages;
    } catch (error) {
      console.error('Error fetching chapter pages:', error);
      throw error;
    }
  },

  /**
   * Transform data MangaDex ke format app
   */
  transformMangaList(data: any[]): Manga[] {
    return data.map(item => this.transformManga(item));
  },

  /**
   * Transform single manga data
   */
  transformManga(item: any): Manga {
    const { id, attributes } = item;
    
    // Extract relationships
    const coverRel = item.relationships?.find((r: any) => r.type === 'cover_art');
    const authorRel = item.relationships?.find((r: any) => r.type === 'author');
    const artistRel = item.relationships?.find((r: any) => r.type === 'artist');

    // Get title (prefer English, then romanized, then any)
    const title = attributes.title.en || 
                  attributes.title['ja-ro'] || 
                  attributes.title['zh-ro'] ||
                  Object.values(attributes.title)[0] || 
                  'Unknown Title';

    // Get description
    const description = attributes.description.id || 
                       attributes.description.en || 
                       attributes.description['ja-ro'] ||
                       Object.values(attributes.description)[0] || 
                       '';

    // Get cover URL
    const coverFileName = coverRel?.attributes?.fileName;
    const cover = coverFileName 
      ? `https://uploads.mangadex.org/covers/${id}/${coverFileName}.256.jpg`
      : '';

    // Get author
    const author = authorRel?.attributes?.name || 
                   artistRel?.attributes?.name || 
                   'Unknown Author';

    // Get genres/tags
    const genre = attributes.tags
      ?.map((tag: any) => tag.attributes?.name?.en)
      .filter(Boolean) || [];

    // Get status
    const status = attributes.status === 'ongoing' ? 'ongoing' : 'completed';

    // Get rating (MangaDex tidak menyediakan rating langsung)
    const rating = 0;

    return {
      id,
      title,
      author,
      cover,
      description,
      genre,
      status,
      rating,
      chapters: [] // Will be loaded separately
    };
  },

  /**
   * Transform chapters data
   */
  transformChapters(data: any[]): Chapter[] {
    return data
      .filter(chapter => chapter.attributes.chapter) // Filter out chapters without number
      .map((item, index) => {
        const { id, attributes } = item;
        
        return {
          id,
          number: parseFloat(attributes.chapter) || index + 1,
          title: attributes.title || `Chapter ${attributes.chapter}`,
          pages: [] // Will be loaded when reading
        };
      })
      .sort((a, b) => a.number - b.number);
  },

  /**
   * Get cover URL
   */
  getCoverUrl(mangaId: string, coverFileName: string): string {
    return `https://uploads.mangadex.org/covers/${mangaId}/${coverFileName}.256.jpg`;
  }
};
