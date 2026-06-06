import { Link } from 'react-router-dom';

function DealCard({ id = '1', name = 'Smart watches', discount = '-25%', image = null }) {
  return (
    <Link to={`/product/${id}`} className="deal-card" style={{ textDecoration: 'none' }}>
      <div className="deal-card__image-wrap">
        {image ? (
          <img src={image} alt={name} loading="lazy" />
        ) : (
          <div style={{
            width: '100%', height: '100%', background: 'var(--gray-100)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--gray-300)'
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
        )}
      </div>
      <div className="deal-card__body">
        <div className="deal-card__name">{name}</div>
        <span className="deal-card__badge">{discount}</span>
      </div>
    </Link>
  );
}

export default DealCard;