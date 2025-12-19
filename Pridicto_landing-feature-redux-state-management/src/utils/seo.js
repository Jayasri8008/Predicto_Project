// SEO utility for managing meta tags and structured data

export const updateMetaTags = (config) => {
  const {
    title = 'Predicto AI - Smart Project Estimation',
    description = 'AI-powered project estimation for accurate cost, timeline, and resource prediction',
    image = 'https://predicto.ai/og-image.jpg',
    url = 'https://predicto.ai',
    type = 'website',
    author = 'Predicto AI'
  } = config;

  // Update title
  document.title = title;

  // Update or create meta tags
  const createOrUpdateMetaTag = (name, content, isProperty = false) => {
    let tag = document.querySelector(
      isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
    );
    
    if (!tag) {
      tag = document.createElement('meta');
      if (isProperty) {
        tag.setAttribute('property', name);
      } else {
        tag.setAttribute('name', name);
      }
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  // Standard meta tags
  createOrUpdateMetaTag('description', description);
  createOrUpdateMetaTag('author', author);
  createOrUpdateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

  // Open Graph tags
  createOrUpdateMetaTag('og:title', title, true);
  createOrUpdateMetaTag('og:description', description, true);
  createOrUpdateMetaTag('og:image', image, true);
  createOrUpdateMetaTag('og:url', url, true);
  createOrUpdateMetaTag('og:type', type, true);
  createOrUpdateMetaTag('og:site_name', 'Predicto AI', true);

  // Twitter Card tags
  createOrUpdateMetaTag('twitter:card', 'summary_large_image');
  createOrUpdateMetaTag('twitter:title', title);
  createOrUpdateMetaTag('twitter:description', description);
  createOrUpdateMetaTag('twitter:image', image);
  createOrUpdateMetaTag('twitter:site', '@predictoai');

  // LinkedIn tags
  createOrUpdateMetaTag('og:url', url, true);
  createOrUpdateMetaTag('og:type', 'article', true);

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;
};

export const updateStructuredData = (data) => {
  let script = document.querySelector('script[type="application/ld+json"]');
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
};

export const getStructuredDataForPage = (pageType, pageData = {}) => {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': pageType
  };

  switch (pageType) {
    case 'Organization':
      return {
        ...baseSchema,
        name: 'Predicto AI',
        url: 'https://predicto.ai',
        logo: 'https://predicto.ai/logo.png',
        description: 'AI-powered project estimation platform',
        sameAs: [
          'https://www.facebook.com/predictoai',
          'https://twitter.com/predictoai',
          'https://www.linkedin.com/company/predicto-ai'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-555-123-4567',
          contactType: 'Customer Support'
        }
      };

    case 'WebPage':
      return {
        ...baseSchema,
        name: pageData.title || 'Predicto AI',
        description: pageData.description || '',
        url: pageData.url || 'https://predicto.ai',
        datePublished: pageData.datePublished,
        dateModified: pageData.dateModified,
        author: {
          '@type': 'Organization',
          name: 'Predicto AI'
        }
      };

    case 'BlogPosting':
      return {
        ...baseSchema,
        headline: pageData.title || '',
        description: pageData.excerpt || '',
        image: pageData.image || '',
        datePublished: pageData.datePublished || new Date().toISOString(),
        dateModified: pageData.dateModified || new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: pageData.author || 'Predicto AI'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Predicto AI',
          logo: {
            '@type': 'ImageObject',
            url: 'https://predicto.ai/logo.png'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': pageData.url || 'https://predicto.ai/blog'
        }
      };

    case 'Product':
      return {
        ...baseSchema,
        name: pageData.name || 'Predicto AI',
        description: pageData.description || '',
        image: pageData.image || '',
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: pageData.lowPrice || '99',
          highPrice: pageData.highPrice || '299'
        },
        review: {
          '@type': 'Review',
          ratingValue: pageData.rating || '4.9',
          reviewCount: pageData.reviewCount || '1000'
        }
      };

    case 'FAQPage':
      return {
        ...baseSchema,
        mainEntity: (pageData.faqs || []).map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      };

    case 'PriceSpecification':
      return {
        ...baseSchema,
        priceCurrency: 'USD',
        price: pageData.price || '99',
        priceValidUntil: pageData.validUntil || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };

    default:
      return baseSchema;
  }
};

// Generate sitemap
export const generateSitemapIndex = () => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://predicto.ai/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://predicto.ai/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://predicto.ai/pricing</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://predicto.ai/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://predicto.ai/case-studies</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://predicto.ai/api-docs</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://predicto.ai/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://predicto.ai/privacy</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://predicto.ai/terms</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;
};

// robots.txt content
export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /dashboard
Disallow: /api
Crawl-delay: 1

User-agent: AdsBot-Google
Allow: /

Sitemap: https://predicto.ai/sitemap.xml`;
};

// Initialize SEO for a page
export const initPageSEO = (pageConfig) => {
  // Update meta tags
  updateMetaTags(pageConfig.meta);

  // Update structured data
  if (pageConfig.structuredData) {
    updateStructuredData(pageConfig.structuredData);
  }

  // Scroll to top
  window.scrollTo(0, 0);
};

// SEO config for different pages
export const SEO_CONFIG = {
  home: {
    meta: {
      title: 'Predicto AI - Smart Project Estimation with AI',
      description: 'AI-powered project estimation for accurate cost, timeline, and resource prediction. Estimate faster, deliver better.',
      image: 'https://predicto.ai/og-home.jpg',
      url: 'https://predicto.ai'
    },
    structuredData: getStructuredDataForPage('Organization')
  },
  about: {
    meta: {
      title: 'About Predicto AI - Our Mission & Team',
      description: 'Learn about Predicto AI mission, values, and the team behind intelligent project estimation.',
      image: 'https://predicto.ai/og-about.jpg',
      url: 'https://predicto.ai/about'
    }
  },
  pricing: {
    meta: {
      title: 'Pricing Plans - Predicto AI',
      description: 'Flexible pricing plans for teams of all sizes. Choose the perfect plan for your project estimation needs.',
      image: 'https://predicto.ai/og-pricing.jpg',
      url: 'https://predicto.ai/pricing'
    }
  },
  blog: {
    meta: {
      title: 'Blog - Predicto AI Insights & Tips',
      description: 'Read articles about project estimation, AI in business, and project management best practices.',
      image: 'https://predicto.ai/og-blog.jpg',
      url: 'https://predicto.ai/blog'
    }
  },
  caseStudies: {
    meta: {
      title: 'Case Studies - Predicto AI Success Stories',
      description: 'See how leading companies improved project estimation and delivered on time with Predicto AI.',
      image: 'https://predicto.ai/og-cases.jpg',
      url: 'https://predicto.ai/case-studies'
    }
  },
  apiDocs: {
    meta: {
      title: 'API Documentation - Predicto AI',
      description: 'Complete API documentation with code examples and integration guides for Predicto AI.',
      image: 'https://predicto.ai/og-api.jpg',
      url: 'https://predicto.ai/api-docs'
    }
  },
  contact: {
    meta: {
      title: 'Contact Us - Predicto AI',
      description: 'Get in touch with Predicto AI. Contact our sales team or support for assistance.',
      image: 'https://predicto.ai/og-contact.jpg',
      url: 'https://predicto.ai/contact'
    }
  },
  privacy: {
    meta: {
      title: 'Privacy Policy - Predicto AI',
      description: 'Read our privacy policy to understand how we protect and handle your data.',
      image: 'https://predicto.ai/og-privacy.jpg',
      url: 'https://predicto.ai/privacy'
    }
  },
  terms: {
    meta: {
      title: 'Terms of Service - Predicto AI',
      description: 'Review our terms of service and conditions for using Predicto AI.',
      image: 'https://predicto.ai/og-terms.jpg',
      url: 'https://predicto.ai/terms'
    }
  },
  cookies: {
    meta: {
      title: 'Cookie Policy - Predicto AI',
      description: 'Learn about cookies and tracking technologies used by Predicto AI.',
      image: 'https://predicto.ai/og-cookies.jpg',
      url: 'https://predicto.ai/cookies'
    }
  }
};
