import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../assets/authtabs.css';

function AuthTabs({ activeTab, onTabChange }) {
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    onTabChange(tab);
    if (tab === 'login') navigate('/login');
    if (tab === 'signup') navigate('/signup');
  };

  return (
    <div className="auth-tabs">
      <button
        className={activeTab === 'login' ? 'active' : ''}
        onClick={() => handleTabClick('login')}
      >
        Login
      </button>
      <button
        className={activeTab === 'signup' ? 'active' : ''}
        onClick={() => handleTabClick('signup')}
      >
        Signup
      </button>
    </div>
  );
}

AuthTabs.propTypes = {
  activeTab: PropTypes.oneOf(['login', 'signup']).isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default AuthTabs;