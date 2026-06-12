import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

// ─── Helpers ───────────────────────────────────────────────────────────────
function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage quota exceeded — fail silently
  }
}

// ─── Provider ──────────────────────────────────────────────────────────────
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => loadFromStorage('cartItems', []));
  const [savedItems, setSavedItems] = useState(() => loadFromStorage('savedItems', []));

  // Sync cartItems → localStorage
  useEffect(() => {
    saveToStorage('cartItems', cartItems);
  }, [cartItems]);

  // Sync savedItems → localStorage
  useEffect(() => {
    saveToStorage('savedItems', savedItems);
  }, [savedItems]);

  // ── Actions ──────────────────────────────────────────────────────────────

  const addToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.productId === (product._id || product.id));
      if (existing) {
        // Increase qty if already in cart
        return prev.map(i =>
          i.productId === (product._id || product.id)
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }
      return [
        ...prev,
        {
          id: `c_${Date.now()}`,
          productId: product._id || product.id,
          name: product.name,
          price: Number(product.price),
          image: product.image || null,
          qty,
          size: 'default',
          color: 'default',
          material: 'N/A',
          seller: product.seller || 'Brand Store',
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id, qty) => {
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Number(qty) } : i)
    );
  };

  const saveForLater = (id) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      setCartItems(prev => prev.filter(i => i.id !== id));
      setSavedItems(prev => [
        ...prev,
        { id: `s_${Date.now()}`, productId: item.productId, name: item.name, price: item.price, image: item.image },
      ]);
    }
  };

  const moveToCart = (id) => {
    const item = savedItems.find(i => i.id === id);
    if (item) {
      setSavedItems(prev => prev.filter(i => i.id !== id));
      setCartItems(prev => [
        ...prev,
        {
          id: `c_${Date.now()}`,
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          qty: 1,
          size: 'default',
          color: 'default',
          material: 'N/A',
          seller: 'Brand Store',
        },
      ]);
    }
  };

  const removeSaved = (id) => {
    setSavedItems(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Derived
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      savedItems,
      cartCount,
      subtotal,
      addToCart,
      removeFromCart,
      updateQty,
      saveForLater,
      moveToCart,
      removeSaved,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}

export default CartContext;
