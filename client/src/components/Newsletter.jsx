function Newsletter() {
  return (
    <section className="newsletter-section">
      <div className="newsletter-section__inner">
        <h3 className="newsletter-section__title">Subscribe on our newsletter</h3>
        <p className="newsletter-section__sub">
          Get daily news on upcoming offers from many suppliers all over the world
        </p>
        <div className="newsletter-section__form">
          <input
            className="newsletter-section__input"
            type="email"
            placeholder="✉ Email"
          />
          <button className="newsletter-section__btn">Subscribe</button>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;