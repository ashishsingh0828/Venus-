import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import './Admin.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed. Please check credentials.');
      }

      // Store token and user data
      localStorage.setItem('venus_admin_token', data.token);
      localStorage.setItem('venus_admin_user', JSON.stringify(data.admin));

      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Unable to connect to server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-auth-page">
      <div className="admin-auth-card">
        <div className="admin-auth-header">
          <div className="admin-brand-icon">
            <ShieldCheck size={36} color="#c98b2c" />
          </div>
          <h2>Venus Admin Portal</h2>
          <p>Sign in to manage dynamic services &amp; inquiries</p>
        </div>

        {error && <div className="admin-alert admin-alert-danger">{error}</div>}

        <form onSubmit={handleLogin} className="admin-form">
          <div className="admin-input-group">
            <label htmlFor="username">Username or Email</label>
            <div className="admin-input-wrapper">
              <User size={18} className="input-icon" />
              <input
                id="username"
                type="text"
                placeholder="admin or admin@venushospitaldoors.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          <div className="admin-input-group">
            <label htmlFor="password">Password</label>
            <div className="admin-input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="admin-form-meta">
            <Link to="/admin/forgot-password" className="admin-link">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="admin-btn admin-btn-primary" disabled={isLoading}>
            {isLoading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="admin-default-hint">
          <p>
            <strong>Default Credentials:</strong>
            <br />
            Username: <code>admin</code>
            <br />
            Password: <code>Admin@Venus2026</code>
          </p>
        </div>

        <div className="admin-auth-footer">
          <Link to="/" className="admin-link-secondary">
            &larr; Back to Venus Website
          </Link>
        </div>
      </div>
    </div>
  );
}
