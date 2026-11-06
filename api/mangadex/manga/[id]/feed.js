const MANGADEX_API = 'https://api.mangadex.org';
const UUID = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';
const ALLOWED_QUERY_PARAMS = new Set([
  'limit',
  'offset',
  'translatedLanguage[]',
  'contentRating[]',
  'order[chapter]',
  'includeFuturePublishAt',
]);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).send('Method not allowed');
    return;
  }

  const requestUrl = new URL(req.url || '/', `https://${req.headers.host || 'localhost'}`);
  const match = requestUrl.pathname.match(new RegExp(`/api/mangadex/manga/(${UUID})/feed$`));
  if (!match) {
    res.status(404).send('Not found');
    return;
  }

  const query = new URLSearchParams();
  for (const [key, value] of requestUrl.searchParams.entries()) {
    if (ALLOWED_QUERY_PARAMS.has(key)) query.append(key, value);
  }
  const queryString = query.toString();

  try {
    const upstream = await fetch(
      `${MANGADEX_API}/manga/${match[1]}/feed${queryString ? `?${queryString}` : ''}`,
      { headers: { 'User-Agent': 'MangaKu/1.0', Accept: 'application/json' } },
    );
    const body = await upstream.text();
    res.status(upstream.status);
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    res.setHeader(
      'Cache-Control',
      upstream.ok ? 'public, s-maxage=300, stale-while-revalidate=60' : 'no-store',
    );
    res.send(body);
  } catch (error) {
    console.error('MangaDex chapter proxy error:', error);
    res.status(502).json({ error: 'Upstream request failed' });
  }
}
