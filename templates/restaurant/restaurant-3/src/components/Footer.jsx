import React from 'react';

export default function Footer({ onOpenLegal }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>LUMIÈRE</h2>
          <p>COASTAL CUISINE · MODERN TABLE</p>
        </div>

        <div className="footer-col">
          <h5>NAVIGATION</h5>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#story">Restaurant</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#journal">Journal</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>SOCIAL</h5>
          <ul>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://spotify.com" target="_blank" rel="noopener noreferrer">Spotify Playlist</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>LEGAL</h5>
          <ul>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenLegal('privacy');
                }}
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenLegal('terms');
                }}
              >
                Terms of Dining
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenLegal('press');
                }}
              >
                Press Kit
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-giant-text">LUMIÈRE</div>

      <div className="footer-bottom">
        <p>© 2026 Lumière Coastal Cuisine. All Rights Reserved.</p>
        <p>Designed with Intent & Light</p>
      </div>
    </footer>
  );
}
