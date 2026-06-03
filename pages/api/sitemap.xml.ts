import type { NextApiRequest, NextApiResponse } from 'next';
import { BLOG_POSTS } from '../../data/blogs';

const SITE_URL = 'https://samliweisen.dev';

// Static pages
const STATIC_PAGES = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/resume', changefreq: 'monthly', priority: 0.9 },
  { url: '/blogs', changefreq: 'weekly', priority: 0.8 },
  { url: '/faq', changefreq: 'monthly', priority: 0.7 },
  { url: '/calculator', changefreq: 'daily', priority: 0.6 },
  // { url: '/expenses', changefreq: 'daily', priority: 0.6 },
];

function generateSiteMap(dynamicPaths: { path: string; lastmod: string }[] = []) {
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

  const dynamicPages = dynamicPaths
    .map(
      ({ path, lastmod }) => `
    <url>
      <loc>${SITE_URL}${path}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages}
    ${dynamicPages}
  </urlset>`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const blogPaths = BLOG_POSTS.map((blog) => ({
      path: `/blogs/${blog.url || blog._id}`,
      lastmod: new Date(blog.created_at || new Date().toISOString()).toISOString(),
    }));

    const sitemap = generateSiteMap(blogPaths);

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end();
  }
}
