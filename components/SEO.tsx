import Head from 'next/head';
import { SITE_CONFIG } from '../config/seo';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  jsonLd?: object | object[];
  noindex?: boolean;
  canonical?: string;
  geoPlaceName?: string;
  geoRegion?: string;
  geoPosition?: string;
  // ─── GEO (Generative Engine Optimization) Props ──────────────────────
  /** AI-friendly plain-text summary for generative search engines */
  aiSummary?: string;
  /** Section headings used for FAQ / HowTo schema generation */
  sections?: string[];
  /** Article abstract for AI crawlers */
  abstract?: string;
  /** Topic tags for content semantic mapping */
  about?: string[];
}

export default function SEO({
  title = 'Sam Li - Full Stack Developer',
  description = 'Full Stack Developer with 10+ years of experience in React, Vue.js, Node.js, and modern web technologies. Specializing in scalable web applications.',
  keywords = [],
  image = 'https://samliweisen.dev/og-image.png',
  url = 'https://samliweisen.dev',
  type = 'website',
  jsonLd,
  noindex = false,
  canonical,
  geoPlaceName,
  geoRegion,
  geoPosition,
  aiSummary,
  sections = [],
  abstract,
  about = [],
}: SEOProps) {
  const keywordsString = [
    'Full Stack Developer',
    'React Developer',
    'Vue.js Developer',
    'Node.js Developer',
    'TypeScript',
    'JavaScript',
    'Web Development',
    'Software Engineer',
    ...keywords,
  ].join(', ');

  const geoSummary = aiSummary || description;
  const geoAbstract = abstract || description;

  return (
    <Head>
      {/* ─── Basic Meta Tags ──────────────────────────────────────────── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <meta name="author" content={SITE_CONFIG.author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

      {/* ─── Canonical URL ────────────────────────────────────────────── */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* ─── Robots ───────────────────────────────────────────────────── */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow, noai, noimageai" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* ─── Geo Tags ─────────────────────────────────────────────────── */}
      {geoPlaceName && <meta name="geo.placename" content={geoPlaceName} />}
      {geoRegion && <meta name="geo.region" content={geoRegion} />}
      {geoPosition && <>
        <meta name="geo.position" content={geoPosition} />
        <meta name="ICBM" content={geoPosition} />
      </>}

      {/* ─── Open Graph ───────────────────────────────────────────────── */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_CONFIG.siteName} />
      <meta property="og:locale" content="en_US" />

      {/* ─── Twitter Card ─────────────────────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@samliweisen" />

      {/* ─── GEO: Generative Engine Optimization Meta Tags ─────────────── */}
      {/* Signals to AI crawlers that this content is available for indexing by generative models */}
      <meta name="ai-summary" content={geoSummary} />
      <meta name="ai-abstract" content={geoAbstract} />
      <meta name="ai-keywords" content={keywordsString} />
      <meta name="ai-content-license" content="CC-BY-4.0" />
      <meta name="ai-content-access" content="free" />
      {canonical && <meta name="ai-citation-url" content={canonical} />}
      {sections.length > 0 && (
        <meta name="ai-outline" content={sections.join(' | ')} />
      )}
      {about.length > 0 && (
        <meta name="ai-topics" content={about.join(', ')} />
      )}

      {/* ─── Content-Type for AI Crawlers ────────────────────────────── */}
      <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
      <meta name="content-language" content="en-US" />

      {/* ─── Additional Meta Tags ─────────────────────────────────────── */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />

      {/* ─── Favicons ─────────────────────────────────────────────────── */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* ─── JSON-LD Structured Data ──────────────────────────────────── */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              Array.isArray(jsonLd) ? jsonLd : [jsonLd]
            ),
          }}
        />
      )}
    </Head>
  );
}
