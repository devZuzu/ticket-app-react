import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import '../assets/toast.css';

function Toast({ message, type = 'info', duration = 3000 }) {
  const showToast = () => {
    toast[type](message, {
      position: 'top-right',
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: `toast ${type}`,
    });
  };

  return { showToast };
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  duration: PropTypes.number,
};

export default Toast;