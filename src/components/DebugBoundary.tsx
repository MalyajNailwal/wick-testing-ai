import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class DebugBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('DebugBoundary caught an error:', error, errorInfo);
    
    // Log to console for debugging
    console.group('🔍 Debug Information');
    console.log('Error:', error.message);
    console.log('Stack:', error.stack);
    console.log('Component Stack:', errorInfo.componentStack);
    console.log('URL:', window.location.href);
    console.log('User Agent:', navigator.userAgent);
    console.log('Timestamp:', new Date().toISOString());
    console.groupEnd();

    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '8px' }}>
          <h2 style={{ color: '#dc3545', marginBottom: '16px' }}>🐛 Debug Information</h2>
          <div style={{ marginBottom: '16px' }}>
            <strong>Error:</strong> {this.state.error?.message}
          </div>
          <div style={{ marginBottom: '16px' }}>
            <strong>URL:</strong> {window.location.href}
          </div>
          <details style={{ marginBottom: '16px' }}>
            <summary style={{ cursor: 'pointer', color: '#0d6efd' }}>Show Stack Trace</summary>
            <pre style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '12px', 
              borderRadius: '4px',
              fontSize: '12px',
              overflow: 'auto',
              maxHeight: '300px'
            }}>
              {this.state.error?.stack}
            </pre>
          </details>
          <details>
            <summary style={{ cursor: 'pointer', color: '#0d6efd' }}>Show Component Stack</summary>
            <pre style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '12px', 
              borderRadius: '4px',
              fontSize: '12px',
              overflow: 'auto',
              maxHeight: '300px'
            }}>
              {this.state.errorInfo?.componentStack}
            </pre>
          </details>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              marginTop: '16px', 
              padding: '8px 16px', 
              backgroundColor: '#0d6efd', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default DebugBoundary;
