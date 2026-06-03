import type { NextApiRequest, NextApiResponse } from 'next';

const SITE_URL = 'https://samliweisen.dev';

// Static pages
const STATIC_PAGES = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/todos', changefreq: 'daily', priority: 0.6 },
];

function generateSiteMap() {
  const staticPages = STATIC_PAGES.map(
    (page) => `
    <url>
      <loc>${SITE_URL}${page.url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `
  ).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages}
  </urlset>`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    const sitemap = generateSiteMap();

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end();
  }
}
