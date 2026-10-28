interface Props {
  src?: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

// Placeholder SVG saat gambar cover gagal dimuat (misal URL kosong dari API)
const FALLBACK_COVER = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400">
    <rect width="300" height="400" fill="#1a1a2e"/>
    <g fill="none" stroke="#4b5563" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M90 150h70v110H90z"/>
      <path d="M160 165l60-15v110l-60 15"/>
    </g>
    <text x="150" y="320" fill="#6b7280" font-family="sans-serif" font-size="18" text-anchor="middle">Tidak ada cover</text>
  </svg>`
)}`;

/**
 * Komponen gambar cover manga yang tahan-error:
 * - Jika `src` kosong (API MangaDex tidak mengembalikan file cover), pakai placeholder.
 * - Jika gambar gagal dimuat (URL mati / diblokir offline), otomatis ganti ke placeholder.
 */
export default function MangaCover({ src, alt, className, loading }: Props) {
  return (
    <img
      src={src && src.length > 0 ? src : FALLBACK_COVER}
      alt={alt}
      className={className}
      loading={loading}
      onError={(e) => {
        const img = e.currentTarget;
        if (img.src !== FALLBACK_COVER) {
          img.src = FALLBACK_COVER;
        }
      }}
    />
  );
}
