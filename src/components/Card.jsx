import PropTypes from 'prop-types';
import '../assets/card.css';

function Card({ title, children, className = '', icon }) {
  return (
    <div className={`card ${className}`}>
      {icon && <span className="card-icon">{icon}</span>}
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">{children}</div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  icon: PropTypes.element,
};

export default Card;