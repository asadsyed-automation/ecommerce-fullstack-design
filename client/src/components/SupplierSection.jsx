function SupplierSection() {
  return (
    <section className="supplier-section">
      <div className="supplier-section__inner">
        <div className="supplier-section__text">
          <h2>An easy way to send requests to all suppliers</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          <div className="supplier-section__mobile-cta">
            <button className="supplier-section__mobile-cta-btn">Send inquiry</button>
          </div>
        </div>

        {/* Desktop form — hidden on mobile */}
        <div className="supplier-section__form">
          <h3>Send quote to suppliers</h3>
          <label>What item you need?</label>
          <input type="text" placeholder="Type more details" />
          <div className="supplier-section__form-row">
            <input type="number" placeholder="Quantity" />
            <select><option>Pcs</option><option>Kg</option><option>Set</option></select>
          </div>
          <button className="supplier-section__form-btn">Send inquiry</button>
        </div>
      </div>
    </section>
  );
}

export default SupplierSection;