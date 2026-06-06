import { Link } from 'react-router-dom';
import '../styles/navbar.css';

// Future: accept { cartCount, user } props from auth/cart context
function Navbar({ cartCount = 0, user = null }) {
  return (
    <>
      {/* Desktop Top Bar */}
      <header className="top-bar">
        <div className="top-bar__inner">
          <Link to="/" className="top-bar__logo">
            <div className="top-bar__logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            Brand
          </Link>

          <div className="top-bar__search">
            <input type="text" placeholder="Search" />
            <select className="top-bar__search-category">
              <option>All category</option>
              <option>Gadgets</option>
              <option>Clothes</option>
              <option>Accessories</option>
            </select>
            <button className="top-bar__search-btn">Search</button>
          </div>

          <div className="top-bar__actions">
            <Link to="/login" className="top-bar__action-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <span>Profile</span>
            </Link>
            <Link to="#" className="top-bar__action-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
              <span>Message</span>
            </Link>
            <Link to="#" className="top-bar__action-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
              <span>Orders</span>
            </Link>
            <Link to="/cart" className="top-bar__action-btn">
              <div style={{ position: 'relative' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                {cartCount > 0 && <span className="top-bar__cart-badge">{cartCount}</span>}
              </div>
              <span>My cart</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Desktop Bottom Nav */}
      <nav className="bottom-bar">
        <div className="bottom-bar__inner">
          <div className="bottom-bar__all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            All category
          </div>
          <div className="bottom-bar__links">
            <a href="#">Hot offers</a>
            <a href="#">Gift boxes</a>
            <a href="#">Projects</a>
            <a href="#">Menu item</a>
            <a href="#">Help ▾</a>
          </div>
          <div className="bottom-bar__right">
            <span>English, USD</span>
            <span>🇩🇪 Ship to</span>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;