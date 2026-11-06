const MANGADEX_API = 'https://api.mangadex.org';
const PREFIX = '/api/mangadex';
const UUID = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';

// Only forward parameters the application intentionally uses. This prevents
// Vercel's internal catch-all parameter (___path) from reaching MangaDex.
const ALLOWED_QUERY_PARAMS = new Set([
  'limit',
  'offset',
  'title',
  'order[followedCount]',
  'order[chapter]',
  'includes[]',
  'contentRating[]',
  'availableTranslatedLanguage[]',
  'translatedLanguage[]',
  'includeFuturePublishAt',
]);

// Keep this allowlist in sync with the MangaDex endpoints used by the app.
const ROUTES = [
  { pattern: /^\/manga$/, cacheSeconds: 600 },
  { pattern: new RegExp(`^/manga/${UUID}$`), cacheSeconds: 600 },
  { pattern: new RegExp(`^/manga/${UUID}/feed$`), cacheSeconds: 300 },
  // At-home responses contain short-lived tokens and must not be cached.
  { pattern: new RegExp(`^/at-home/server/${UUID}$`), cacheSeconds: 0 },
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).send('Method not allowed');
    return;
  }

  const requestUrl = new URL(req.url || '/', `https://${req.headers.host || 'localhost'}`);
  const path = requestUrl.pathname.startsWith(PREFIX)
    ? requestUrl.pathname.slice(PREFIX.length)
    : '';
  const route = ROUTES.find(({ pattern }) => pattern.test(path));

  if (!route) {
    res.status(404).send('Not found');
    return;
  }

  // Rebuild the query from an explicit allowlist; never forward Vercel routing
  // metadata or any other parameter that the app does not intentionally send.
  const query = new URLSearchParams();
  for (const [key, value] of requestUrl.searchParams.entries()) {
    if (ALLOWED_QUERY_PARAMS.has(key)) {
      query.append(key, value);
    }
  }
  const queryString = query.toString();

  try {
    const upstream = await fetch(`${MANGADEX_API}${path}${queryString ? `?${queryString}` : ''}`, {
      headers: {
        'User-Agent': 'MangaKu/1.0',
        Accept: 'application/json',
      },
    });
    const body = await upstream.text();

    res.status(upstream.status);
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    res.setHeader(
      'Cache-Control',
      upstream.ok && route.cacheSeconds > 0
        ? `public, s-maxage=${route.cacheSeconds}, stale-while-revalidate=60`
        : 'no-store',
    );
    res.send(body);
  } catch (error) {
    console.error('MangaDex proxy error:', error);
    res.status(502).json({ error: 'Upstream request failed' });
  }
}
