// Debug utilities for production troubleshooting
export const debug = {
  log: (...args: any[]) => {
    if (import.meta.env.DEV || window.location.search.includes('debug=true')) {
      console.log('[DEBUG]', ...args);
    }
  },
  
  error: (...args: any[]) => {
    console.error('[ERROR]', ...args);
  },
  
  warn: (...args: any[]) => {
    console.warn('[WARN]', ...args);
  },
  
  info: (...args: any[]) => {
    console.info('[INFO]', ...args);
  },
  
  // Environment info
  getEnvironment: () => ({
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
    isProduction: import.meta.env.PROD,
    isDevelopment: import.meta.env.DEV,
    baseUrl: import.meta.env.BASE_URL,
  }),
  
  // Network diagnostics
  checkNetwork: async () => {
    const results = {
      online: navigator.onLine,
      connection: (navigator as any).connection?.effectiveType || 'unknown',
      timestamp: new Date().toISOString(),
    };
    
    debug.log('Network status:', results);
    return results;
  },
  
  // Asset loading check
  checkAssets: () => {
    const images = Array.from(document.images);
    const scripts = Array.from(document.scripts);
    const stylesheets = Array.from(document.styleSheets);
    
    const failedAssets = {
      images: images.filter(img => !img.complete || img.naturalWidth === 0),
      scripts: scripts.filter(script => script.src && !script.src.includes('data:')),
      stylesheets: Array.from(stylesheets).filter(sheet => {
        try {
          return !sheet.cssRules;
        } catch {
          return true;
        }
      }),
    };
    
    debug.log('Asset loading check:', failedAssets);
    return failedAssets;
  },
};

// Global debug access
(window as any).debug = debug;

// Auto-log environment on load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    debug.log('Application loaded');
    debug.log('Environment:', debug.getEnvironment());
    debug.checkAssets();
  });
  
  // Log React errors
  window.addEventListener('error', (event) => {
    debug.error('Global error:', event.error);
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    debug.error('Unhandled promise rejection:', event.reason);
  });
}
