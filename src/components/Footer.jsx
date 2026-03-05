import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-left">
          <span className="footer-brand">Yocto Learning</span>
          <span className="footer-sep">{'\u00B7'}</span>
          <span className="footer-note">
            Content based on{' '}
            <a
              href="https://bootlin.com/training/yocto/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bootlin training materials
            </a>{' '}
            (CC BY-SA 3.0)
          </span>
        </div>
        <nav className="footer-links">
          <Link to="/about">License &amp; References</Link>
          <a
            href="https://bootlin.com/training/yocto/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bootlin Training
          </a>
          <a
            href="https://docs.yoctoproject.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yocto Docs
          </a>
        </nav>
      </div>
    </footer>
  );
}
