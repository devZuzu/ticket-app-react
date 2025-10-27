import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useTickets from '../hooks/useTickets';
import { FaChartBar, FaEnvelopeOpen, FaCheckCircle } from 'react-icons/fa';
import '../assets/dashboard.css';
import Nav from '../components/Nav';


function Dashboard({ setAuth }) {
  const [tickets] = useTickets();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('ticketapp_session');
    localStorage.removeItem('tickets');
    setAuth(false);
    toast.info('Logged out', { className: 'toast' });
    navigate('/');
  };

  const total = tickets.length;
  const open = tickets.filter(t => t.status === 'open').length;
  const resolved = tickets.filter(t => t.status === 'closed').length;
  const recent = tickets.slice(-4).reverse(); 

  return (
   
    <div className="container">
      <Nav />

      {/* <nav className="nav">
        <div className="logo">SupportDesk</div>
        <Link to="/dashboard" className="active">Dashboard</Link>
        <Link to="/tickets">Ticket Management</Link>
        <Link to="/analytics">Analytics</Link>
        <span className="welcome">Welcome, Alex</span>
        <button className="logout" onClick={logout}>Logout</button>
      </nav> */}

      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="logout" onClick={logout}>Logout</button>
      </div>
      
      <div className="stats">
        <div className="stat-card">
          <FaChartBar className="icon" />
          <h4>Total Tickets</h4>
          <div className="number">{total.toLocaleString()}</div>
        </div>
        <div className="stat-card open">
          <FaEnvelopeOpen className="icon" />
          <h4>Open Tickets</h4>
          <div className="number">{open}</div>
        </div>
        <div className="stat-card resolved">
          <FaCheckCircle className="icon" />
          <h4>Resolved Tickets</h4>
          <div className="number">{resolved.toLocaleString()}</div>
        </div>
      </div>
      <h3>Recent Tickets</h3>
      <table className="table">
        <thead>
          <tr>
            <th>TICKET ID</th>
            <th>SUBJECT</th>
            <th>TECHNOLOGY</th>
            <th>STATUS</th>
            <th>LAST UPDATED</th>
          </tr>
        </thead>
        <tbody>
          {recent.map(t => (
            <tr key={t.id}>
              <td>#{t.id}</td>
              <td>{t.title}</td>
              <td><span className={`tag ${t.technology}`}>{t.technology.charAt(0).toUpperCase() + t.technology.slice(1)}</span></td>
              <td><span className={`status-tag ${t.status}`}>{t.status.replace('_', ' ').charAt(0).toUpperCase() + t.status.replace('_', ' ').slice(1)}</span></td>
              <td>{t.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="view-all"><Link to="/tickets">View All Tickets</Link></div>
    </div>
  );
}

export default Dashboard;