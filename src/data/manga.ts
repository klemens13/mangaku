import { Manga } from '../types';

// Generate manga pages using placeholder images
const generatePages = (count: number, seed: number): string[] => {
  return Array.from({ length: count }, (_, i) => 
    `https://picsum.photos/seed/${seed}${i}/800/1200`
  );
};

export const mangaData: Manga[] = [
  {
    id: 'manga-1',
    title: 'Petualangan Naga Api',
    author: 'Takeshi Yamamoto',
    cover: 'https://picsum.photos/seed/manga1cover/400/600',
    description: 'Seorang pemuda bernama Ryu menemukan naga api yang tersegel di dalam gua misterius. Bersama naga tersebut, ia harus menyelamatkan dunia dari kegelapan yang mengancam.',
    genre: ['Action', 'Fantasy', 'Adventure'],
    status: 'ongoing',
    rating: 4.8,
    chapters: [
      { id: 'ch-1-1', number: 1, title: 'Awal Mula', pages: generatePages(12, 101) },
      { id: 'ch-1-2', number: 2, title: 'Naga Terbangun', pages: generatePages(14, 102) },
      { id: 'ch-1-3', number: 3, title: 'Kekuatan Baru', pages: generatePages(11, 103) },
      { id: 'ch-1-4', number: 4, title: 'Pertarungan Pertama', pages: generatePages(15, 104) },
      { id: 'ch-1-5', number: 5, title: 'Rahasia Gua', pages: generatePages(13, 105) },
      { id: 'ch-1-6', number: 6, title: 'Sekutu Baru', pages: generatePages(12, 106) },
      { id: 'ch-1-7', number: 7, title: 'Menuju Gunung Api', pages: generatePages(14, 107) },
      { id: 'ch-1-8', number: 8, title: 'Ujian Terakhir', pages: generatePages(16, 108) },
    ]
  },
  {
    id: 'manga-2',
    title: 'Sekolah Sihir Tokyo',
    author: 'Yuki Tanaka',
    cover: 'https://picsum.photos/seed/manga2cover/400/600',
    description: 'Di dunia dimana sihir adalah hal biasa, seorang siswa pindahan tanpa kekuatan sihir ternyata memiliki kemampuan tersembunyi yang bisa mengubah segalanya.',
    genre: ['School', 'Magic', 'Comedy'],
    status: 'ongoing',
    rating: 4.5,
    chapters: [
      { id: 'ch-2-1', number: 1, title: 'Hari Pertama', pages: generatePages(10, 201) },
      { id: 'ch-2-2', number: 2, title: 'Kelas Sihir', pages: generatePages(12, 202) },
      { id: 'ch-2-3', number: 3, title: 'Ujian Praktikum', pages: generatePages(11, 203) },
      { id: 'ch-2-4', number: 4, title: 'Teman Baru', pages: generatePages(13, 204) },
      { id: 'ch-2-5', number: 5, title: 'Turnamen Antar Kelas', pages: generatePages(15, 205) },
      { id: 'ch-2-6', number: 6, title: 'Kekuatan Tersembunyi', pages: generatePages(14, 206) },
    ]
  },
  {
    id: 'manga-3',
    title: 'Blade of Destiny',
    author: 'Kenji Morimoto',
    cover: 'https://picsum.photos/seed/manga3cover/400/600',
    description: 'Seorang samurai tanpa tuan mengembara di Jepang feodal dengan pedang legendaris yang bisa memotong dimensi. Ia mencari balas dendam atas kematian keluarganya.',
    genre: ['Action', 'Historical', 'Drama'],
    status: 'completed',
    rating: 4.9,
    chapters: [
      { id: 'ch-3-1', number: 1, title: 'Samurai Terakhir', pages: generatePages(14, 301) },
      { id: 'ch-3-2', number: 2, title: 'Pedang Dimensi', pages: generatePages(12, 302) },
      { id: 'ch-3-3', number: 3, title: 'Jejak Pembunuh', pages: generatePages(13, 303) },
      { id: 'ch-3-4', number: 4, title: 'Duel di Bulan', pages: generatePages(16, 304) },
      { id: 'ch-3-5', number: 5, title: 'Kebenaran Terungkap', pages: generatePages(15, 305) },
      { id: 'ch-3-6', number: 6, title: 'Pertarungan Akhir', pages: generatePages(18, 306) },
      { id: 'ch-3-7', number: 7, title: 'Epilog', pages: generatePages(10, 307) },
    ]
  },
  {
    id: 'manga-4',
    title: 'Cyber City 2099',
    author: 'Akira Suzuki',
    cover: 'https://picsum.photos/seed/manga4cover/400/600',
    description: 'Di masa depan dimana AI menguasai dunia, sekelompok hacker berjuang mempertahankan kemanusiaan. Sebuah cerita cyberpunk yang penuh aksi dan misteri.',
    genre: ['Sci-Fi', 'Action', 'Thriller'],
    status: 'ongoing',
    rating: 4.6,
    chapters: [
      { id: 'ch-4-1', number: 1, title: 'Dunia Digital', pages: generatePages(12, 401) },
      { id: 'ch-4-2', number: 2, title: 'Hack Pertama', pages: generatePages(11, 402) },
      { id: 'ch-4-3', number: 3, title: 'Perlawanan', pages: generatePages(14, 403) },
      { id: 'ch-4-4', number: 4, title: 'AI Pemberontak', pages: generatePages(13, 404) },
      { id: 'ch-4-5', number: 5, title: 'Jalan Keluar', pages: generatePages(15, 405) },
    ]
  },
  {
    id: 'manga-5',
    title: 'Romance di Musim Semi',
    author: 'Sakura Watanabe',
    cover: 'https://picsum.photos/seed/manga5cover/400/600',
    description: 'Kisah cinta manis antara seorang gadis penjual bunga dan seorang musisi jalanan di kota Kyoto. Setiap musim membawa cerita baru bagi mereka.',
    genre: ['Romance', 'Slice of Life', 'Drama'],
    status: 'ongoing',
    rating: 4.3,
    chapters: [
      { id: 'ch-5-1', number: 1, title: 'Pertemuan', pages: generatePages(10, 501) },
      { id: 'ch-5-2', number: 2, title: 'Melodi Hati', pages: generatePages(11, 502) },
      { id: 'ch-5-3', number: 3, title: 'Hujan dan Bunga', pages: generatePages(12, 503) },
      { id: 'ch-5-4', number: 4, title: 'Perasaan yang Terpendam', pages: generatePages(10, 504) },
    ]
  },
  {
    id: 'manga-6',
    title: 'Demon Hunter X',
    author: 'Ryo Nakamura',
    cover: 'https://picsum.photos/seed/manga6cover/400/600',
    description: 'Seorang pemburu iblis muda dengan kemampuan unik harus menghadapi iblis terkuat yang pernah ada. Pertarungan antara cahaya dan kegelapan.',
    genre: ['Action', 'Supernatural', 'Horror'],
    status: 'ongoing',
    rating: 4.7,
    chapters: [
      { id: 'ch-6-1', number: 1, title: 'Pemburu Muda', pages: generatePages(13, 601) },
      { id: 'ch-6-2', number: 2, title: 'Iblis Pertama', pages: generatePages(14, 602) },
      { id: 'ch-6-3', number: 3, title: 'Latihan Keras', pages: generatePages(11, 603) },
      { id: 'ch-6-4', number: 4, title: 'Misi Gelap', pages: generatePages(15, 604) },
      { id: 'ch-6-5', number: 5, title: 'Kekuatan Iblis', pages: generatePages(16, 605) },
      { id: 'ch-6-6', number: 6, title: 'Transformasi', pages: generatePages(14, 606) },
    ]
  }
];
