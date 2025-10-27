import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../assets/nav.css';
import { useAuth } from "../context/AuthContext";

function Nav() {
  const { auth, setAuth } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    setAuth(false);           
    localStorage.removeItem('ticketapp_session'); 
    navigate('/login');       
  };



  return (
    <nav className="nav">
      <div className="logo" onClick={() => navigate('/')}>
        TicketFlow
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
        <Link to="/tickets" className="nav-link" onClick={() => setIsMenuOpen(false)}>Tickets</Link>
        <Link to="/analytics" className="nav-link" onClick={() => setIsMenuOpen(false)}>Analytics</Link>

        {!auth && (
            <>
            <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>Login</Link>
            <Link to="/signup" className="nav-link get-started" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
            </>
        )}

        {auth && (
            <button className="nav-link logout-btn" onClick={handleLogout}>Logout</button>
        )}
   </div>
    </nav>
  );
}

export default Nav;
