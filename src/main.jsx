import { StrictMode, Component } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import './index.css';
import App from './App.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'monospace', color: 'red' }}>
          <h1>Something went wrong</h1>
          <pre>{this.state.error.message}</pre>
          <pre>{this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

try {
  const root = document.getElementById('root');
  root.innerHTML = '<p style="padding:2rem;font-size:1.5rem;">Loading app...</p>';
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <HashRouter>
          <ProgressProvider>
            <App />
          </ProgressProvider>
        </HashRouter>
      </ErrorBoundary>
    </StrictMode>
  );
} catch (e) {
  document.getElementById('root').innerHTML =
    '<pre style="padding:2rem;color:red;">' + e.message + '\n' + e.stack + '</pre>';
}
