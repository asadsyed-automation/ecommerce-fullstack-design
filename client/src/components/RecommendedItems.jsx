import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import ImagePlaceholder from './ImagePlaceholder';

function RecommendedItems() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data.slice(0, 10)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="recommended-section">
        <div className="recommended-section__inner">
          <div className="section__header">
            <h2 className="section__title">Recommended items</h2>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{
                flex: '1', aspectRatio: '1/1', borderRadius: '8px',
                background: 'var(--gray-100)', animation: 'pulse 1.5s infinite',
                minWidth: 0,
              }} />
            ))}
          </div>
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="recommended-section">
      <div className="recommended-section__inner">
        <div className="section__header">
          <h2 className="section__title">Recommended items</h2>
        </div>
        <div className="recommended-section__grid">
          {products.map(p => (
            <Link
              key={p._id}
              to={`/product/${p._id}`}
              className="product-card"
              style={{ textDecoration: 'none' }}
            >
              <div className="product-card__image-wrap">
                <ImagePlaceholder src={p.image} alt={p.name} />
              </div>
              <div className="product-card__body">
                <div className="product-card__name">{p.name}</div>
                <div className="product-card__price">
                  ${p.price?.toFixed(2)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecommendedItems;