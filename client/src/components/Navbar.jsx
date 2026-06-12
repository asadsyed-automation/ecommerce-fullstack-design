import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/navbar.css';

// Navbar now reads auth and cart from context — no props needed
function Navbar() {
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();

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

          <div className="top-bar__search" id="navbar-search-form">
            <input
              id="navbar-search-input"
              type="text"
              placeholder="Search products..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const q = e.target.value.trim();
                  if (q) window.location.href = `/products?search=${encodeURIComponent(q)}`;
                }
              }}
            />
            <select className="top-bar__search-category" id="navbar-search-category">
              <option value="">All category</option>
              <option value="Gadgets">Gadgets</option>
              <option value="Clothes">Clothes</option>
              <option value="Accessories">Accessories</option>
              <option value="Electronics">Electronics</option>
            </select>
            <button
              className="top-bar__search-btn"
              id="navbar-search-btn"
              onClick={() => {
                const input = document.getElementById('navbar-search-input');
                const cat = document.getElementById('navbar-search-category');
                const q = input?.value.trim();
                const c = cat?.value;
                let url = '/products';
                const params = new URLSearchParams();
                if (q) params.set('search', q);
                if (c) params.set('category', c);
                if (params.toString()) url += '?' + params.toString();
                window.location.href = url;
              }}
            >
              Search
            </button>
          </div>

          <div className="top-bar__actions">
            {/* Profile / User */}
            {isLoggedIn ? (
              <div className="top-bar__action-btn top-bar__user-menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <span>{user?.name?.split(' ')[0] || 'Account'}</span>
                <div className="top-bar__user-dropdown">
                  {isAdmin && (
                    <Link to="/admin" className="top-bar__dropdown-item">Admin Panel</Link>
                  )}
                  <button className="top-bar__dropdown-item top-bar__dropdown-item--btn" onClick={logout}>
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="top-bar__action-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <span>Sign In</span>
              </Link>
            )}

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
            <Link to="/products">Products</Link>
            <a href="#">Hot offers</a>
            <a href="#">Gift boxes</a>
            <a href="#">Projects</a>
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