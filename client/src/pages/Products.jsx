import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api';
import Navbar from '../components/Navbar';
import MobileNavbar from '../components/MobileNavbar';
import Breadcrumb from '../components/Breadcrumb';
import StarRating from '../components/StarRating';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { CATEGORIES, BRANDS, FEATURES, CONDITIONS, RATINGS } from '../data/products';
import '../styles/products.css';
import '../styles/navbar.css';
import '../styles/footer.css';
import '../styles/sections.css';

const BREADCRUMB = [
  { label: 'Home', path: '/' },
  { label: 'Clothings', path: '/products' },
  { label: "Men's wear", path: '/products' },
  { label: 'Summer clothing', path: '/products' },
];

const MOBILE_CATS = ['All category', ...CATEGORIES];

// ── Grid Card ──
function GridCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="pgrid-card" style={{ textDecoration: 'none' }}>
      <div className="pgrid-card__img">
        <ImagePlaceholder src={product.image} alt={product.name} />
        <button className="pgrid-card__wish" onClick={e => e.preventDefault()}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
      </div>
      <div className="pgrid-card__body">
        <div className="pgrid-card__price">
          <span className="pgrid-card__price-now">${product.price?.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="pgrid-card__price-old">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <div className="pgrid-card__stars">
          <StarRating rating={product.rating || 7.5} />
        </div>
        <div className="pgrid-card__name">{product.name}</div>
      </div>
    </Link>
  );
}

// ── List Card ──
function ListCard({ product }) {
  return (
    <div className="plist-card">
      <div className="plist-card__img">
        <ImagePlaceholder src={product.image} alt={product.name} />
      </div>
      <div className="plist-card__info">
        <div className="plist-card__name">{product.name}</div>
        <div className="plist-card__price">
          <span className="plist-card__price-now">${product.price?.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="plist-card__price-old">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <div className="plist-card__meta">
          <StarRating rating={product.rating || 7.5} />
          <span className="plist-card__orders">• {product.orders || 0} orders</span>
          <span className="plist-card__shipping">• Free Shipping</span>
        </div>
        <div className="plist-card__desc">{product.description}</div>
        <Link to={`/product/${product._id}`} className="plist-card__detail-link">View details</Link>
      </div>
      <button className="plist-card__wish" onClick={e => e.preventDefault()}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      </button>
    </div>
  );
}

// ── Sidebar Section ──
function SidebarSection({ title, open, onToggle, children }) {
  return (
    <div className="products-sidebar__section">
      <div className="products-sidebar__header" onClick={onToggle}>
        <span className="products-sidebar__title">{title}</span>
        <svg className={`products-sidebar__chevron ${open ? 'open' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {open && children}
    </div>
  );
}

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchVal = searchParams.get('search') || '';
  const categoryVal = searchParams.get('category') || '';

  const activeCat = categoryVal;
  const activeMobileCat = categoryVal || 'All category';

  // ── API State ──
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── UI State (unchanged) ──
  const [view, setView] = useState('grid');
  const [selectedBrands, setSelectedBrands] = useState(['Samsung', 'Apple', 'Pocco']);
  const [selectedFeatures, setSelectedFeatures] = useState(['Metallic']);
  const [selectedCondition, setSelectedCondition] = useState('Any');
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('Featured');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(999999);
  const [openSections, setOpenSections] = useState({
    category: true, brands: true, features: true,
    price: false, condition: false, ratings: false, manufacturer: false,
  });
  const [activeFilters, setActiveFilters] = useState(['Samsung', 'Apple', 'Pocco', 'Metallic', '4 star', '3 star']);
  const [page, setPage] = useState(1);

  // ── Fetch from backend ──
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getProducts({
          search: searchVal,
          category: categoryVal
        });
        setProducts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchVal, categoryVal]);

  const toggleSection = key => setOpenSections(s => ({ ...s, [key]: !s[key] }));
  const toggleBrand = b => setSelectedBrands(s => s.includes(b) ? s.filter(x => x !== b) : [...s, b]);
  const toggleFeature = f => setSelectedFeatures(s => s.includes(f) ? s.filter(x => x !== f) : [...s, f]);
  const removeFilter = tag => setActiveFilters(s => s.filter(x => x !== tag));

  // Category navigation via URL Search Params
  const toggleCategory = (c) => {
    const nextParams = new URLSearchParams(searchParams);
    if (activeCat === c || !c) {
      nextParams.delete('category');
    } else {
      nextParams.set('category', c);
    }
    setSearchParams(nextParams);
  };

  const handleMobileCatClick = (c) => {
    const nextParams = new URLSearchParams(searchParams);
    if (c === 'All category') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', c);
    }
    setSearchParams(nextParams);
  };

  // ── Filter logic — uses fetched products ──
  const filtered = useMemo(() => {
    let result = [...products];

    // Filter by price range
    if (priceMin > 0) {
      result = result.filter(p => p.price >= priceMin);
    }
    if (priceMax < 999999) {
      result = result.filter(p => p.price <= priceMax);
    }

    // Sort
    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [products, priceMin, priceMax, sortBy]);

  // ── Loading state ──
  if (loading) {
    return (
      <div className="products-page">
        <Navbar />
        <MobileNavbar />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: '16px',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--border)',
            borderTop: '3px solid var(--primary)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Loading products...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Error state ──
  if (error) {
    return (
      <div className="products-page">
        <Navbar />
        <MobileNavbar />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: '16px',
          padding: '20px',
          textAlign: 'center',
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
            stroke="var(--accent-red)" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Something went wrong
          </p>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '320px' }}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 24px',
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}>
            Try again
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Main render (UI unchanged) ──
  return (
    <div className="products-page">
      <Navbar />
      <MobileNavbar />

      {/* Mobile category pills */}
      <div className="products-mobile-cats">
        {MOBILE_CATS.map(c => (
          <button key={c}
            className={`products-mobile-cat-pill${activeMobileCat === c ? ' active' : ''}`}
            onClick={() => handleMobileCatClick(c)}>
            {c}
          </button>
        ))}
      </div>

      {/* Mobile sort/filter bar */}
      <div className="products-mobile-bar">
        <button className="products-mobile-bar__btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
            <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
          Sort: Newest
        </button>
        <button className="products-mobile-bar__btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
          Filter (3)
        </button>
        <div className="products-mobile-bar__views">
          <button className={`products-topbar__view-btn${view === 'grid' ? ' active' : ''}`}
            onClick={() => setView('grid')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
            </svg>
          </button>
          <button className={`products-topbar__view-btn${view === 'list' ? ' active' : ''}`}
            onClick={() => setView('list')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
              <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="products-page__inner">
        {/* Breadcrumb */}
        <div style={{ gridColumn: '1 / -1' }}>
          <Breadcrumb items={BREADCRUMB} />
        </div>

        {/* ── LEFT SIDEBAR ── */}
        <aside className="products-sidebar">
          <SidebarSection title="Category" open={openSections.category} onToggle={() => toggleSection('category')}>
            <div className="sidebar-category-list">
              {/* Dynamic categories from fetched products */}
              {[...new Set(products.map(p => p.category).filter(Boolean))].map(c => (
                <span key={c}
                  className={`sidebar-category-item${activeCat === c ? ' active' : ''}`}
                  onClick={() => toggleCategory(c)}>{c}</span>
              ))}
              <span className="sidebar-see-all" onClick={() => toggleCategory('')}>See all</span>
            </div>
          </SidebarSection>

          <SidebarSection title="Brands" open={openSections.brands} onToggle={() => toggleSection('brands')}>
            <div className="sidebar-check-list">
              {BRANDS.map(b => (
                <label key={b} className="sidebar-check-item">
                  <input type="checkbox" checked={selectedBrands.includes(b)}
                    onChange={() => toggleBrand(b)} />
                  {b}
                </label>
              ))}
              <span className="sidebar-see-all">See all</span>
            </div>
          </SidebarSection>

          <SidebarSection title="Features" open={openSections.features} onToggle={() => toggleSection('features')}>
            <div className="sidebar-check-list">
              {FEATURES.map(f => (
                <label key={f} className="sidebar-check-item">
                  <input type="checkbox" checked={selectedFeatures.includes(f)}
                    onChange={() => toggleFeature(f)} />
                  {f}
                </label>
              ))}
              <span className="sidebar-see-all">See all</span>
            </div>
          </SidebarSection>

          <SidebarSection title="Price range" open={openSections.price} onToggle={() => toggleSection('price')}>
            <div className="sidebar-price">
              <input type="range" className="sidebar-price__slider" min={0} max={2000}
                value={priceMax === 999999 ? 2000 : priceMax}
                onChange={e => setPriceMax(Number(e.target.value))} />
              <div className="sidebar-price__inputs">
                <input className="sidebar-price__input" type="number" placeholder="Min"
                  value={priceMin || ''} onChange={e => setPriceMin(Number(e.target.value))} />
                <input className="sidebar-price__input" type="number" placeholder="Max"
                  value={priceMax === 999999 ? '' : priceMax}
                  onChange={e => setPriceMax(Number(e.target.value) || 999999)} />
              </div>
              <button className="sidebar-price__apply">Apply</button>
            </div>
          </SidebarSection>

          <SidebarSection title="Condition" open={openSections.condition} onToggle={() => toggleSection('condition')}>
            <div className="sidebar-radio-list">
              {CONDITIONS.map(c => (
                <label key={c} className="sidebar-radio-item">
                  <input type="radio" name="condition" checked={selectedCondition === c}
                    onChange={() => setSelectedCondition(c)} />
                  {c}
                </label>
              ))}
            </div>
          </SidebarSection>

          <SidebarSection title="Ratings" open={openSections.ratings} onToggle={() => toggleSection('ratings')}>
            <div className="sidebar-rating-list">
              {RATINGS.map(r => (
                <label key={r} className="sidebar-rating-item">
                  <input type="checkbox"
                    checked={selectedRatings.includes(r)}
                    onChange={() => setSelectedRatings(s =>
                      s.includes(r) ? s.filter(x => x !== r) : [...s, r])} />
                  <StarRating rating={r * 2} showNumber={false} />
                </label>
              ))}
            </div>
          </SidebarSection>

          <SidebarSection title="Manufacturer" open={openSections.manufacturer}
            onToggle={() => toggleSection('manufacturer')}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>All manufacturers</div>
          </SidebarSection>
        </aside>

        {/* ── RIGHT CONTENT ── */}
        <div className="products-content">
          {/* Top bar */}
          <div className="products-topbar">
            <span className="products-topbar__count">
              <strong>{filtered.length}</strong> items in{' '}
              <strong>{activeCat || 'All categories'}</strong>
            </span>
            <label className="products-topbar__verified">
              <input type="checkbox" checked={verifiedOnly}
                onChange={e => setVerifiedOnly(e.target.checked)} />
              Verified only
            </label>
            <div className="products-topbar__sort">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option>Featured</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
            <div className="products-topbar__views">
              <button className={`products-topbar__view-btn${view === 'grid' ? ' active' : ''}`}
                onClick={() => setView('grid')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                </svg>
              </button>
              <button className={`products-topbar__view-btn${view === 'list' ? ' active' : ''}`}
                onClick={() => setView('list')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                  <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
                  <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div className="products-filters">
              {activeFilters.map(tag => (
                <div key={tag} className="filter-tag">
                  {tag}
                  <span className="filter-tag__remove" onClick={() => removeFilter(tag)}>×</span>
                </div>
              ))}
              <button className="filter-clear" onClick={() => setActiveFilters([])}>
                Clear all filter
              </button>
            </div>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: 'var(--text-secondary)',
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
                stroke="var(--gray-300)" strokeWidth="1" style={{ marginBottom: '12px' }}>
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>
                No products found
              </p>
              <p style={{ fontSize: '13px', marginTop: '6px' }}>
                Try adjusting your filters or category
              </p>
            </div>
          )}

          {/* Grid view */}
          {view === 'grid' && filtered.length > 0 && (
            <div className="products-grid">
              {filtered.map(p => <GridCard key={p._id} product={p} />)}
            </div>
          )}

          {/* List view */}
          {view === 'list' && filtered.length > 0 && (
            <div className="products-list">
              {filtered.map(p => <ListCard key={p._id} product={p} />)}
            </div>
          )}

          {/* Pagination */}
          <div className="products-pagination">
            <div className="products-pagination__show">
              Show
              <select defaultValue="10">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            <button className="products-pagination__btn" disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            {[1, 2, 3].map(n => (
              <button key={n}
                className={`products-pagination__btn${page === n ? ' active' : ''}`}
                onClick={() => setPage(n)}>{n}</button>
            ))}
            <button className="products-pagination__btn" onClick={() => setPage(p => p + 1)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile list items */}
      {filtered.map(p => (
        <Link key={p._id} to={`/product/${p._id}`}
          className="mobile-list-card" style={{ textDecoration: 'none' }}>
          <div className="mobile-list-card__img">
            <ImagePlaceholder src={p.image} alt={p.name} />
          </div>
          <div>
            <div className="mobile-list-card__name">{p.name}</div>
            <div className="mobile-list-card__price">${p.price?.toFixed(2)}</div>
            <div className="mobile-list-card__meta">
              <StarRating rating={p.rating || 7.5} showNumber={false} />
              <span className="mobile-list-card__ship">Free Shipping</span>
            </div>
          </div>
        </Link>
      ))}

      {/* Mobile: You may also like */}
      <div className="products-also-like">
        <div className="products-also-like__title">You may also like</div>
        <div className="products-also-like__row">
          {products.slice(0, 6).map(p => (
            <Link key={p._id} to={`/product/${p._id}`}
              className="products-also-like__item" style={{ textDecoration: 'none' }}>
              <div className="products-also-like__img">
                <ImagePlaceholder src={p.image} alt={p.name} />
              </div>
              <div className="products-also-like__price">${p.price?.toFixed(2)}</div>
              <div className="products-also-like__name">{p.name}</div>
            </Link>
          ))}
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default Products;