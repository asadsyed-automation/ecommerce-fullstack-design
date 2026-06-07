import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from './ProductCard';

function ConsumerElectronicsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    getProducts()
      .then(res => {
        // Prefer Electronics category; fallback to last 8 products
        const elec = res.data.filter(p =>
          p.category?.toLowerCase().includes('electronic') ||
          p.category?.toLowerCase().includes('gadget') ||
          p.category?.toLowerCase().includes('tech')
        );
        setProducts(elec.length >= 4 ? elec.slice(0, 8) : res.data.slice(-8));
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="category-section">
      <div className="category-section__inner">

        {/* LEFT promo — desktop/tablet only */}
        <div className="category-section__promo">
          <div className="category-section__promo-title">
            Consumer electronics and gadgets
          </div>
          <div className="category-section__promo-img"
            style={{ background: 'linear-gradient(135deg, #e8f0fe, #c2d4f8)' }} />
          <button className="category-section__promo-btn">Source now →</button>
        </div>

        {/* RIGHT products */}
        <div className="category-section__products">
          <div className="category-section__mobile-title">Consumer electronics</div>
          <div className="category-section__scroll-row">
            {loading
              ? [...Array(4)].map((_, i) => (
                  <div key={i} className="category-section__scroll-item">
                    <div style={{
                      width: '100%', aspectRatio: '1/1', borderRadius: '8px',
                      background: 'var(--gray-100)', animation: 'pulse 1.5s infinite',
                    }} />
                  </div>
                ))
              : products.map(p => (
                  <div key={p._id} className="category-section__scroll-item">
                    <ProductCard
                      id={p._id}
                      name={p.name}
                      price={`$${p.price?.toFixed(2)}`}
                      image={p.image}
                      showFrom={true}
                    />
                  </div>
                ))
            }
          </div>
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
        </div>
      </div>
    </section>
  );
}

export default ConsumerElectronicsSection;