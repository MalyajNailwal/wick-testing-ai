import React, { useEffect, useState } from 'react';
import { debug } from '@/utils/debug';

const DebugPage: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState({
    environment: debug.getEnvironment(),
    network: null as any,
    assets: null as any,
  });

  useEffect(() => {
    const loadDebugInfo = async () => {
      const network = await debug.checkNetwork();
      const assets = debug.checkAssets();
      setDebugInfo({
        environment: debug.getEnvironment(),
        network,
        assets,
      });
    };

    loadDebugInfo();
  }, []);

  const reloadApp = () => {
    window.location.reload();
  };

  const clearCache = () => {
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
    window.location.reload();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#dc3545', marginBottom: '20px' }}>🐛 Debug Dashboard</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={reloadApp}
          style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#0d6efd', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Reload App
        </button>
        <button 
          onClick={clearCache}
          style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Clear Cache & Reload
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Environment Info</h2>
        <pre style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '4px', fontSize: '12px', overflow: 'auto' }}>
          {JSON.stringify(debugInfo.environment, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Network Status</h2>
        <pre style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '4px', fontSize: '12px', overflow: 'auto' }}>
          {JSON.stringify(debugInfo.network, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Asset Loading</h2>
        <pre style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '4px', fontSize: '12px', overflow: 'auto' }}>
          {JSON.stringify(debugInfo.assets, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Console Commands</h2>
        <p>Open browser console and run these commands:</p>
        <ul>
          <li><code>debug.getEnvironment()</code> - Get environment info</li>
          <li><code>debug.checkNetwork()</code> - Check network status</li>
          <li><code>debug.checkAssets()</code> - Check asset loading</li>
        </ul>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Local Storage</h2>
        <pre style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '4px', fontSize: '12px', overflow: 'auto' }}>
          {JSON.stringify(Object.keys(localStorage), null, 2)}
        </pre>
      </div>

      <div>
        <h2>Session Storage</h2>
        <pre style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '4px', fontSize: '12px', overflow: 'auto' }}>
          {JSON.stringify(Object.keys(sessionStorage), null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default DebugPage;
