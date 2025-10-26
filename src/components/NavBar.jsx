import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../assets/navbar.css';

function NavBar({ setAuth }) {
  const location = useLocation();
  const [welcome, setWelcome] = useState('Welcome, Alex');

  useEffect(() => {
    // Simulate fetching user name (replace with real auth data)
    const user = localStorage.getItem('ticketapp_user') || 'Alex';
    setWelcome(`Welcome, ${user}`);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ticketapp_session');
    localStorage.removeItem('tickets');
    setAuth(false);
    toast.info('Logged out', { className: 'toast' });
  };

  return (
    <nav className="nav">
      <div className="logo">SupportDesk</div>
      <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
      <Link to="/tickets" className={location.pathname === '/tickets' ? 'active' : ''}>Ticket Management</Link>
      <Link to="/analytics" className={location.pathname === '/analytics' ? 'active' : ''}>Analytics</Link>
      <span className="welcome">{welcome}</span>
      <button className="logout" onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default NavBar;