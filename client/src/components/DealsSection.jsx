import CountdownTimer from './CountdownTimer';
import DealCard from './DealCard';

// Future: deals fetched from /api/deals endpoint
const DEALS_DATA = [
  { id: '1', name: 'Smart watches', discount: '-25%' },
  { id: '2', name: 'Laptops', discount: '-15%' },
  { id: '3', name: 'GoPro cameras', discount: '-40%' },
  { id: '4', name: 'Headphones', discount: '-25%' },
  { id: '5', name: 'Canon cameras', discount: '-25%' },
];

function DealsSection({ deals = DEALS_DATA }) {
  return (
    <section className="deals-section">
      <div className="deals-section__inner">
        <div className="deals-section__left">
          <div className="deals-section__label">Deals and offers</div>
          <div className="deals-section__sub">Hygiene equipments</div>
          <CountdownTimer />
        </div>
        <div className="deals-section__right">
          <div className="deals-section__products">
            {deals.map(deal => (
              <DealCard key={deal.id} {...deal} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DealsSection;