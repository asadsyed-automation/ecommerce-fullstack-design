import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import CountdownTimer from './CountdownTimer';
import DealCard from './DealCard';

function DealsSection() {
  const [deals, setDeals]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(res => setDeals(res.data.slice(0, 5)))
      .catch(() => setDeals([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="deals-section">
      <div className="deals-section__inner">
        <div className="deals-section__left">
          <div className="deals-section__label">Deals and offers</div>
          <div className="deals-section__sub">Electronic equipments</div>
          <CountdownTimer />
        </div>
        <div className="deals-section__right">
          <div className="deals-section__products">
            {loading
              ? [...Array(5)].map((_, i) => (
                  <div key={i} style={{
                    flex: '0 0 130px', aspectRatio: '1/1', borderRadius: '8px',
                    background: 'var(--gray-100)', animation: 'pulse 1.5s infinite',
                  }} />
                ))
              : deals.map(p => (
                  <DealCard
                    key={p._id}
                    id={p._id}
                    name={p.name}
                    image={p.image}
                    discount="-25%"
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

export default DealsSection;