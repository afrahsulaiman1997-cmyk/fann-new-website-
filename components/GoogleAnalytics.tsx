
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Extend the window interface for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: any
    ) => void;
  }
}

const GA_MEASUREMENT_ID = 'G-3K3B116237'; // Using the ID already present in your index.html

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
      console.debug(`[GA4] Page view tracked: ${location.pathname}`);
    }
  }, [location]);

  return null;
};

export default GoogleAnalytics;
