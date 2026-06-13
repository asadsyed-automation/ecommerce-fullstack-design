import { Link } from 'react-router-dom';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main">

        {/* Column 1: Brand */}
        <div className="footer__brand">
          <div className="footer__logo">
            <div className="footer__logo-icon">B</div>
            <span>Brand</span>
          </div>
          <p>Best information about the company goes here but now lorem ipsum is</p>
          <div className="footer__social">
            <a href="#" className="footer__social-link" aria-label="Facebook">
              <img src="https://cdn.simpleicons.org/facebook/555" alt="Facebook" width="14" height="14" />
            </a>
            <a href="#" className="footer__social-link" aria-label="Twitter">
              <img src="https://cdn.simpleicons.org/whatsapp/555" alt="Twitter" width="14" height="14" />
            </a>
            <a href="#" className="footer__social-link" aria-label="LinkedIn">
              <img src="https://cdn.simpleicons.org/linkedin/555" alt="LinkedIn" width="14" height="14" />
            </a>
            <a href="#" className="footer__social-link" aria-label="YouTube">
              <img src="https://cdn.simpleicons.org/youtube/555" alt="YouTube" width="14" height="14" />
            </a>
            <a href="#" className="footer__social-link" aria-label="Instagram">
              <img src="https://cdn.simpleicons.org/instagram/555" alt="Instagram" width="14" height="14" />
            </a>
          </div>
        </div>

        {/* Column 2: About */}
        <div className="footer__col">
          <div className="footer__col-title">About</div>
          <ul className="footer__col-list">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Find store</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">Blogs</a></li>
          </ul>
        </div>

        {/* Column 3: Partnership */}
        <div className="footer__col">
          <div className="footer__col-title">Partnership</div>
          <ul className="footer__col-list">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Find store</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">Blogs</a></li>
          </ul>
        </div>

        {/* Column 4: Information */}
        <div className="footer__col">
          <div className="footer__col-title">Information</div>
          <ul className="footer__col-list">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Money Refund</a></li>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Contact us</a></li>
          </ul>
        </div>

        {/* Column 5: For users */}
        <div className="footer__col">
          <div className="footer__col-title">For users</div>
          <ul className="footer__col-list">
            <li><Link to="/login">Login</Link></li>
            <li><a href="#">Register</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">My Orders</a></li>
          </ul>
        </div>

        {/* Column 6: Get app */}
        <div className="footer__col">
          <div className="footer__col-title">Get app</div>
          <div className="footer__app">
            <a href="#" className="footer__app-badge">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
                alt="App Store"
                className="footer__app-store-icon"
              />
              <div className="footer__app-badge-text">
                <small>Download on the</small>
                <strong>App Store</strong>
              </div>
            </a>
            <a href="#" className="footer__app-badge">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg"
                alt="Google Play"
                className="footer__app-store-icon"
              />
              <div className="footer__app-badge-text">
                <small>Get it on</small>
                <strong>Google Play</strong>
              </div>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <span className="footer__bottom-copy">© 2023 Ecommerce.</span>
        <div className="footer__bottom-lang">
          <img
            src="https://flagcdn.com/w20/us.png"
            alt="US flag"
            width="20"
            height="14"
            style={{ borderRadius: '2px' }}
          />
          <span>English</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
    </footer>
  );
}

export default Footer;