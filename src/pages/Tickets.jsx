import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useTickets from '../hooks/useTickets';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import '../assets/tickets.css';

function Tickets() {
  const [tickets, setTickets] = useTickets();
  const [form, setForm] = useState({ id: null, title: '', description: '', technology: '', status: 'open', lastUpdated: '' });
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const validate = () => {
    const errs = {};
    if (!form.title || form.title.length < 3) errs.title = 'Title required (min 3 chars)';
    if (!['react', 'vue', 'twig'].includes(form.technology)) errs.technology = 'Select a technology';
    if (!['open', 'in_progress', 'closed'].includes(form.status)) errs.status = 'Invalid status';
    if (form.description && form.description.length > 500) errs.description = 'Description too long';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Validation failed', { className: 'toast error' });
      return;
    }
    const now = new Date().toLocaleString();
    let newTickets;
    if (editingId) {
      newTickets = tickets.map(t => t.id === editingId ? { ...form, id: editingId, lastUpdated: now } : t);
      toast.success('Ticket updated', { className: 'toast success' });
      setEditingId(null);
    } else {
      const newId = Math.floor(Math.random() * 100000);
      newTickets = [...tickets, { ...form, id: newId, lastUpdated: now }];
      toast.success('Ticket created', { className: 'toast success' });
    }
    setTickets(newTickets);
    setForm({ id: null, title: '', description: '', technology: '', status: 'open', lastUpdated: '' });
  };

  const edit = (ticket) => {
    setForm(ticket);
    setEditingId(ticket.id);
  };

  const del = (id) => {
    if (!window.confirm('Delete ticket?')) return;
    const newTickets = tickets.filter(t => t.id !== id);
    setTickets(newTickets);
    toast.success('Ticket deleted', { className: 'toast success' });
  };

  const filteredTickets = tickets.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === 'all' || t.status === statusFilter)
  );

  return (
    <div className="container">
      <nav className="ticket-nav">
        <div className="logo">Support</div>
        <Link to="/tickets" className="active">Tickets</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/settings">Settings</Link>
        <button className="new-ticket">New Ticket</button>
      </nav>
      <h1>Ticket Management</h1>
      <p>Create, read, update, and delete support tickets.</p>
      <div className="filters">
        <input className="search" placeholder="Search tickets..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="dropdown" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div className="ticket-layout">
        <div className="ticket-list">
          <h3>Existing Tickets</h3>
          {filteredTickets.map(t => (
            <div key={t.id} className="ticket-card">
              <div className="header">
                <span className={`status-tag ${t.status}`}>{t.status.replace('_', ' ').charAt(0).toUpperCase() + t.status.replace('_', ' ').slice(1)}</span>
                <div className="actions">
                  <FaPencilAlt onClick={() => edit(t)} />
                  <FaTrash onClick={() => del(t.id)} />
                </div>
              </div>
              <h3>{t.title}</h3>
              <p>{t.description}</p>
              <span className={`tech-tag tag ${t.technology}`}>{t.technology.toUpperCase()}</span>
            </div>
          ))}
        </div>
        <form className="create-form" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Edit Ticket' : 'Create New Ticket'}</h3>
          <div className="form-group">
            <label>Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" />
            {errors.description && <p className="error">{errors.description}</p>}
          </div>
          <div className="form-group">
            <label>Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            {errors.status && <p className="error">{errors.status}</p>}
          </div>
          <div className="form-group">
            <label>Frontend Technology</label>
            <select value={form.technology} onChange={(e) => setForm({ ...form, technology: e.target.value })}>
              <option value="">Select</option>
              <option value="react">React</option>
              <option value="vue">Vue</option>
              <option value="twig">Twig</option>
            </select>
            {errors.technology && <p className="error">{errors.technology}</p>}
          </div>
          <button type="submit" className="submit-btn">{editingId ? 'Update Ticket' : 'Create Ticket'}</button>
        </form>
      </div>
    </div>
  );
}

export default Tickets;