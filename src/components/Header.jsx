import { Link, useLocation } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import modules from '../data/modules';

export default function Header() {
  const location = useLocation();
  const { getOverallProgress } = useProgress();
  const overall = getOverallProgress(modules);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-brand">
          <span className="header-logo">Y</span>
          <span className="header-title">Yocto Learning</span>
        </Link>
        <nav className="header-nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/modules"
            className={`nav-link ${location.pathname.startsWith('/modules') || location.pathname.startsWith('/lesson') ? 'active' : ''}`}
          >
            Modules
          </Link>
        </nav>
        <div className="header-progress">
          <div className="progress-ring">
            <svg viewBox="0 0 36 36" className="progress-ring-svg">
              <path
                className="progress-ring-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="progress-ring-fill"
                strokeDasharray={`${overall.percentage}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="progress-ring-text">{overall.percentage}%</span>
          </div>
        </div>
      </div>
    </header>
  );
}
