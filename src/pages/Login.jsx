import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Toast from '../components/Toast';
import AuthTabs from '../components/AuthTabs';
import '../assets/auth.css';

function Login({ setAuth }) {
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('All fields required');
      Toast({ message: 'Invalid input', type: 'error' }).showToast();
      return;
    }
    if (email === 'admin@example.com' && password === 'password123') {
      localStorage.setItem('ticketapp_session', 'mock_token');
      setAuth(true);
      Toast({ message: 'Logged in!', type: 'success' }).showToast();
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
      Toast({ message: 'Login failed', type: 'error' }).showToast();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Support Ticket Manager</h2>
        <p>Please login or signup to continue</p>
        <AuthTabs activeTab={tab} onTabChange={setTab} />
        {tab === 'login' ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
              {error && <p className="error">{error}</p>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
              {error && <p className="error">{error}</p>}
            </div>
            <div className="checkbox">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Remember me
            </div>
            <Link to="/forgot" className="forgot">Forgot your password?</Link>
            <button type="submit" className="submit-btn">Log In</button>
          </form>
        ) : (
          <Link to="/signup">Sign up here</Link>
        )}
        <p>© 2025 Support Ticket Manager. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Login;