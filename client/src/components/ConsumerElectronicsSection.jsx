import ProductCard from './ProductCard';

const ELECTRONICS_PRODUCTS = [
  { id: '20', name: 'Smart watches', price: 'USD 19', showFrom: true },
  { id: '21', name: 'Cameras', price: 'USD 89', showFrom: true },
  { id: '22', name: 'Headphones', price: 'USD 70', showFrom: true },
  { id: '23', name: 'Smart watches', price: 'USD 90', showFrom: true },
  { id: '24', name: 'Gaming set', price: 'USD 35', showFrom: true },
  { id: '25', name: 'Laptops & PC', price: 'USD 340', showFrom: true },
  { id: '26', name: 'Smartphones', price: 'USD 19', showFrom: true },
  { id: '27', name: 'Electric kettle', price: 'USD 240', showFrom: true },
];

function ConsumerElectronicsSection({ products = ELECTRONICS_PRODUCTS }) {
  return (
    <section className="category-section">
      <div className="category-section__inner">

        {/* LEFT promo — desktop/tablet only */}
        <div className="category-section__promo">
          <div className="category-section__promo-title">Consumer electronics and gadgets</div>
          <div className="category-section__promo-img" />
          <button className="category-section__promo-btn">Source now →</button>
        </div>

        {/* RIGHT products */}
        <div className="category-section__products">

          {/* Mobile section title — only visible on mobile */}
          <div className="category-section__mobile-title">Consumer electronics</div>

          {/* Scroll row wrapper */}
          <div className="category-section__scroll-row">
            {products.map(p => (
              <div key={p.id} className="category-section__scroll-item">
                <ProductCard {...p} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default ConsumerElectronicsSection;