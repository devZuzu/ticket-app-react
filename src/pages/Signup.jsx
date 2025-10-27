import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Toast from '../components/Toast';
import AuthTabs from '../components/AuthTabs';
import '../assets/auth.css';
import Nav from '../components/Nav';

function Signup({ setAuth }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!username) errs.username = 'Username is required';
    if (!email.includes('@')) errs.email = 'Please enter a valid email address';
    if (password.length < 8) errs.password = 'Password must be at least 8 characters';
    if (password !== confirmPassword) errs.confirm = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      Toast({ message: 'Validation failed', type: 'error' }).showToast();
      return;
    }
  
    localStorage.setItem('ticketapp_session', 'mock_token');
    setAuth(true);
    Toast({ message: 'Registration successful! Please login.', type: 'success' }).showToast();
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <Nav />
      <div className="auth-card">
        <h2>Support Ticket Manager</h2>
        <p>Please signup to continue</p>
        <AuthTabs activeTab="signup" onTabChange={() => {}} />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" />
            {errors.confirm && <p className="error">{errors.confirm}</p>}
          </div>
          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
        <p>© 2025 Support Ticket Manager. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Signup;