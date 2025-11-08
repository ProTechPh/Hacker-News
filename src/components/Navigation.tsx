import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="nav-logo-text">HN</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            Top
          </Link>
          <Link to="/new" className={isActive('/new') ? 'active' : ''}>
            New
          </Link>
          <Link to="/best" className={isActive('/best') ? 'active' : ''}>
            Best
          </Link>
          <Link to="/ask" className={isActive('/ask') ? 'active' : ''}>
            Ask
          </Link>
          <Link to="/show" className={isActive('/show') ? 'active' : ''}>
            Show
          </Link>
          <Link to="/jobs" className={isActive('/jobs') ? 'active' : ''}>
            Jobs
          </Link>
        </div>
      </div>
    </nav>
  );
}

