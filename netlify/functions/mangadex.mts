// Proxy ke MangaDex API. MangaDex tidak mengirim header CORS untuk domain pihak ketiga,
// jadi browser memblokir request langsung dari situs ini.
const MANGADEX_API = 'https://api.mangadex.org';
const PREFIX = '/api/mangadex';

const UUID = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';

// Hanya endpoint yang dipakai aplikasi, beserta durasi cache CDN (detik)
const ROUTES: { pattern: RegExp; cacheSeconds: number }[] = [
  { pattern: /^\/manga$/, cacheSeconds: 600 },
  { pattern: new RegExp(`^/manga/${UUID}$`), cacheSeconds: 600 },
  { pattern: new RegExp(`^/manga/${UUID}/feed$`), cacheSeconds: 300 },
  // URL server at-home berisi token yang cepat kedaluwarsa, jangan di-cache
  { pattern: new RegExp(`^/at-home/server/${UUID}$`), cacheSeconds: 0 },
];

export default async (req: Request) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const url = new URL(req.url);
  const path = url.pathname.slice(PREFIX.length);
  const route = ROUTES.find((r) => r.pattern.test(path));
  if (!route) {
    return new Response('Not found', { status: 404 });
  }

  try {
    const upstream = await fetch(`${MANGADEX_API}${path}${url.search}`, {
      headers: { 'User-Agent': 'MangaKu/1.0', Accept: 'application/json' },
    });
    const body = await upstream.text();
    const ok = upstream.ok && route.cacheSeconds > 0;

    return new Response(body, {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('content-type') || 'application/json',
        'Cache-Control': 'no-store',
        'Netlify-CDN-Cache-Control': ok
          ? `public, max-age=${route.cacheSeconds}, stale-while-revalidate=60`
          : 'no-store',
      },
    });
  } catch (error) {
    console.error('MangaDex proxy error:', error);
    return Response.json({ error: 'Upstream request failed' }, { status: 502 });
  }
};

export const config = {
  path: '/api/mangadex/*',
};
