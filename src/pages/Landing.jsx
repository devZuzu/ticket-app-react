import { Link } from 'react-router-dom';
import { FaThLarge, FaCode, FaChartBar, FaTwitter, FaWhatsapp, FaFacebookF, FaTiktok } from 'react-icons/fa';
import '../assets/Landing.css';

function Landing() {
  return (
    <div className="container">
      <header className="hero">
        <div className="decor-circle decor-circle-large"></div>
        <div className="decor-circle decor-circle-small"></div>

        <h1>TicketFlow</h1>
        <p>Effortlessly manage your support tickets across React, Vue.js, and Twig.</p>

        <Link to="/login" className="login-link">
          <button className="login" type="button">Login</button>
        </Link>

        <Link to="/signup" className="get-started-link">
          <button className="get-started" type="button">Get Started</button>
        </Link>

        <div className="wave"></div>
      </header>

      <section className="features">
        <h2>Key Features</h2>
        <p>Discover the powerful features that make TicketFlow your ultimate ticket management solution.</p>

        <div className="grid">
          <div className="box">
            <FaThLarge className="icon" />
            <h3>Unified Dashboard</h3>
            <p>See all your tickets in one place and track them effortlessly.</p>
          </div>

          <div className="box">
            <FaCode className="icon" />
            <h3>Seamless Integration</h3>
            <p>Easy setup with your React, Vue.js, and Twig applications.</p>
          </div>

          <div className="box">
            <FaChartBar className="icon" />
            <h3>Powerful Analytics</h3>
            <p>Track and analyze support metrics to improve performance.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="logo">TicketFlow</div>
        <div className="links">
          <a href="#">About</a>
          <a href="#">Pricing</a>
          <a href="#">Contact</a>
        </div>
        <div className="social">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
            <FaTiktok />
          </a>
        </div>
        <p>© 2025 TicketFlow. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;