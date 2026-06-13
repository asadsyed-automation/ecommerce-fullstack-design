import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getAdminStats, getProducts,
  createProduct, updateProduct, deleteProduct
} from '../services/api';
import ImageUpload from '../components/ImageUpload';
import '../styles/admin.css';

// ─────────────────────────────────────────────────────────
// Admin Layout
// ─────────────────────────────────────────────────────────
function AdminLayout({ children, activeTab, setActiveTab }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '▦' },
    { id: 'products', label: 'Products', icon: '◫' },
    // Future tabs — easily extendable:
    { id: 'orders', label: 'Orders', icon: '📦', soon: true },
    { id: 'users', label: 'Users', icon: '👤', soon: true },
    { id: 'analytics', label: 'Analytics', icon: '📊', soon: true },
  ];

  const selectTab = (id) => {
    setActiveTab(id);
    setMenuOpen(false);
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${menuOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div style={{
          padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}>
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            color: '#fff', textDecoration: 'none'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <span style={{ fontWeight: 700, fontSize: '16px' }}>Brand Admin</span>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 0' }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => !item.soon && selectTab(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                padding: '11px 20px', background: activeTab === item.id
                  ? 'rgba(13,110,253,0.2)' : 'transparent',
                border: 'none', color: activeTab === item.id ? '#60a5fa'
                  : item.soon ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.7)',
                fontSize: '14px', fontWeight: activeTab === item.id ? 600 : 400,
                cursor: item.soon ? 'default' : 'pointer', textAlign: 'left',
                borderLeft: activeTab === item.id ? '3px solid #3b82f6' : '3px solid transparent',
                transition: 'all 0.15s'
              }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              {item.label}
              {item.soon && (
                <span style={{
                  marginLeft: 'auto', fontSize: '10px', padding: '2px 6px',
                  background: 'rgba(255,255,255,0.1)', borderRadius: '4px',
                  color: 'rgba(255,255,255,0.4)'
                }}>Soon</span>
              )}
            </button>
          ))}
        </nav>

        {/* User info + logout */}
        <div style={{
          padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '4px' }}>
            Signed in as
          </div>
          <div style={{ color: '#fff', fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>
            {user?.name}
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%', padding: '8px', background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px',
              color: 'rgba(255,255,255,0.7)', fontSize: '13px', cursor: 'pointer',
              transition: 'background 0.15s'
            }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-main">
        {/* Top bar */}
        <header className="admin-header">
          <div className="admin-header__left">
            <button className="admin-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <h1 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              {activeTab === 'dashboard' ? 'Dashboard' : 'Product Management'}
            </h1>
          </div>
          <Link to="/" style={{
            fontSize: '13px', color: 'var(--primary)', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '4px'
          }}>
            ← View Store
          </Link>
        </header>

        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Stats Card
// ─────────────────────────────────────────────────────────
function StatsCard({ label, value, color = 'var(--primary)', icon }) {
  return (
    <div style={{
      background: 'var(--bg-white)', borderRadius: '10px',
      border: '1px solid var(--border)', padding: '20px 24px',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: '22px' }}>{icon}</span>
      </div>
      <div style={{ fontSize: '28px', fontWeight: 700, color }}>{value}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Dashboard Tab
// ─────────────────────────────────────────────────────────
function DashboardTab() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAdminStats()
      .then((res) => setStats(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load stats'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color: 'var(--text-secondary)', padding: '40px 0', textAlign: 'center' }}>Loading dashboard…</div>;
  if (error) return <div style={{ color: 'var(--accent-red)', padding: '20px', background: '#FEF2F2', borderRadius: '8px' }}>{error}</div>;

  return (
    <div>
      {/* Stats grid */}
      <div className="admin-stats-grid">
        <StatsCard label="Total Products" value={stats.totalProducts} icon="📦" color="var(--primary)" />
        <StatsCard label="Categories" value={stats.totalCategories} icon="🏷️" color="var(--accent-orange)" />
        <StatsCard label="Total Stock" value={stats.totalStock.toLocaleString()} icon="🏬" color="var(--accent-green)" />
        <StatsCard label="Low Stock Items" value={stats.lowStockCount} icon="⚠️" color="var(--accent-red)" />
      </div>

      {/* Low stock table */}
      {stats.lowStockProducts.length > 0 && (
        <div className="admin-table-container">
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
            ⚠️ Low Stock Products (≤ 10 units)
          </h3>
          <table className="admin-table">
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                {['Product Name', 'Category', 'Stock'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.lowStockProducts.map((p) => (
                <tr key={p._id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '10px 12px', fontSize: '14px', color: 'var(--text-primary)' }}>{p.name}</td>
                  <td style={{ padding: '10px 12px', fontSize: '13px', color: 'var(--text-secondary)' }}>{p.category}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      background: p.stock === 0 ? '#FEF2F2' : '#FFF7ED',
                      color: p.stock === 0 ? 'var(--accent-red)' : 'var(--accent-orange)',
                      padding: '2px 10px', borderRadius: '20px', fontSize: '13px', fontWeight: 600
                    }}>{p.stock}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Categories */}
      <div style={{ background: 'var(--bg-white)', borderRadius: '10px', border: '1px solid var(--border)', padding: '20px', marginTop: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>Categories</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {stats.categories.map((cat) => (
            <span key={cat} style={{
              background: 'var(--primary-light)', color: 'var(--primary)',
              padding: '4px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 500
            }}>{cat}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Product Modal (Add / Edit)
// ─────────────────────────────────────────────────────────
const EMPTY_FORM = { name: '', price: '', image: '', description: '', category: '', stock: '' };

function ProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState(product ? {
    name: product.name || '',
    price: product.price || '',
    image: product.image || '',
    description: product.description || '',
    category: product.category || '',
    stock: product.stock || '',
  } : { ...EMPTY_FORM });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (product) {
        const res = await updateProduct(product._id, form);
        onSave(res.data, 'edit');
      } else {
        const res = await createProduct(form);
        onSave(res.data, 'add');
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '16px'
    }}>
      <div style={{
        background: 'var(--bg-white)', borderRadius: '12px',
        width: '100%', maxWidth: '520px', boxShadow: 'var(--shadow-lg)',
        maxHeight: '90vh', overflow: 'auto'
      }}>
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button onClick={onClose} style={{
            background: 'var(--gray-100)', border: 'none', borderRadius: '6px',
            width: '30px', height: '30px', cursor: 'pointer', fontSize: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {error && (
            <div style={{
              background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#B91C1C',
              borderRadius: '8px', padding: '10px 14px', fontSize: '13px'
            }}>{error}</div>
          )}

          {[
            { name: 'name', label: 'Product Name', type: 'text', required: true, placeholder: 'e.g. Wireless Headphones' },
            { name: 'price', label: 'Price (USD)', type: 'number', required: true, placeholder: '0.00' },
            { name: 'category', label: 'Category', type: 'text', placeholder: 'e.g. Electronics' },
            { name: 'stock', label: 'Stock Quantity', type: 'number', placeholder: '0' },
          ].map((field) => (
            <div key={field.name}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {field.label} {field.required && <span style={{ color: 'var(--accent-red)' }}>*</span>}
              </label>
              <input
                name={field.name} type={field.type} placeholder={field.placeholder}
                value={form[field.name]} onChange={handleChange}
                required={field.required}
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: '8px',
                  border: '1px solid var(--border)', fontSize: '14px',
                  color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box'
                }}
              />
            </div>
          ))}

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Product Image
            </label>
            <ImageUpload
              value={form.image}
              onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Description
            </label>
            <textarea
              name="description" value={form.description} onChange={handleChange}
              placeholder="Product description…" rows={3}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: '8px',
                border: '1px solid var(--border)', fontSize: '14px',
                color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box',
                resize: 'vertical', fontFamily: 'var(--font)'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', paddingTop: '4px' }}>
            <button type="button" onClick={onClose} style={{
              flex: 1, padding: '11px', background: 'var(--gray-100)',
              border: '1px solid var(--border)', borderRadius: '8px',
              fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer'
            }}>Cancel</button>
            <button type="submit" disabled={loading} style={{
              flex: 1, padding: '11px', background: loading ? 'var(--gray-300)' : 'var(--primary)',
              border: 'none', borderRadius: '8px', fontSize: '14px',
              fontWeight: 600, color: '#fff', cursor: loading ? 'not-allowed' : 'pointer'
            }}>
              {loading ? 'Saving…' : product ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Products Tab
// ─────────────────────────────────────────────────────────
function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // null | 'add' | product object (edit)
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const fetchProducts = useCallback(() => {
    setLoading(true);
    getProducts(search ? { search } : {})
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [search]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleSave = (savedProduct, mode) => {
    if (mode === 'add') {
      setProducts((prev) => [savedProduct, ...prev]);
      showToast('✅ Product added successfully');
    } else {
      setProducts((prev) => prev.map((p) => p._id === savedProduct._id ? savedProduct : p));
      showToast('✅ Product updated successfully');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(deleteId);
      setProducts((prev) => prev.filter((p) => p._id !== deleteId));
      setDeleteId(null);
      showToast('🗑️ Product deleted');
    } catch {
      showToast('❌ Failed to delete product');
    }
  };

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px',
          background: 'var(--gray-900)', color: '#fff', padding: '12px 20px',
          borderRadius: '8px', fontSize: '14px', zIndex: 2000,
          boxShadow: 'var(--shadow-lg)', animation: 'fadeIn 0.2s'
        }}>{toast}</div>
      )}

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '16px' }}>🔍</span>
          <input
            type="text" placeholder="Search products…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '10px 14px 10px 36px', borderRadius: '8px',
              border: '1px solid var(--border)', fontSize: '14px',
              outline: 'none', boxSizing: 'border-box'
            }}
          />
        </div>
        <button
          onClick={() => setModal('add')}
          style={{
            padding: '10px 20px', background: 'var(--primary)', color: '#fff',
            border: 'none', borderRadius: '8px', fontWeight: 600,
            fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap'
          }}
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div style={{ background: 'var(--bg-white)', borderRadius: '10px', border: '1px solid var(--border)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading products…</div>
        ) : products.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            {search ? `No products found for "${search}"` : 'No products yet. Add your first product!'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr style={{ background: 'var(--gray-50)', borderBottom: '2px solid var(--border)' }}>
                  {['Image', 'Product', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                    <th key={h} style={{
                      padding: '11px 14px', textAlign: 'left', fontSize: '12px',
                      fontWeight: 700, color: 'var(--text-secondary)',
                      textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap'
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 14px', width: '56px' }}>
                      {product.image ? (
                        <img src={product.image} alt={product.name}
                          style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--border)' }}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div style={{
                          width: '44px', height: '44px', background: 'var(--gray-100)',
                          borderRadius: '6px', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', color: 'var(--gray-300)'
                        }}>🖼</div>
                      )}
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', maxWidth: '200px' }}>{product.name}</div>
                      {product.description && (
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                          {product.description}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{
                        background: 'var(--primary-light)', color: 'var(--primary)',
                        padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 500
                      }}>{product.category || 'General'}</span>
                    </td>
                    <td style={{ padding: '10px 14px', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                      ${Number(product.price).toFixed(2)}
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{
                        background: product.stock <= 0 ? '#FEF2F2' : product.stock <= 10 ? '#FFF7ED' : '#F0FDF4',
                        color: product.stock <= 0 ? 'var(--accent-red)' : product.stock <= 10 ? 'var(--accent-orange)' : 'var(--accent-green)',
                        padding: '3px 10px', borderRadius: '20px', fontSize: '13px', fontWeight: 600
                      }}>{product.stock}</span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => setModal(product)}
                          style={{
                            padding: '6px 14px', background: 'var(--primary-light)',
                            color: 'var(--primary)', border: 'none', borderRadius: '6px',
                            fontSize: '13px', fontWeight: 600, cursor: 'pointer'
                          }}
                        >Edit</button>
                        <button
                          onClick={() => setDeleteId(product._id)}
                          style={{
                            padding: '6px 14px', background: '#FEF2F2',
                            color: 'var(--accent-red)', border: 'none', borderRadius: '6px',
                            fontSize: '13px', fontWeight: 600, cursor: 'pointer'
                          }}
                        >Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-muted)' }}>
        {products.length} product{products.length !== 1 ? 's' : ''}
        {search && ` matching "${search}"`}
      </div>

      {/* Modals */}
      {modal && (
        <ProductModal
          product={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {deleteId && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            background: 'var(--bg-white)', borderRadius: '12px',
            padding: '28px', width: '100%', maxWidth: '380px',
            boxShadow: 'var(--shadow-lg)', textAlign: 'center'
          }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🗑️</div>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Delete Product?</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
              This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setDeleteId(null)} style={{
                flex: 1, padding: '11px', background: 'var(--gray-100)',
                border: '1px solid var(--border)', borderRadius: '8px',
                fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer'
              }}>Cancel</button>
              <button onClick={handleDelete} style={{
                flex: 1, padding: '11px', background: 'var(--accent-red)',
                border: 'none', borderRadius: '8px', fontSize: '14px',
                fontWeight: 600, color: '#fff', cursor: 'pointer'
              }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Main Admin Page
// ─────────────────────────────────────────────────────────
function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/login', { replace: true });
    }
  }, [isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', background: 'var(--bg-page)'
      }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading…</p>
      </div>
    );
  }

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'dashboard' && <DashboardTab />}
      {activeTab === 'products' && <ProductsTab />}
    </AdminLayout>
  );
}

export default Admin;