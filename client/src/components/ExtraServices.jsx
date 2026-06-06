const SERVICES = [
  { id: 1, label: 'Source from\nIndustry Hubs', icon: '🔍', bg: 'var(--gray-200)' },
  { id: 2, label: 'Customize Your\nProducts', icon: '✏️', bg: 'var(--gray-200)' },
  { id: 3, label: 'Fast, reliable shipping\nby ocean or air', icon: '✈️', bg: 'var(--gray-200)' },
  { id: 4, label: 'Product monitoring\nand inspection', icon: '🌐', bg: 'var(--gray-200)' },
];

function ExtraServices() {
  return (
    <section className="services-section">
      <div className="services-section__inner">
        <div className="section__header">
          <h2 className="section__title">Our extra services</h2>
        </div>
        <div className="services-section__grid">
          {SERVICES.map(s => (
            <div key={s.id} className="service-card">
              <div className="service-card__img" style={{ background: s.bg }} />
              <div className="service-card__overlay">
                <div className="service-card__label" style={{ whiteSpace: 'pre-line' }}>{s.label}</div>
              </div>
              <div className="service-card__icon">{s.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExtraServices;