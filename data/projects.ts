export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption: string;
}

export interface Project {
  slug?: string;
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  highlights: string[];
  screenshots?: ProjectScreenshot[];
  url?: string;
  category: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "hans-construction",
    name: "Hans Construction",
    description: "Construction company website. Built with SvelteKit for fast performance.",
    longDescription: "Hans Construction needed a professional web presence that could showcase their portfolio of commercial and residential projects to attract new clients in the Greater Toronto Area. The existing site was slow, hard to update, and failing to generate leads. I rebuilt it from the ground up using SvelteKit's static site generation — every page is pre-rendered as pure HTML, so visitors see content instantly regardless of their device or connection speed. The project portfolio section lets potential clients browse completed jobs by category, and the integrated contact form feeds directly into the team's inbox. I also invested in local SEO — structured data, location-specific landing pages, and Google Business Profile optimizations — which helped organic traffic grow steadily in the months after launch.",
    technologies: ["SvelteKit", "Tailwind CSS", "Vercel"],
    highlights: [
      "Static site generation for speed",
      "Project portfolio",
      "SEO work for local leads",
    ],
    screenshots: [
      {
        src: "/images/projects/hans-construction-home.svg",
        alt: "Hans Construction homepage screenshot showing a construction portfolio landing page",
        caption: "Homepage hero and project portfolio entry point",
      },
    ],
    url: "https://hanscons.com",
    category: "client",
  },
  {
    slug: "aivio-digital",
    name: "Aivio Digital",
    description: "Migrated from WordPress to Astro to improve performance and reduce hosting costs.",
    longDescription: "Aivio Digital was spending $78/month on managed WordPress hosting, premium plugins, and security scanning for a site that was essentially a static brochure. Page load times hovered around 2.8 seconds on mobile, and plugin updates were a constant maintenance burden. I migrated the entire site to Astro — a framework designed specifically for content-heavy sites that ships zero JavaScript by default. Blog posts moved from a MySQL database to Markdown files with Zod schema validation, catching missing metadata at build time rather than silently at runtime. Seven WordPress plugins were eliminated because the problems they solved — caching, security scanning, image optimization, SEO management — simply do not exist on a static site. The result: hosting costs dropped to $0/month on Netlify's free tier, Google PageSpeed climbed from 58 to 97 on mobile, and average page load time fell from 2.8 seconds to 0.4 seconds.",
    technologies: ["Astro", "Tailwind CSS", "Vercel"],
    highlights: [
      "Removed WordPress dependency",
      "Faster page loads",
      "Low-cost hosting",
    ],
    screenshots: [
      {
        src: "/images/projects/aivio-digital-home.svg",
        alt: "Aivio Digital homepage screenshot showing a fast agency landing page",
        caption: "Static Astro landing page after the WordPress migration",
      },
    ],
    url: "https://aivio-digital.com",
    category: "client",
  },
  {
    slug: "realtor-service-platform",
    name: "Realtor Service Platform",
    description: "Real estate service marketplace with payment processing.",
    longDescription: "This marketplace connects property owners with real estate service providers — home inspectors, stagers, photographers, and appraisers — across Canada. Property owners can browse by service type, compare providers, and book with confirmed pricing. Providers get a dashboard showing incoming requests, their availability calendar, and a live view of earnings. The platform uses Supabase for authentication and the database, with row-level security enforcing that providers can only see their own bookings and clients can only see their own history. Real-time booking status updates are powered by Supabase's subscription feature — when a provider accepts a request, the client sees the confirmation within seconds without refreshing. Stripe handles all payment processing and weekly provider payouts, keeping the platform free from PCI compliance complexity. The first year saw over $150,000 in transaction volume processed with a 4.6-star average rating from both sides of the marketplace.",
    technologies: ["SvelteKit", "Tailwind CSS", "Stripe", "Supabase"],
    highlights: ["Stripe payments", "User accounts", "Service booking"],
    screenshots: [
      {
        src: "/images/projects/realtor-service-platform-dashboard.svg",
        alt: "Realtor Service Platform dashboard screenshot with bookings and provider cards",
        caption: "Marketplace dashboard for bookings and service-provider management",
      },
    ],
    url: "https://realtorservice.ca",
    category: "client",
  },
  {
    slug: "hans-steel-canada",
    name: "Hans Steel Canada",
    description: "Corporate website for a steel manufacturing company.",
    longDescription: "Hans Steel was paying over $300/month to run a WordPress site that never changed — a collection of static product pages, a gallery, and a contact form. Emergency fixes, plugin updates, and bandwidth overages kept pushing the bill higher. I migrated the site to Next.js with static site generation deployed on Netlify. Every page is now pre-built HTML served from Netlify's edge network, eliminating database queries, PHP processing, and bandwidth overages entirely. Product photos went through Next.js's built-in image optimization, shrinking the homepage payload from 8 MB to under 800 KB. The contact form moved to Netlify Forms at no additional cost. The result was immediate: hosting cost dropped from $300+/month to $0, page load time fell from 4.2 seconds to 0.9 seconds, and the Lighthouse score jumped from 45 to 98. The sales team now spends time selling steel instead of managing a website.",
    technologies: ["Next.js", "Tailwind CSS", "Netlify"],
    highlights: ["Product showcase", "Corporate rebrand", "SEO improvements"],
    screenshots: [
      {
        src: "/images/projects/hans-steel-canada-products.svg",
        alt: "Hans Steel Canada product showcase screenshot with steel categories and contact CTA",
        caption: "Product showcase and corporate lead-generation layout",
      },
    ],
    url: "https://hanssteel.com",
    category: "client",
  },
  {
    slug: "kaifei-landscaping",
    name: "Kaifei Landscaping",
    description: "Landscaping business website. Moved from Wix to Next.js with a project gallery and service area map.",
    longDescription: "Kaifei Landscaping had outgrown their Wix site — it was slow to load, looked generic, and offered no way to showcase the quality of their completed projects. I rebuilt the site in Next.js with a focus on two things: visual impact and local search visibility. The project gallery lets visitors browse completed landscaping jobs filtered by type (patios, gardens, driveways), with full-resolution before-and-after photos. An interactive Mapbox service-area map shows exactly which neighbourhoods Kaifei serves, making it immediately clear to potential customers whether they qualify. The performance difference versus Wix was significant: Lighthouse performance score went from 42 to 94, and mobile load time dropped from over 5 seconds to under 1 second. Combined with structured data markup for local businesses and neighbourhood-specific landing pages, organic traffic from Google roughly doubled in the first six months.",
    technologies: ["Next.js", "Tailwind CSS", "Mapbox"],
    highlights: [
      "Performance upgrade from Wix",
      "Project gallery",
      "Local SEO",
    ],
    screenshots: [
      {
        src: "/images/projects/kaifei-landscaping-gallery.svg",
        alt: "Kaifei Landscaping gallery screenshot with landscaping project cards and service area map",
        caption: "Project gallery and service-area experience",
      },
    ],
    url: "https://kaifeilandscaping.com",
    category: "client",
  },
  {
    slug: "surewin",
    name: "Surewin",
    description: "Multi-language website for legal information with contact form integration.",
    longDescription: "Surewin needed a professional website capable of serving visitors in multiple languages while maintaining strong search visibility across each locale. The project was built with Nuxt.js and a fully localized routing structure, allowing users to switch seamlessly between languages without losing context. Content is organized around legal service categories, making it easy for potential clients to find relevant information and contact the firm. Special attention was given to international SEO, including localized metadata, language-specific sitemaps, and structured data. The integrated contact forms route inquiries directly to the appropriate team, reducing response times and improving lead conversion. The final result is a fast, accessible, and search-engine-friendly platform that supports both local and international audiences.",
    technologies: ["Nuxt.js", "Tailwind CSS", "Vercel"],
    highlights: [
      "Multi-language support",
      "Contact form integration",
      "SEO for multiple locales",
    ],
    screenshots: [
      {
        src: "/images/projects/surewin-localized-site.svg",
        alt: "Surewin multilingual legal website screenshot with localized navigation and contact form",
        caption: "Localized legal information pages with contact conversion flow",
      },
    ],
    url: "https://surewin.ca",
    category: "client",
  },
  {
    slug: "juzi-book-house",
    name: "Juzi Book House",
    description: "Online novel platform with subscriptions and author management tools.",
    longDescription: "Juzi Book House is a digital publishing platform designed for independent authors and online readers. Authors can create and manage novels, organize chapters, track subscriber activity, and publish updates through a dedicated dashboard. Readers can browse books by category, bookmark favorites, and unlock premium content through subscription plans powered by Stripe. Supabase handles authentication, content storage, and role-based permissions, ensuring authors only manage their own works while readers retain access to purchased content. The platform also includes reading progress tracking, chapter analytics, and engagement metrics to help authors understand audience behavior. Built with SvelteKit, the application delivers a fast reading experience while remaining scalable as the content library grows.",
    technologies: ["SvelteKit", "Supabase", "Stripe"],
    highlights: [
      "Author dashboard",
      "Subscription payments",
      "Reader engagement features",
    ],
    screenshots: [
      {
        src: "/images/projects/juzi-book-house-library.svg",
        alt: "Juzi Book House library screenshot with novels, chapters, and subscription status",
        caption: "Reader library and author publishing workflow",
      },
    ],
    url: "https://juzibookhouse.com",
    category: "saas",
  },
  {
    slug: "landlord-master",
    name: "Landlord Master",
    description: "Property management platform for landlords.",
    longDescription: "Landlord Master was built to simplify rental property management for independent landlords and small property management companies. The platform centralizes property listings, tenant records, lease agreements, maintenance requests, and rent collection into a single dashboard. Landlords can track occupancy rates, monitor payment status, and manage multiple properties without relying on spreadsheets or disconnected tools. Stripe powers secure rent collection and automated payment reminders, while MongoDB stores tenant and property data with flexible schemas that accommodate different rental scenarios. The system reduces administrative workload and provides landlords with a clear overview of cash flow, upcoming lease renewals, and maintenance activity across their portfolio.",
    technologies: ["Next.js", "MongoDB", "Stripe"],
    highlights: [
      "Property listings",
      "Tenant management",
      "Payment processing",
    ],
    screenshots: [
      {
        src: "/images/projects/landlord-master-dashboard.svg",
        alt: "Landlord Master dashboard screenshot with rental properties, payments, and maintenance cards",
        caption: "Landlord operations dashboard for properties, payments, and maintenance",
      },
    ],
    url: "https://landlordmaster.com",
    category: "saas",
  },
  {
    slug: "what-sam-watched",
    name: "Movie Progress Tracker",
    description: "Track movies watched with stats and visualizations.",
    longDescription: "Movie Progress Tracker started as a personal project to analyze viewing habits and build a richer movie-tracking experience than traditional watchlists. Users can log watched films, track progress toward yearly goals, and explore detailed statistics about genres, directors, countries, and viewing trends over time. The application integrates with external movie APIs to automatically retrieve posters, ratings, and metadata, reducing manual data entry. A custom analytics dashboard transforms viewing history into interactive charts and summaries, making it easy to identify patterns and discover gaps in personal watchlists. Built with Nuxt 3 and PostgreSQL, the project serves as both a practical tool and an exploration of data visualization techniques.",
    technologies: ["Nuxt 3", "Vue.js", "PostgreSQL"],
    highlights: [
      "Progress tracking",
      "Analytics dashboard",
      "API integrations",
    ],
    screenshots: [
      {
        src: "/images/projects/what-sam-watched-stats.svg",
        alt: "Movie Progress Tracker stats screenshot with movie cards and viewing analytics charts",
        caption: "Viewing analytics and movie progress dashboard",
      },
    ],
    url: "https://movies.samliweisen.dev",
    category: "personal",
  },
  {
    slug: "rich-sam-morty",
    name: "Rick and Morty Explorer",
    description: "Explore characters and episodes from the show.",
    longDescription: "Rick and Morty Explorer is a frontend-focused project built to demonstrate GraphQL data fetching, filtering, and client-side search capabilities. The application consumes the public Rick and Morty GraphQL API and allows users to browse characters, episodes, and locations through a responsive interface. Advanced filtering and pagination help users quickly locate specific characters or explore the show's universe without overwhelming the interface. SvelteKit's routing and data loading features provide a fast, seamless browsing experience, while Tailwind CSS keeps the UI lightweight and responsive. The project serves as a practical showcase of modern frontend architecture and GraphQL integration patterns.",
    technologies: ["SvelteKit", "GraphQL", "Tailwind CSS"],
    highlights: ["GraphQL queries", "Search and filter", "Paginated results"],
    screenshots: [
      {
        src: "/images/projects/rich-sam-morty-explorer.svg",
        alt: "Rick and Morty Explorer screenshot with character cards, filters, and pagination",
        caption: "GraphQL-powered character explorer with filtering",
      },
    ],
    url: "https://ricksammorty.netlify.app",
    category: "personal",
  },
  {
    slug: "express-api-server",
    name: "Express API Server",
    description: "REST API with auth and rate limiting.",
    longDescription: "This Express API project provides a production-ready foundation for modern web applications requiring authentication, authorization, and secure data access. Built with TypeScript and MongoDB, it includes JWT-based authentication, request validation, role-based access control, and rate limiting to protect against abuse. The architecture separates controllers, services, and database logic to improve maintainability and scalability as new features are added. Error handling, logging, and environment-based configuration are built into the project from the start, making it suitable for both learning and real-world deployments. The API serves as a reusable backend template that can accelerate development for future SaaS and client projects.",
    technologies: ["Express.js", "MongoDB", "TypeScript"],
    highlights: ["JWT authentication", "Input validation", "Rate limiting"],
    screenshots: [
      {
        src: "/images/projects/express-api-server-docs.svg",
        alt: "Express API Server documentation screenshot with endpoint list and authentication flow",
        caption: "API documentation and authentication flow overview",
      },
    ],
    category: "api",
  },
  {
    slug: "portfolio-dashboard",
    name: "Portfolio & Dashboard",
    description: "This site. Personal portfolio with expense tracking.",
    longDescription: "This website serves as both a personal portfolio and an internal business dashboard. Beyond showcasing client projects and technical skills, it includes a custom expense tracking system used to monitor project costs, recurring subscriptions, and business spending. The blog system allows technical articles and project write-ups to be published without relying on third-party platforms, while the dashboard provides a centralized view of financial activity. Built with Next.js, TypeScript, and MongoDB, the application emphasizes performance, maintainability, and full ownership of data. It also acts as a testing ground for new features, design ideas, and development workflows before they are introduced into client projects.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    highlights: ["Expense tracking", "Responsive design", "Blog system"],
    screenshots: [
      {
        src: "/images/projects/portfolio-dashboard-overview.svg",
        alt: "Portfolio and Dashboard screenshot with expense widgets and content sections",
        caption: "Portfolio and internal business dashboard overview",
      },
    ],
    url: "https://samliweisen.dev",
    category: "personal",
  }
];

export const PROJECT_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "client", label: "Client Work" },
  { id: "saas", label: "SaaS Products" },
  { id: "personal", label: "Personal" },
  { id: "api", label: "APIs" },
];
