import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToAnchor watches for location hash changes in HashRouter
 * and smoothly scrolls the target element into view with appropriate offset.
 */
export const ScrollToAnchor: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Decode and strip leading #
      const id = decodeURIComponent(location.hash.replace(/^#/, ''));
      
      const attemptScroll = (retries = 3) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (retries > 0) {
          // If the element hasn't mounted yet, retry briefly
          setTimeout(() => attemptScroll(retries - 1), 80);
        }
      };

      attemptScroll();
    } else {
      // If navigating to a route without hash, reset to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  return null;
};
