import { Link } from 'react-router-dom';

function CategoryCard({ id, name, price, image, showFrom = true }) {
  return (
    <Link to={`/product/${id}`} className="category-card">
      <div className="category-card__content">
        <div className="category-card__name">{name}</div>
        <div className="category-card__price">
          {showFrom && <span className="category-card__from">From </span>}
          {price}
        </div>
      </div>
      <div className="category-card__image-wrap">
        {image ? (
          <img src={image} alt={name} loading="lazy" />
        ) : (
          <div className="category-card__placeholder">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>
    </Link>
  );
}

export default CategoryCard;
