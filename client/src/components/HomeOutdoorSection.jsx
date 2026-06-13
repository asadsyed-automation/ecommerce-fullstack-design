import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import CategoryCard from './CategoryCard';

function HomeOutdoorSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    getProducts()
      .then(res => {
        // Prefer 'Home' or 'Furniture' category; fallback to first 8
        const home = res.data.filter(p =>
          p.category?.toLowerCase().includes('home') ||
          p.category?.toLowerCase().includes('furniture') ||
          p.category?.toLowerCase().includes('outdoor')
        );
        setProducts(home.length >= 4 ? home.slice(0, 8) : res.data.slice(0, 8));
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="category-section">
      <div className="category-section__inner">

        {/* LEFT promo — desktop/tablet only */}
        <div className="category-section__promo" style={{ backgroundImage: "url('/backgrounds/home.png')" }}>
          <div className="category-section__promo-title">Home and outdoor</div>
          <button className="category-section__promo-btn">Source now →</button>
        </div>


        {/* RIGHT products */}
        <div className="category-section__products">
          <div className="category-section__mobile-title">Home and outdoor</div>
          <div className="category-section__grid">
            {loading
              ? [...Array(8)].map((_, i) => (
                  <div key={i} className="category-card" style={{
                    height: '120px',
                    background: 'var(--gray-50)',
                    border: '1px solid var(--border)',
                    animation: 'pulse 1.5s infinite',
                  }} />
                ))
              : products.map(p => (
                  <CategoryCard
                    key={p._id}
                    id={p._id}
                    name={p.name}
                    price={`$${p.price?.toFixed(2)}`}
                    image={p.image}
                    showFrom={true}
                  />
                ))
            }
          </div>
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
        </div>
      </div>
    </section>
  );
}


export default HomeOutdoorSection;