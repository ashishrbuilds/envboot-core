import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, any>;
}

const BASE_URL = 'https://ashishrbuilds.github.io/envboot';
const DEFAULT_IMAGE = `${BASE_URL}/envboot.png`;

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  keywords = [],
  canonicalPath,
  type = 'website',
  jsonLd,
}) => {
  const location = useLocation();
  const currentPath = canonicalPath || location.pathname;
  const canonicalUrl = `${BASE_URL}#${currentPath}`;
  const fullTitle = title.includes('EnvBoot') ? title : `${title} — EnvBoot`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMeta = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to set or create link tag
    const setLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Standard Meta Tags
    setMeta('name', 'description', description);
    if (keywords.length > 0) {
      setMeta('name', 'keywords', keywords.join(', '));
    }
    setMeta('name', 'robots', 'index, follow');
    setMeta('name', 'author', 'Ashish Ranjan & EnvBoot Contributors');

    // 3. Open Graph Tags
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', 'EnvBoot');
    setMeta('property', 'og:image', DEFAULT_IMAGE);

    // 4. Twitter Card Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', DEFAULT_IMAGE);
    setMeta('name', 'twitter:creator', '@ashishrbuilds');

    // 5. Canonical Link
    setLink('canonical', canonicalUrl);

    // 6. JSON-LD Structured Data
    const scriptId = 'envboot-jsonld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [fullTitle, description, keywords, canonicalUrl, type, jsonLd]);

  return null;
};
