import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../assets/auth.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      toast.error('Invalid email', { className: 'toast error' });
      return;
    }
    
    toast.success('Password reset link sent! Check your email.', { className: 'toast success' });
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Support Ticket Manager</h2>
        <p>Enter your email to reset your password</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
            {error && <p className="error">{error}</p>}
          </div>
          <button type="submit" className="submit-btn">Reset Password</button>
        </form>
        <p>
          <Link to="/login" className="forgot">Back to Login</Link>
        </p>
        <p>© 2025 Support Ticket Manager. All rights reserved.</p>
      </div>
    </div>
  );
}

export default ForgotPassword;