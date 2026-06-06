import { Link } from 'react-router-dom';

// Future: product data will come from API
// props: { id, name, price, image, badge, showFrom }
function ProductCard({ id = '1', name = 'Smart watches', price = 'USD 19', image = null, badge = null, showFrom = true }) {
  return (
    <Link to={`/product/${id}`} className="product-card" style={{ textDecoration: 'none' }}>
      <div className="product-card__image-wrap">
        {image ? (
          <img src={image} alt={name} loading="lazy" />
        ) : (
          <div style={{
            width: '100%', height: '100%', background: 'var(--gray-100)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--gray-300)'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
        )}
        {badge && <span className="product-card__badge">{badge}</span>}
      </div>
      <div className="product-card__body">
        <div className="product-card__name">{name}</div>
        <div className="product-card__price">
          {showFrom && <span className="product-card__from">From </span>}
          {price}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;