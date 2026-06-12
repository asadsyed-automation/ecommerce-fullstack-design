import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

function Login() {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let res;
      if (tab === 'login') {
        res = await loginUser({ email: form.email, password: form.password });
      } else {
        res = await registerUser({ name: form.name, email: form.email, password: form.password });
      }

      const { token, user } = res.data;
      login(user, token);

      // Redirect admin to admin panel, others to home
      if (user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', display: 'flex', flexDirection: 'column' }}>
      {/* Simple header */}
      <header style={{
        background: 'var(--primary)', padding: '14px 24px',
        display: 'flex', alignItems: 'center', gap: '10px'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', textDecoration: 'none' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <span style={{ fontWeight: 700, fontSize: '18px' }}>Brand</span>
        </Link>
      </header>

      {/* Card */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '32px 16px'
      }}>
        <div style={{
          background: 'var(--bg-white)', borderRadius: '12px',
          boxShadow: 'var(--shadow-md)', padding: '36px 40px',
          width: '100%', maxWidth: '420px'
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', marginBottom: '28px', borderBottom: '2px solid var(--border)' }}>
            {['login', 'register'].map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(''); setForm({ name: '', email: '', password: '' }); }}
                style={{
                  flex: 1, padding: '10px', fontWeight: 600, fontSize: '15px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  borderBottom: tab === t ? '2px solid var(--primary)' : '2px solid transparent',
                  color: tab === t ? 'var(--primary)' : 'var(--text-secondary)',
                  marginBottom: '-2px', transition: 'color 0.15s',
                  textTransform: 'capitalize'
                }}
              >
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
            {tab === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            {tab === 'login'
              ? 'Sign in to your account to continue shopping.'
              : 'Join Brand and start shopping today.'}
          </p>

          {error && (
            <div style={{
              background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#B91C1C',
              borderRadius: '8px', padding: '10px 14px', fontSize: '13px', marginBottom: '20px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {tab === 'register' && (
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  name="name" type="text" placeholder="Your full name"
                  value={form.name} onChange={handleChange}
                  required style={inputStyle}
                />
              </div>
            )}

            <div>
              <label style={labelStyle}>Email address</label>
              <input
                name="email" type="email" placeholder="your@email.com"
                value={form.email} onChange={handleChange}
                required style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <input
                name="password" type="password" placeholder="••••••••"
                value={form.password} onChange={handleChange}
                required style={inputStyle}
              />
            </div>

            <button
              type="submit" disabled={loading}
              style={{
                background: loading ? 'var(--gray-300)' : 'var(--primary)',
                color: '#fff', border: 'none', borderRadius: '8px',
                padding: '12px', fontSize: '15px', fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '4px', transition: 'background 0.15s'
              }}
            >
              {loading ? 'Please wait…' : tab === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setTab(tab === 'login' ? 'register' : 'login'); setError(''); }}
              style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              {tab === 'login' ? 'Register' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block', marginBottom: '6px', fontSize: '13px',
  fontWeight: 600, color: 'var(--text-primary)'
};

const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: '8px',
  border: '1px solid var(--border)', fontSize: '14px',
  color: 'var(--text-primary)', background: 'var(--bg-white)',
  outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.15s'
};

export default Login;