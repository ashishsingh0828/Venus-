import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, KeyRound, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import './Admin.css';

export default function AdminForgotPassword() {
  const [step, setStep] = useState(1); // 1 = request code, 2 = enter code & new password
  const [email, setEmail] = useState('admin@venushospitaldoors.com');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const navigate = useNavigate();

  // Step 1: Request Reset Code
  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to request reset code.');
      }

      setSuccessMsg(data.message);
      if (data.resetCode) {
        setGeneratedCode(data.resetCode);
        setCode(data.resetCode); // auto-fill for frictionless testing
      }
      setStep(2);
    } catch (err) {
      setError(err.message || 'Error sending request.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Reset Password with Code
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to reset password.');
      }

      setSuccessMsg('Password reset successfully! Redirecting to login in 2 seconds...');
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Password reset failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-auth-page">
      <div className="admin-auth-card">
        <div className="admin-auth-header">
          <div className="admin-brand-icon">
            <KeyRound size={36} color="#c98b2c" />
          </div>
          <h2>Reset Admin Password</h2>
          <p>
            {step === 1
              ? 'Enter your admin email to receive a password reset code'
              : 'Enter the verification code and your new password'}
          </p>
        </div>

        {error && <div className="admin-alert admin-alert-danger">{error}</div>}
        {successMsg && <div className="admin-alert admin-alert-success">{successMsg}</div>}

        {generatedCode && (
          <div className="admin-alert admin-alert-info">
            <strong>Verification Code:</strong> <code style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{generatedCode}</code>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>
              (Automatically generated for your session)
            </p>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleRequestCode} className="admin-form">
            <div className="admin-input-group">
              <label htmlFor="reset-email">Admin Email Address</label>
              <div className="admin-input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  id="reset-email"
                  type="email"
                  placeholder="admin@venushospitaldoors.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <button type="submit" className="admin-btn admin-btn-primary" disabled={isLoading}>
              {isLoading ? (
                <span>Generating code...</span>
              ) : (
                <>
                  <span>Send Reset Code</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="admin-form">
            <div className="admin-input-group">
              <label htmlFor="reset-code">6-Digit Verification Code</label>
              <div className="admin-input-wrapper">
                <KeyRound size={18} className="input-icon" />
                <input
                  id="reset-code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="admin-input-group">
              <label htmlFor="new-password">New Password</label>
              <div className="admin-input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimum 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="admin-input-group">
              <label htmlFor="confirm-password">Confirm New Password</label>
              <div className="admin-input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="admin-btn admin-btn-primary" disabled={isLoading}>
              {isLoading ? (
                <span>Updating password...</span>
              ) : (
                <>
                  <span>Set New Password</span>
                  <CheckCircle size={18} />
                </>
              )}
            </button>

            <button
              type="button"
              className="admin-btn admin-btn-outline"
              onClick={() => setStep(1)}
              style={{ marginTop: '8px' }}
            >
              Request a different code
            </button>
          </form>
        )}

        <div className="admin-auth-footer">
          <Link to="/admin/login" className="admin-link-secondary">
            &larr; Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
