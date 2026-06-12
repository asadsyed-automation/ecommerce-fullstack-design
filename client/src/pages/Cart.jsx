import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MobileNavbar from '../components/MobileNavbar';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import '../styles/cart.css';
import '../styles/navbar.css';
import '../styles/footer.css';

function Cart() {
  const { cartItems, savedItems, updateQty, removeFromCart, saveForLater, moveToCart, removeSaved, clearCart } = useCart();
  const [coupon, setCoupon] = useState('');

  const removeItem = id => removeFromCart(id);

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = 60;
  const tax = 14;
  const total = subtotal - discount + tax;

  const mobileItemsTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="cart-page">
      {/* Desktop nav */}
      <Navbar />

      {/* Mobile header */}
      <div className="cart-mobile-header">
        <Link to="/products" className="cart-mobile-header__back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </Link>
        <span className="cart-mobile-header__title">Shopping cart</span>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="cart-page__inner">
        <h1 className="cart-page__title">My cart ({cartItems.length})</h1>

        {/* Cart items */}
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item__img">
                <ImagePlaceholder src={item.image} alt={item.name} />
              </div>
              <div className="cart-item__info">
                <div className="cart-item__name">{item.name}</div>
                <div className="cart-item__meta">
                  Size: {item.size}, &nbsp; Color: {item.color}, &nbsp; Material: {item.material}<br />
                  Seller: {item.seller}
                </div>
                <div className="cart-item__actions">
                  <button className="cart-item__action-btn cart-item__action-btn--remove"
                    onClick={() => removeFromCart(item.id)}>Remove</button>
                  <button className="cart-item__action-btn cart-item__action-btn--save"
                    onClick={() => saveForLater(item.id)}>Save for later</button>
                </div>
              </div>
              <div className="cart-item__right">
                <span className="cart-item__price">${item.price.toFixed(2)}</span>
                <div className="cart-item__qty">
                  <select value={item.qty} onChange={e => updateQty(item.id, e.target.value)}>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n}>Qty: {n}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}

          <div className="cart-items__footer">
            <Link to="/products" className="cart-items__back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Back to shop
            </Link>
            <button className="cart-items__remove-all" onClick={() => clearCart()}>
              Remove all
            </button>
          </div>
        </div>

        {/* Order summary */}
        <div className="cart-summary">
          <div className="cart-summary__coupon">
            <span className="cart-summary__coupon-label">Have a coupon?</span>
            <div className="cart-summary__coupon-row">
              <input className="cart-summary__coupon-input" type="text"
                placeholder="Add coupon" value={coupon}
                onChange={e => setCoupon(e.target.value)} />
              <button className="cart-summary__coupon-btn">Apply</button>
            </div>
          </div>
          <hr className="cart-summary__divider" />
          <div className="cart-summary__row">
            <span className="cart-summary__row-label">Subtotal:</span>
            <span className="cart-summary__row-value">${subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-summary__row">
            <span className="cart-summary__row-label">Discount:</span>
            <span className="cart-summary__row-value--red">- ${discount.toFixed(2)}</span>
          </div>
          <div className="cart-summary__row">
            <span className="cart-summary__row-label">Tax:</span>
            <span className="cart-summary__row-value--green">+ ${tax.toFixed(2)}</span>
          </div>
          <hr className="cart-summary__divider" />
          <div className="cart-summary__total">
            <span>Total:</span>
            <span className="cart-summary__total-amount">${total.toFixed(2)}</span>
          </div>
          <button className="cart-summary__checkout">Checkout</button>
          <div className="cart-summary__payments">
            {['AMEX', 'MC', 'PP', 'VISA', '⬛Pay'].map(p => (
              <div key={p} className="cart-summary__pay-icon">{p}</div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="cart-trust">
          {[
            { icon: '🔒', title: 'Secure payment', sub: 'Have you ever finally just' },
            { icon: '💬', title: 'Customer support', sub: 'Have you ever finally just' },
            { icon: '🚚', title: 'Free delivery', sub: 'Have you ever finally just' },
          ].map(t => (
            <div key={t.title} className="cart-trust__item">
              <div className="cart-trust__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {t.title === 'Secure payment' && <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>}
                  {t.title === 'Customer support' && <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>}
                  {t.title === 'Free delivery' && <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>}
                </svg>
              </div>
              <div>
                <div className="cart-trust__title">{t.title}</div>
                <div className="cart-trust__sub">{t.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Saved for later */}
        {savedItems.length > 0 && (
          <div className="cart-saved">
            <div className="cart-saved__title">Saved for later</div>
            <div className="cart-saved__grid">
              {savedItems.map(item => (
                <div key={item.id} className="cart-saved-card">
                  <div className="cart-saved-card__img">
                    <ImagePlaceholder src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-saved-card__body">
                    <div className="cart-saved-card__price">${item.price.toFixed(2)}</div>
                    <div className="cart-saved-card__name">{item.name}</div>
                    <button className="cart-saved-card__move" onClick={() => moveToCart(item.id)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 01-8 0"/>
                      </svg>
                      Move to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Promo banner */}
        <div className="cart-promo-banner">
          <div className="cart-promo-banner__text">
            <h3>Super discount on more than 100 USD</h3>
            <p>Have you ever finally just write dummy info</p>
          </div>
          <button className="cart-promo-banner__btn">Shop now</button>
        </div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      {/* Mobile cart items */}
      {cartItems.map(item => (
        <div key={item.id} className="cart-mobile-item">
          <div className="cart-mobile-item__top">
            <div className="cart-mobile-item__img">
              <ImagePlaceholder src={item.image} alt={item.name} />
            </div>
            <div>
              <div className="cart-mobile-item__name">{item.name}</div>
              <div className="cart-mobile-item__meta">Size: {item.size}, Color: {item.color}</div>
              <div className="cart-mobile-item__meta">Seller: {item.seller}</div>
            </div>
            <div className="cart-mobile-item__more">⋮</div>
          </div>
          <div className="cart-mobile-item__bottom">
            <div className="cart-mobile-item__qty">
              <button className="cart-mobile-item__qty-btn"
                onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}>−</button>
              <div className="cart-mobile-item__qty-num">{item.qty}</div>
              <button className="cart-mobile-item__qty-btn"
                onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
            </div>
            <div className="cart-mobile-item__price">${item.price.toFixed(2)}</div>
          </div>
        </div>
      ))}

      {/* Mobile summary */}
      <div className="cart-mobile-summary">
        <div className="cart-mobile-summary__row">
          <span>Items ({cartItems.length}):</span>
          <span>${cartItems.reduce((s, i) => s + i.price, 0).toFixed(2)}</span>
        </div>
        <div className="cart-mobile-summary__row">
          <span>Shipping:</span><span>$10.00</span>
        </div>
        <div className="cart-mobile-summary__row">
          <span>Tax:</span><span>$7.00</span>
        </div>
        <div className="cart-mobile-summary__total">
          <span>Total:</span>
          <span>${(mobileItemsTotal + 10 + 7).toFixed(2)}</span>
        </div>
        <button className="cart-mobile-summary__checkout">
          Checkout ({cartItems.length} items)
        </button>
      </div>

      {/* Mobile saved for later */}
      {savedItems.length > 0 && (
        <div className="cart-mobile-saved">
          <div className="cart-mobile-saved__title">Saved for later</div>
          {savedItems.map(item => (
            <div key={item.id} className="cart-mobile-saved-item">
              <div className="cart-mobile-saved-item__img">
                <ImagePlaceholder src={item.image} alt={item.name} />
              </div>
              <div>
                <div className="cart-mobile-saved-item__name">{item.name}</div>
                <div className="cart-mobile-saved-item__price">${item.price.toFixed(2)}</div>
                <div className="cart-mobile-saved-item__btns">
                  <button className="cart-mobile-saved-item__btn cart-mobile-saved-item__btn--move"
                    onClick={() => moveToCart(item.id)}>Move to cart</button>
                  <button className="cart-mobile-saved-item__btn cart-mobile-saved-item__btn--remove"
                    onClick={() => removeSaved(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Cart;