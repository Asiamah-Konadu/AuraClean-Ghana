import React, { useState, useEffect } from 'react';
import { Shield, Users, DollarSign, Sparkles, CheckCircle2, Clock, Truck, RefreshCw, Search, Filter, Trash2, Edit, Plus, MessageSquare, MapPin, X } from 'lucide-react';
import { formatGHS } from '../utils/formatters';
import {
  fetchBookings,
  fetchDashboardStats,
  updateBookingStatus,
  deleteBooking,
  fetchCleaners,
} from '../firebase/firestoreService';

export function AdminDashboard({ onClose }) {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, [statusFilter, cityFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch stats from Firestore
      const statsData = await fetchDashboardStats();
      setStats(statsData);

      // Fetch bookings with filters from Firestore
      const bookingsData = await fetchBookings(statusFilter, cityFilter, searchQuery);
      setBookings(bookingsData);
    } catch (err) {
      console.error('Error fetching Firestore data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus, cleaner) => {
    setUpdatingId(id);
    try {
      await updateBookingStatus(id, newStatus, cleaner);
      fetchData();
    } catch (err) {
      console.error('Failed to update booking:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm(`Are you sure you want to delete booking ${id}?`)) return;
    try {
      await deleteBooking(id);
      fetchData();
    } catch (err) {
      console.error('Failed to delete booking:', err);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      padding: '2rem 0 5rem 0',
      position: 'relative',
      zIndex: 50
    }}>
      <div className="container">
        
        {/* Admin Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2.5rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <img
              src="/favicon.svg"
              alt="AuraClean Ghana"
              style={{
                width: '46px',
                height: '46px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 10px rgba(63, 169, 220, 0.4))'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: '800' }}>AuraClean Dispatch & Operations</h1>
                <span className="badge-gold">Ghana Operations Hub</span>
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Real-Time Booking Management • Cleaner Squad Dispatch • GH₵ Revenue Metrics
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={fetchData}
              className="btn btn-secondary"
              style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
            >
              <RefreshCw size={15} />
              <span>Refresh</span>
            </button>
            <button
              onClick={onClose}
              className="btn btn-primary"
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
            >
              <span>Exit Admin Portal</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          {[
            {
              title: 'Total Revenue',
              value: formatGHS(stats?.totalRevenueGHS || 2410),
              sub: 'Verified MoMo & Completed',
              icon: DollarSign,
              color: '#10b981'
            },
            {
              title: 'Active Cleans Today',
              value: stats?.activeCleans || 2,
              sub: 'Squads on site or en route',
              icon: Truck,
              color: '#3b82f6'
            },
            {
              title: 'Pending Confirmation',
              value: stats?.pendingConfirmation || 1,
              sub: 'Needs dispatch assignment',
              icon: Clock,
              color: '#f59e0b'
            },
            {
              title: 'Available Cleaners',
              value: `${stats?.availableCleaners || 15} Squads`,
              sub: 'Accra, Tema & Kumasi',
              icon: Users,
              color: '#8b5cf6'
            }
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)' }}>{card.title}</span>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'var(--primary-subtle)',
                    color: card.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={16} />
                  </div>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                  {card.value}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  {card.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters & Search Bar */}
        <div className="glass-panel" style={{
          padding: '1.25rem 1.5rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {/* Search Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexGrow: 1, maxWidth: '400px' }}>
            <Search size={18} color="var(--text-muted)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchData()}
              placeholder="Search by Code, Customer, Phone, or City..."
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.88rem'
              }}
            />
          </div>

          {/* Status & City Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
              <Filter size={15} color="var(--text-muted)" />
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '0.45rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.82rem'
                }}
              >
                <option value="all">All Statuses</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cleaner Dispatched">Cleaner Dispatched</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
              <span>City:</span>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                style={{
                  padding: '0.45rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.82rem'
                }}
              >
                <option value="all">All Cities</option>
                <option value="Accra">Greater Accra</option>
                <option value="Tema">Tema</option>
                <option value="Kumasi">Kumasi</option>
                <option value="Takoradi">Takoradi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Management Table */}
        <div className="glass-panel" style={{
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <th style={{ padding: '1rem', fontWeight: '700', color: 'var(--text-secondary)' }}>ID & Customer</th>
                  <th style={{ padding: '1rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Service & Area</th>
                  <th style={{ padding: '1rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Date & Slot</th>
                  <th style={{ padding: '1rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Amount & Payment</th>
                  <th style={{ padding: '1rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Assigned Squad</th>
                  <th style={{ padding: '1rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Status Dispatch</th>
                  <th style={{ padding: '1rem', fontWeight: '700', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      Loading AuraClean database...
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No bookings found matching current filter criteria.
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr
                      key={b.id}
                      style={{
                        borderBottom: '1px solid var(--border-subtle)',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      {/* ID & Customer */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: '800', color: 'var(--primary-light)' }}>{b.id}</div>
                        <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginTop: '0.15rem' }}>{b.customerName}</div>
                        <a href={`tel:${b.phone}`} style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textDecoration: 'underline' }}>
                          {b.phone}
                        </a>
                      </td>

                      {/* Service & Area */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: '700' }}>{b.serviceName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                          📍 {b.location} ({b.city})
                        </div>
                        {b.gpsAddress && (
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>GPS: {b.gpsAddress}</span>
                        )}
                      </td>

                      {/* Date & Slot */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: '600' }}>{b.date}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{b.timeSlot}</div>
                      </td>

                      {/* Amount & Payment */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: '800', color: 'var(--text-primary)' }}>{formatGHS(b.totalAmount)}</div>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: '600',
                          color: b.paymentStatus.toLowerCase().includes('paid') ? '#16a34a' : '#d97706'
                        }}>
                          {b.paymentStatus}
                        </span>
                      </td>

                      {/* Assigned Squad */}
                      <td style={{ padding: '1rem' }}>
                        <select
                          value={b.cleanerAssigned || 'Team Emerald (Lead: Sarah Addo)'}
                          onChange={(e) => handleUpdateStatus(b.id, b.status, e.target.value)}
                          style={{
                            padding: '0.4rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-subtle)',
                            background: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            fontSize: '0.78rem',
                            fontWeight: '600'
                          }}
                        >
                          <option value="Team Emerald (Lead: Sarah Addo)">Team Emerald (Accra)</option>
                          <option value="Team Gold (Lead: Emmanuel Darko)">Team Gold (Accra/Tema)</option>
                          <option value="Team Ashanti (Lead: Rita Asare)">Team Ashanti (Kumasi)</option>
                          <option value="Team Western (Lead: Jonathan Mensah)">Team Western (Takoradi)</option>
                        </select>
                      </td>

                      {/* Status Selector */}
                      <td style={{ padding: '1rem' }}>
                        <select
                          value={b.status}
                          disabled={updatingId === b.id}
                          onChange={(e) => handleUpdateStatus(b.id, e.target.value, b.cleanerAssigned)}
                          style={{
                            padding: '0.4rem 0.65rem',
                            borderRadius: 'var(--radius-sm)',
                            border: `1.5px solid ${b.status === 'Completed' ? '#16a34a' : b.status === 'In Progress' ? 'var(--primary-light)' : '#f59e0b'}`,
                            background: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            fontWeight: '700',
                            fontSize: '0.8rem'
                          }}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cleaner Dispatched">Cleaner Dispatched</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <a
                            href={`https://wa.me/233${b.phone.replace(/^0/, '')}?text=${encodeURIComponent(`Hello ${b.customerName}, this is AuraClean Ghana update regarding your booking ${b.id}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp"
                            style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                            title="Chat with Customer on WhatsApp"
                          >
                            <MessageSquare size={14} />
                          </a>
                          <button
                            onClick={() => handleDeleteBooking(b.id)}
                            style={{
                              padding: '0.35rem 0.65rem',
                              borderRadius: 'var(--radius-sm)',
                              background: '#fef2f2',
                              color: '#ef4444',
                              border: '1px solid #fee2e2'
                            }}
                            title="Delete booking"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
