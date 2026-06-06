import ProductCard from './ProductCard';

// Future: fetch from /api/products/recommended
const RECOMMENDED = [
  { id: '30', name: 'T-shirts with multiple colors, for men', price: '$10.30', showFrom: false },
  { id: '31', name: 'Jeans shorts for men blue color', price: '$10.30', showFrom: false },
  { id: '32', name: 'Brown winter coat medium size', price: '$12.50', showFrom: false },
  { id: '33', name: 'Jeans bag for travel for men', price: '$34.00', showFrom: false },
  { id: '34', name: 'Leather wallet', price: '$99.00', showFrom: false },
  { id: '35', name: 'Canon camera black, 100x zoom', price: '$9.99', showFrom: false },
  { id: '36', name: 'Headset for gaming with mic', price: '$8.99', showFrom: false },
  { id: '37', name: 'Smartwatch silver color modern', price: '$10.30', showFrom: false },
  { id: '38', name: 'Blue wallet for men leather material', price: '$10.30', showFrom: false },
  { id: '39', name: 'Jeans bag for travel for men', price: '$80.95', showFrom: false },
];

function RecommendedItems({ products = RECOMMENDED }) {
  return (
    <section className="recommended-section">
      <div className="recommended-section__inner">
        <div className="section__header">
          <h2 className="section__title">Recommended items</h2>
        </div>
        <div className="recommended-section__grid">
          {products.map(p => <ProductCard key={p.id} {...p} />)}
        </div>
      </div>
    </section>
  );
}

export default RecommendedItems;