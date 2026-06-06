import heroImg from '../assets/hero.png';
import { Link } from 'react-router-dom';

const SIDEBAR_CATEGORIES = [
  'Automobiles', 'Clothes and wear', 'Home interiors',
  'Computer and tech', 'Tools, equipments', 'Sports and outdoor',
  'Animal and pets', 'Machinery tools', 'More category',
];

function HeroBanner() {
  return (
    <section className="hero-section">
      <div className="hero-section__inner">
        {/* LEFT: Category Sidebar — hidden on mobile */}
        <aside className="hero-sidebar">
          {SIDEBAR_CATEGORIES.map(cat => (
            <a key={cat} href="#" className="hero-sidebar__item">{cat}</a>
          ))}
        </aside>

        {/* CENTER: Hero Banner */}
        <div className="hero-banner">
          <div className="hero-banner__text">
            <p className="hero-banner__sub">Latest trending</p>
            <h1 className="hero-banner__title">Electronic items</h1>
            <button className="hero-banner__btn">
              Learn more
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
          <img src={heroImg} alt="Latest trending Electronic items" className="hero-banner__image" />
        </div>

        {/* RIGHT: User Panel — hidden on mobile and tablet */}
        <aside className="hero-user-panel">
          <div className="hero-user-panel__greeting">
            Hi, user<span>let's get started</span>
          </div>
          <Link to="/login" className="hero-user-panel__btn hero-user-panel__btn--primary">Join now</Link>
          <Link to="/login" className="hero-user-panel__btn hero-user-panel__btn--outline">Log in</Link>
          <div className="hero-user-panel__promo">
            Get US $10 off<br/>with a new supplier
          </div>
          <div className="hero-user-panel__supplier-btn">
            Send quotes with<br/>supplier preferences
          </div>
        </aside>
      </div>
    </section>
  );
}

export default HeroBanner;