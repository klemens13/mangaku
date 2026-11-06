const MANGADEX_API = 'https://api.mangadex.org';
const UUID = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).send('Method not allowed');
    return;
  }

  const requestUrl = new URL(req.url || '/', `https://${req.headers.host || 'localhost'}`);
  const match = requestUrl.pathname.match(new RegExp(`/api/mangadex/manga/(${UUID})$`));
  if (!match) {
    res.status(404).send('Not found');
    return;
  }

  // Manga detail only needs includes[]. Exclude Vercel's internal route params.
  const query = new URLSearchParams();
  for (const value of requestUrl.searchParams.getAll('includes[]')) {
    query.append('includes[]', value);
  }
  const queryString = query.toString();

  try {
    const upstream = await fetch(
      `${MANGADEX_API}/manga/${match[1]}${queryString ? `?${queryString}` : ''}`,
      { headers: { 'User-Agent': 'MangaKu/1.0', Accept: 'application/json' } },
    );
    const body = await upstream.text();
    res.status(upstream.status);
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    res.setHeader(
      'Cache-Control',
      upstream.ok ? 'public, s-maxage=600, stale-while-revalidate=60' : 'no-store',
    );
    res.send(body);
  } catch (error) {
    console.error('MangaDex detail proxy error:', error);
    res.status(502).json({ error: 'Upstream request failed' });
  }
}
