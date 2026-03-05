import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-left">
          <span className="footer-brand">Yocto Learning</span>
          <span className="footer-sep">{'\u00B7'}</span>
          <span className="footer-note">
            An open-source educational project. Not affiliated with the Yocto
            Project or the Linux Foundation.
          </span>
        </div>
        <nav className="footer-links">
          <Link to="/about">License &amp; References</Link>
          <a
            href="https://docs.yoctoproject.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Official Yocto Docs
          </a>
        </nav>
      </div>
    </footer>
  );
}
