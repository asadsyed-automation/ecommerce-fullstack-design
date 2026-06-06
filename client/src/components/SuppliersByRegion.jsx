import aeFlag from '../assets/flags/ae.png';
import auFlag from '../assets/flags/au.png';
import usFlag from '../assets/flags/us.png';
import ruFlag from '../assets/flags/ru.png';
import itFlag from '../assets/flags/it.png';
import dkFlag from '../assets/flags/dk.png';
import frFlag from '../assets/flags/fr.png';
import cnFlag from '../assets/flags/cn.png';
import gbFlag from '../assets/flags/gb.png';

const REGIONS = [
  { id: 1, flag: aeFlag, name: 'Arabic Emirates', url: 'shopname.ae' },
  { id: 2, flag: auFlag, name: 'Australia', url: 'shopname.au' },
  { id: 3, flag: usFlag, name: 'United States', url: 'shopname.us' },
  { id: 4, flag: ruFlag, name: 'Russia', url: 'shopname.ru' },
  { id: 5, flag: itFlag, name: 'Italy', url: 'shopname.it' },
  { id: 6, flag: dkFlag, name: 'Denmark', url: 'denmark.com.dk' },
  { id: 7, flag: frFlag, name: 'France', url: 'shopname.com.fr' },
  { id: 8, flag: aeFlag, name: 'Arabic Emirates', url: 'shopname.ae' },
  { id: 9, flag: cnFlag, name: 'China', url: 'shopname.ae' },
  { id: 10, flag: gbFlag, name: 'Great Britain', url: 'shopname.co.uk' },
];

function SuppliersByRegion({ regions = REGIONS }) {
  return (
    <section className="regions-section">
      <div className="regions-section__inner">
        <div className="section__header">
          <h2 className="section__title">Suppliers by region</h2>
        </div>

        <div className="regions-section__scroll-row">
          {regions.map((r) => (
            <div key={r.id} className="regions-section__scroll-item">
              <div className="region-card">

                <div className="region-card__flag">
                  <img
                    src={r.flag}
                    alt={r.name}
                    className="region-card__flag-img"
                  />
                </div>

                <div className="region-card__name">{r.name}</div>
                <div className="region-card__url">{r.url}</div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SuppliersByRegion;