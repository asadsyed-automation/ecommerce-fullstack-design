import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const CATEGORIES = ['All category', 'Gadgets', 'Clothes', 'Accessories', 'Electronics', 'Furniture'];

// Future: accept { cartCount } from cart context
function MobileNavbar({ cartCount = 0 }) {
  return (
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
              <span style={{
                position:'absolute', top:'-4px', right:'-4px', background:'#EF3535',
                color:'white', fontSize:'10px', fontWeight:'700', width:'16px', height:'16px',
                borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center'
              }}>{cartCount}</span>
            )}
          </Link>
          <Link to="/login" className="mobile-navbar__icon-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </Link>
          <div className="mobile-navbar__icon-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="mobile-navbar__search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" placeholder="Search" />
      </div>
      <div className="mobile-navbar__categories">
        {CATEGORIES.map((cat, i) => (
          <button key={cat} className={`mobile-navbar__cat-pill${i === 0 ? ' active' : ''}`}>
            {cat}
          </button>
        ))}
      </div>
    </header>
  );
}

export default MobileNavbar;