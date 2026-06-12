import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/navbar.css';

const CATEGORIES = ['All category', 'Gadgets', 'Clothes', 'Accessories', 'Electronics', 'Furniture'];

function MobileNavbar() {
  const { isLoggedIn, user, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const q = searchTerm.trim();
      if (q) {
        navigate(`/products?search=${encodeURIComponent(q)}`);
      } else {
        navigate('/products');
      }
    }
  };

  const handleCategoryClick = (cat) => {
    if (cat === 'All category') {
      navigate('/products');
    } else {
      navigate(`/products?category=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <>
      <header className="mobile-navbar">
        <div className="mobile-navbar__top">
          <Link to="/" className="mobile-navbar__logo">
            <div className="mobile-navbar__logo-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
              </svg>
            </div>
            Brand
          </Link>
          <div className="mobile-navbar__icons">
            <Link to="/cart" className="mobile-navbar__icon-btn" style={{ position: 'relative' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="top-bar__cart-badge" style={{ top: '-4px', right: '-4px' }}>
                  {cartCount}
                </span>
              )}
            </Link>
            {isLoggedIn ? (
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="mobile-navbar__icon-btn" 
                style={{ background: 'none', border: 'none', padding: 0 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </button>
            ) : (
              <Link to="/login" className="mobile-navbar__icon-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </Link>
            )}
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="mobile-navbar__icon-btn" 
              style={{ background: 'none', border: 'none', padding: 0 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="mobile-navbar__search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
        <div className="mobile-navbar__categories">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat} 
              className="mobile-navbar__cat-pill"
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setIsDrawerOpen(false)} />
      )}

      {/* Drawer Content */}
      <div className={`mobile-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="mobile-drawer__header">
          <div className="mobile-drawer__user-info">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            {isLoggedIn ? (
              <span className="mobile-drawer__welcome">Hi, {user?.name?.split(' ')[0] || 'User'}</span>
            ) : (
              <span className="mobile-drawer__welcome">Welcome Guest</span>
            )}
          </div>
          <button className="mobile-drawer__close" onClick={() => setIsDrawerOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <nav className="mobile-drawer__nav">
          <Link to="/" className="mobile-drawer__link" onClick={() => setIsDrawerOpen(false)}>Home</Link>
          <Link to="/products" className="mobile-drawer__link" onClick={() => setIsDrawerOpen(false)}>Products</Link>
          <Link to="/cart" className="mobile-drawer__link" onClick={() => setIsDrawerOpen(false)}>
            Cart ({cartCount})
          </Link>
          {isLoggedIn && isAdmin && (
            <Link to="/admin" className="mobile-drawer__link" onClick={() => setIsDrawerOpen(false)}>
              Admin Panel
            </Link>
          )}
          
          <div className="mobile-drawer__divider" />
          
          {isLoggedIn ? (
            <button className="mobile-drawer__link mobile-drawer__link--logout" onClick={() => {
              logout();
              setIsDrawerOpen(false);
            }}>
              Sign Out
            </button>
          ) : (
            <Link to="/login" className="mobile-drawer__link" onClick={() => setIsDrawerOpen(false)}>
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}

export default MobileNavbar;