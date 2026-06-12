import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MobileNavbar from '../components/MobileNavbar';
import Breadcrumb from '../components/Breadcrumb';
import StarRating from '../components/StarRating';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Footer from '../components/Footer';
import { getProduct, getProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import '../styles/productdetails.css';
import '../styles/navbar.css';
import '../styles/footer.css';



const BREADCRUMB = [
  { label: 'Home', path: '/' },
  { label: 'Clothings', path: '/products' },
  { label: "Men's wear", path: '/products' },
  { label: 'Summer clothing', path: '/products' },
];

const TABS = ['Description', 'Reviews', 'Shipping', 'About seller'];

const MAY_LIKE = [
  { id: 'm1', name: 'Men Blazers Sets Elegant Formal', price: '$7.00 - $99.50', image: null },
  { id: 'm2', name: 'Men Shirt Sleeve Polo Contrast', price: '$7.00 - $99.50', image: null },
  { id: 'm3', name: 'Apple Watch Series Space Gray', price: '$7.00 - $99.50', image: null },
  { id: 'm4', name: 'Basketball Crew Socks Long Stuff', price: '$7.00 - $99.50', image: null },
  { id: 'm5', name: "New Summer Men's castrol T-Shirts", price: '$7.00 - $99.50', image: null },
];

// Shared spinner style
const spinnerStyle = {
  width: '40px', height: '40px',
  border: '3px solid var(--border)',
  borderTop: '3px solid var(--primary)',
  borderRadius: '50%',
  animation: 'spin 0.8s linear infinite',
};

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct]   = useState(null);
  const [related, setRelated]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [activeTab, setActiveTab]     = useState('Description');
  const [activeThumb, setActiveThumb] = useState(0);
  const [qty, setQty]                 = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the single product by MongoDB _id
        const [productRes, allRes] = await Promise.all([
          getProduct(id),
          getProducts(),
        ]);

        setProduct(productRes.data);
        // Related = same category, exclude current product
        const all = allRes.data;
        const sameCategory = all
          .filter(p => p._id !== id && p.category === productRes.data.category)
          .slice(0, 6);
        // If not enough same-category, fill from others
        if (sameCategory.length < 6) {
          const others = all
            .filter(p => p._id !== id && p.category !== productRes.data.category)
            .slice(0, 6 - sameCategory.length);
          setRelated([...sameCategory, ...others]);
        } else {
          setRelated(sameCategory);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load product.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]); // Re-fetch when route id changes

  // ── Loading state ──
  if (loading) {
    return (
      <div className="detail-page">
        <Navbar />
        <MobileNavbar />
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          minHeight: '60vh', gap: '16px',
        }}>
          <div style={spinnerStyle} />
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Loading product...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Error state ──
  if (error || !product) {
    return (
      <div className="detail-page">
        <Navbar />
        <MobileNavbar />
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          minHeight: '60vh', gap: '16px',
          padding: '20px', textAlign: 'center',
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
            stroke="var(--accent-red)" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
            {error || 'Product not found'}
          </p>
          <Link to="/products" style={{
            padding: '10px 24px', background: 'var(--primary)', color: 'white',
            border: 'none', borderRadius: '6px', fontSize: '14px',
            fontWeight: '600', textDecoration: 'none',
          }}>
            Back to products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Main render ──
  return (
    <div className="detail-page">
      <Navbar />
      <MobileNavbar />

      <div className="detail-page__inner">
        <Breadcrumb items={BREADCRUMB} />

        {/* ── TOP: Gallery + Info + Supplier ── */}
        <div className="detail-top">

          {/* LEFT: Gallery */}
          <div className="detail-gallery">
            <div className="detail-gallery__main">
              <ImagePlaceholder
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="detail-gallery__thumbs">
              {[0, 1, 2, 3, 4, 5].map(i => (
                <div key={i}
                  className={`detail-gallery__thumb${activeThumb === i ? ' active' : ''}`}
                  onClick={() => setActiveThumb(i)}>
                  <ImagePlaceholder src={i === 0 ? product.image : null} alt={`thumb-${i}`} />
                </div>
              ))}
            </div>
          </div>

          {/* CENTER: Info */}
          <div className="detail-info">
            <div className="detail-info__stock">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {product.stock > 0 ? 'In stock' : 'Out of stock'}
            </div>

            <h1 className="detail-info__name">{product.name}</h1>

            <div className="detail-info__meta">
              <StarRating rating={product.rating || 7.5} />
              <span className="detail-info__meta-sep">|</span>
              <span className="detail-info__reviews">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
                32 reviews
              </span>
              <span className="detail-info__meta-sep">|</span>
              <span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.8"
                  style={{ verticalAlign: 'middle', marginRight: '4px' }}>
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                  <path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
                {product.stock} in stock
              </span>
            </div>

            {/* Price tiers — use actual price from API */}
            <div className="detail-price-tiers">
              <div className="detail-price-tier highlight">
                <span className="detail-price-tier__price">
                  ${product.price?.toFixed(2)}
                </span>
                <span className="detail-price-tier__range">50-100 pcs</span>
              </div>
              <div className="detail-price-tier">
                <span className="detail-price-tier__price">
                  ${(product.price * 0.92)?.toFixed(2)}
                </span>
                <span className="detail-price-tier__range">100-700 pcs</span>
              </div>
              <div className="detail-price-tier">
                <span className="detail-price-tier__price">
                  ${(product.price * 0.80)?.toFixed(2)}
                </span>
                <span className="detail-price-tier__range">700+ pcs</span>
              </div>
            </div>

            {/* Specs — from API data */}
            <table className="detail-specs">
              <tbody>
                <tr><td>Price:</td><td>${product.price?.toFixed(2)}</td></tr>
                <tr><td>Category:</td><td>{product.category}</td></tr>
                <tr><td>Stock:</td><td>{product.stock} units</td></tr>
                {product.description && (
                  <tr><td>Description:</td><td>{product.description}</td></tr>
                )}
                <tr><td>Protection:</td><td>Refund Policy</td></tr>
                <tr><td>Warranty:</td><td>2 years full warranty</td></tr>
              </tbody>
            </table>
          </div>

          {/* RIGHT: Supplier */}
          <div className="detail-supplier">
            <div className="detail-supplier__header">
              <div className="detail-supplier__avatar">
                {product.name?.[0]?.toUpperCase() || 'S'}
              </div>
              <div>
                <span className="detail-supplier__name">Supplier</span>
                <span className="detail-supplier__company">
                  {product.seller || 'Verified Seller'}
                </span>
              </div>
            </div>
            <div className="detail-supplier__tags">
              <div className="detail-supplier__tag">
                <img src="https://flagcdn.com/w20/de.png" alt="Germany" />
                {product.sellerLocation || 'Germany, Berlin'}
              </div>
              <div className="detail-supplier__tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Verified Seller
              </div>
              <div className="detail-supplier__tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                </svg>
                Worldwide shipping
              </div>
            </div>
            <button className="detail-supplier__inquiry"
              onClick={() => {
                addToCart(product, qty);
                setAddedToCart(true);
                setTimeout(() => setAddedToCart(false), 2000);
              }}
              disabled={product.stock <= 0}
              style={{
                background: addedToCart ? 'var(--accent-green)' : undefined,
                transition: 'background 0.3s'
              }}
            >
              {addedToCart ? '✓ Added to cart' : 'Add to cart'}
            </button>
            {/* Qty selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Qty:</span>
              <select
                value={qty}
                onChange={e => setQty(Number(e.target.value))}
                style={{
                  padding: '4px 8px', borderRadius: '6px',
                  border: '1px solid var(--border)', fontSize: '14px',
                  background: 'var(--bg-white)', color: 'var(--text-primary)'
                }}
              >
                {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="detail-supplier__save">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
              Send inquiry
            </div>
          </div>
        </div>

        {/* ── BOTTOM: Tabs + You may like ── */}
        <div className="detail-bottom">
          <div>
            <div className="detail-tabs__nav">
              {TABS.map(tab => (
                <button key={tab}
                  className={`detail-tabs__tab${activeTab === tab ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab)}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="detail-tabs__content">
              {activeTab === 'Description' && (
                <div className="detail-tabs__desc">
                  <p>{product.description || 'No description available.'}</p>

                  {/* Specs table from API */}
                  <table className="detail-tabs__spec-table">
                    <tbody>
                      <tr><td>Name</td><td>{product.name}</td></tr>
                      <tr><td>Category</td><td>{product.category}</td></tr>
                      <tr><td>Price</td><td>${product.price?.toFixed(2)}</td></tr>
                      <tr><td>Stock</td><td>{product.stock} units</td></tr>
                    </tbody>
                  </table>

                  <div className="detail-tabs__features">
                    {[
                      'Quality guaranteed product',
                      'Fast and reliable shipping worldwide',
                      'Secure payment and buyer protection',
                      '2-year warranty included',
                    ].map((f, i) => (
                      <div key={i} className="detail-tabs__feature">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'Reviews' && (
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  Reviews will be loaded from API in a future phase.
                </p>
              )}
              {activeTab === 'Shipping' && (
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  Shipping information will be loaded from API in a future phase.
                </p>
              )}
              {activeTab === 'About seller' && (
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  Seller information will be loaded from API in a future phase.
                </p>
              )}
            </div>
          </div>

          {/* You may like sidebar */}
          <div className="detail-may-like">
            <div className="detail-may-like__title">You may like</div>
            <div className="detail-may-like__list">
              {MAY_LIKE.map(item => (
                <Link key={item.id} to={`/product/${item.id}`}
                  className="detail-may-like__item">
                  <div className="detail-may-like__img">
                    <ImagePlaceholder src={item.image} alt={item.name} />
                  </div>
                  <div>
                    <div className="detail-may-like__name">{item.name}</div>
                    <div className="detail-may-like__price">{item.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Related products — from API */}
        {related.length > 0 && (
          <div className="detail-related">
            <div className="detail-related__title">Related products</div>
            <div className="detail-related__grid">
              {related.map(p => (
                <Link key={p._id} to={`/product/${p._id}`}
                  className="detail-related__card" style={{ textDecoration: 'none' }}>
                  <div className="detail-related__img">
                    <ImagePlaceholder src={p.image} alt={p.name} />
                  </div>
                  <div className="detail-related__body">
                    <div className="detail-related__name">{p.name}</div>
                    <div className="detail-related__price">
                      ${p.price?.toFixed(2)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Promo banner */}
        <div className="detail-promo-banner">
          <div className="detail-promo-banner__text">
            <h3>Super discount on more than 100 USD</h3>
            <p>Have you ever finally just write dummy info</p>
          </div>
          <button className="detail-promo-banner__btn">Shop now</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetails;