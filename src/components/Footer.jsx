import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import '../assets/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="logo">TicketFlow</div>
      <div className="links">
        <a href="#">About</a>
        <a href="#">Pricing</a>
        <a href="#">Contact</a>
      </div>
      <div className="social">
        <FaTwitter />
        <FaFacebook />
        <FaInstagram />
      </div>
      <p>© 2025 TicketFlow. All rights reserved.</p>
    </footer>
  );
}

export default Footer;