import ProductCard from './ProductCard';

const HOME_OUTDOOR_PRODUCTS = [
  { id: '10', name: 'Soft chairs', price: 'USD 19', showFrom: true },
  { id: '11', name: 'Sofa & chair', price: 'USD 19', showFrom: true },
  { id: '12', name: 'Kitchen dishes', price: 'USD 19', showFrom: true },
  { id: '13', name: 'Smart watches', price: 'USD 19', showFrom: true },
  { id: '14', name: 'Kitchen mixer', price: 'USD 100', showFrom: true },
  { id: '15', name: 'Blenders', price: 'USD 39', showFrom: true },
  { id: '16', name: 'Home appliance', price: 'USD 19', showFrom: true },
  { id: '17', name: 'Coffee maker', price: 'USD 10', showFrom: true },
];

function HomeOutdoorSection({ products = HOME_OUTDOOR_PRODUCTS }) {
  return (
    <section className="category-section">
      <div className="category-section__inner">

        {/* LEFT promo — desktop/tablet only */}
        <div className="category-section__promo">
          <div className="category-section__promo-title">Home and outdoor</div>
          <div className="category-section__promo-img" />
          <button className="category-section__promo-btn">Source now →</button>
        </div>

        {/* RIGHT products */}
        <div className="category-section__products">

          {/* Mobile section title — only visible on mobile */}
          <div className="category-section__mobile-title">Home and outdoor</div>

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

export default HomeOutdoorSection;