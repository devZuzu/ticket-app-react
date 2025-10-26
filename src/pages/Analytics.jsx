import { useEffect, useRef } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import useTickets from '../hooks/useTickets';
import { FaChartBar, FaEnvelopeOpen, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../assets/analytics.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

function Analytics() {
  const [tickets] = useTickets();

  
  const statusCounts = {
    open: tickets.filter(t => t.status === 'open').length,
    in_progress: tickets.filter(t => t.status === 'in_progress').length,
    closed: tickets.filter(t => t.status === 'closed').length,
  };

  const techCounts = {
    react: tickets.filter(t => t.technology === 'react').length,
    vue: tickets.filter(t => t.technology === 'vue').length,
    twig: tickets.filter(t => t.technology === 'twig').length,
  };

  
  const trends = {};
  tickets.forEach(t => {
    const date = new Date(t.lastUpdated).toLocaleDateString();
    trends[date] = (trends[date] || 0) + 1;
  });
  const trendLabels = Object.keys(trends).sort((a, b) => new Date(a) - new Date(b));
  const trendData = trendLabels.map(date => trends[date]);

  const pieData = {
    labels: ['Open', 'In Progress', 'Closed'],
    datasets: [{
      data: [statusCounts.open, statusCounts.in_progress, statusCounts.closed],
      backgroundColor: ['#4caf50', '#ffc107', '#9e9e9e'],
    }],
  };

  const barData = {
    labels: ['React', 'Vue', 'Twig'],
    datasets: [{
      label: 'Tickets per Technology',
      data: [techCounts.react, techCounts.vue, techCounts.twig],
      backgroundColor: ['#f50057', '#42b983', '#f7df1e'],
    }],
  };

  const lineData = {
    labels: trendLabels.length ? trendLabels : ['No Data'],
    datasets: [{
      label: 'Tickets Over Time',
      data: trendData.length ? trendData : [0],
      borderColor: '#007bff',
      tension: 0.1,
    }],
  };

  return (
    <div className="container">
      <nav className="nav">
        <div className="logo">SupportDesk</div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/tickets">Ticket Management</Link>
        <Link to="/analytics" className="active">Analytics</Link>
        <span className="welcome">Welcome, Alex</span>
        {/* Logout button can be added here if needed */}
      </nav>
      <h1>Analytics</h1>
      <p>Track and analyze support metrics to improve your customer service.</p>
      <div className="stats">
        <div className="stat-card">
          <FaChartBar className="icon" />
          <h4>Total Tickets</h4>
          <div className="number">{tickets.length.toLocaleString()}</div>
        </div>
        <div className="stat-card open">
          <FaEnvelopeOpen className="icon" />
          <h4>Open Tickets</h4>
          <div className="number">{statusCounts.open}</div>
        </div>
        <div className="stat-card resolved">
          <FaCheckCircle className="icon" />
          <h4>Resolved Tickets</h4>
          <div className="number">{statusCounts.closed.toLocaleString()}</div>
        </div>
      </div>
      <div className="charts">
        <div className="chart-card">
          <h3>Status Distribution</h3>
          <Pie data={pieData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>
        <div className="chart-card">
          <h3>Tickets per Technology</h3>
          <Bar data={barData} options={{ responsive: true }} />
        </div>
        <div className="chart-card">
          <h3>Ticket Trends</h3>
          <Line data={lineData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
}

export default Analytics;