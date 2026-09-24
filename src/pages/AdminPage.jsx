import React, { useState, useEffect } from 'react';
import {
  Shield, Users, DollarSign, Sparkles, CheckCircle2, Clock, Truck, RefreshCw,
  Search, Filter, Trash2, Edit, Plus, MessageSquare, MapPin, X, Lock, Key, LogOut,
  TrendingUp, BarChart3, AlertCircle, Phone, Calendar, Check, ExternalLink, Settings,
  Layers, Package, FileText, ArrowUpRight, ChevronRight, Download
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { formatGHS, DISPLAY_PHONE } from '../utils/formatters';
import { SERVICES_DATA, ADDONS_DATA } from '../data/servicesData';
import {
  fetchBookings,
  fetchDashboardStats,
  updateBookingStatus,
  updatePaymentStatus,
  deleteBooking,
  createBooking,
  fetchCleaners
} from '../firebase/firestoreService';

export function AdminPage() {
  const navigate = useNavigate();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('auraclean_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'bookings' | 'dispatch' | 'squads' | 'services' | 'customers' | 'logs'

  // Data State
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals & Drawers
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  // New Manual Booking Form State
  const [newBookingData, setNewBookingData] = useState({
    customerName: '',
    phone: '',
    email: '',
    serviceId: 'deep-clean',
    serviceName: 'Luxury Deep Cleaning',
    bedrooms: 2,
    bathrooms: 2,
    frequency: 'one-time',
    city: 'Accra East',
    location: 'East Legon',
    gpsAddress: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '09:00 AM - 12:00 PM',
    totalAmount: 540,
    paymentMethod: 'mtn_momo',
    notes: 'Phone booking taken by admin'
  });

  // System Activity Logs
  const [systemLogs, setSystemLogs] = useState([
    { id: 1, time: '10 mins ago', action: 'Cleaner Dispatched', details: 'Team Emerald assigned to AC26-HG72', user: 'Admin Sarah' },
    { id: 2, time: '25 mins ago', action: 'Payment Verified', details: 'GH₵ 480 via MTN MoMo for AC26-LM19', user: 'System' },
    { id: 3, time: '1 hour ago', action: 'New Booking Created', details: 'Post-Construction clean in Cantonments', user: 'Customer (Online)' },
    { id: 4, time: '3 hours ago', action: 'Service Completed', details: 'Upholstery clean in Airport Residential signed off', user: 'Lead Emmanuel' }
  ]);

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
    }
  }, [isAuthenticated, statusFilter, cityFilter]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const statsData = await fetchDashboardStats();
      setStats(statsData);

      const bookingsData = await fetchBookings(statusFilter, cityFilter, searchQuery);
      setBookings(bookingsData);

      const cleanersData = await fetchCleaners();
      setCleaners(cleanersData);
    } catch (err) {
      console.error('Error loading Firestore admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Support PIN '2026' or 'admin123' or '1234'
    if (pinInput === '2026' || pinInput === 'admin123' || pinInput === '1234' || pinInput === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('auraclean_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect Security Access Code. Try "2026" or "admin123"');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auraclean_admin_auth');
  };

  const handleUpdateStatus = async (id, newStatus, cleaner) => {
    setUpdatingId(id);
    try {
      await updateBookingStatus(id, newStatus, cleaner);
      
      // Add to system log
      setSystemLogs(prev => [
        {
          id: Date.now(),
          time: 'Just now',
          action: `Status Updated to ${newStatus}`,
          details: `Booking ${id} updated with squad ${cleaner || 'Standard'}`,
          user: 'Admin Staff'
        },
        ...prev
      ]);

      loadAdminData();
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleTogglePayment = async (id, currentPayment) => {
    const nextPayment = currentPayment === 'Paid (MoMo)' ? 'Pending Payment' : 'Paid (MoMo)';
    try {
      await updatePaymentStatus(id, nextPayment);
      loadAdminData();
    } catch (err) {
      console.error('Failed to update payment:', err);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm(`Are you sure you want to permanently delete booking ${id}?`)) return;
    try {
      await deleteBooking(id);
      loadAdminData();
    } catch (err) {
      console.error('Failed to delete booking:', err);
    }
  };

  const handleCreateManualBooking = async (e) => {
    e.preventDefault();
    try {
      await createBooking(newBookingData);
      setIsNewBookingModalOpen(false);
      loadAdminData();
      alert('Manual booking successfully registered in dispatch queue!');
    } catch (err) {
      console.error('Error creating manual booking:', err);
      alert('Failed to save booking.');
    }
  };

  // -------------------------------------------------------------
  // 1. AUTHENTICATION GATE SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #090d16 0%, #111827 100%)',
        padding: '1.5rem'
      }}>
        <div className="glass-panel" style={{
          maxWidth: '440px',
          width: '100%',
          padding: '2.5rem',
          background: 'rgba(17, 24, 39, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img
              src="/favicon.svg"
              alt="AuraClean Ghana"
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 1.25rem auto',
                display: 'block',
                filter: 'drop-shadow(0 8px 24px rgba(63, 169, 220, 0.5))'
              }}
            />
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.35rem' }}>
              AuraClean Operations Hub
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              Ghana Enterprise Dispatch & Back-Office Control
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                Enter Staff Access PIN / Passcode
              </label>
              <div style={{ position: 'relative' }}>
                <Key size={18} color="#94a3b8" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem' }} />
                <input
                  type="password"
                  required
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (e.g. 2026)"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem 0.85rem 2.75rem',
                    borderRadius: '12px',
                    border: '1px solid #374151',
                    background: '#1f2937',
                    color: '#ffffff',
                    fontSize: '1rem',
                    letterSpacing: '0.1em'
                  }}
                  autoFocus
                />
              </div>
              {authError && (
                <div style={{ fontSize: '0.78rem', color: '#f87171', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <AlertCircle size={14} />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary shimmer-btn"
              style={{ width: '100%', padding: '0.85rem', fontSize: '1rem' }}
            >
              <Lock size={16} />
              <span>Authenticate & Enter Portal</span>
            </button>

            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <Link to="/" style={{ fontSize: '0.82rem', color: '#94a3b8', textDecoration: 'underline' }}>
                ← Return to Customer Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. MAIN PROPER ADMIN PORTAL
  // -------------------------------------------------------------
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* Top Admin Bar */}
      <header style={{
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0.85rem 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 90
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
              src="/favicon.svg"
              alt="AuraClean Ghana"
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 8px rgba(63, 169, 220, 0.35))'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  AuraClean Operations Console
                </span>
                <span className="badge-gold" style={{ fontSize: '0.7rem', padding: '0.1rem 0.45rem' }}>Ghana Central</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Real-Time Dispatch • Squad Tracking • Firestore Active Connection
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setIsNewBookingModalOpen(true)}
              className="btn btn-primary"
              style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
            >
              <Plus size={15} />
              <span>Take Manual Booking</span>
            </button>

            <button
              onClick={loadAdminData}
              className="btn btn-secondary"
              style={{ padding: '0.55rem 0.9rem', fontSize: '0.85rem' }}
              title="Refresh Data"
            >
              <RefreshCw size={15} />
            </button>

            <Link
              to="/"
              className="btn btn-secondary"
              style={{ padding: '0.55rem 0.9rem', fontSize: '0.85rem' }}
            >
              <ExternalLink size={14} />
              <span>Customer Site</span>
            </Link>

            <button
              onClick={handleLogout}
              style={{
                padding: '0.55rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: '#fef2f2',
                color: '#dc2626',
                border: '1px solid #fee2e2',
                fontSize: '0.85rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              title="Sign Out"
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container Layout with Navigation Tabs */}
      <div className="container" style={{ padding: '1.5rem 1.5rem 5rem 1.5rem', flexGrow: 1 }}>
        
        {/* Navigation Tabs Bar */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '0.75rem',
          marginBottom: '2rem',
          overflowX: 'auto'
        }}>
          {[
            { id: 'overview', label: '📊 Dashboard Overview', count: null },
            { id: 'bookings', label: '📋 All Bookings CRM', count: bookings.length },
            { id: 'dispatch', label: '🚚 Dispatch & Live Status', count: bookings.filter(b => b.status === 'Cleaner Dispatched' || b.status === 'In Progress').length },
            { id: 'squads', label: '👥 Cleaner Squads', count: 4 },
            { id: 'services', label: '🛠️ Service Catalog & Rates', count: SERVICES_DATA.length },
            { id: 'logs', label: '📜 System Audit Logs', count: systemLogs.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.88rem',
                fontWeight: '700',
                background: activeTab === tab.id ? 'var(--primary)' : 'var(--bg-surface)',
                color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                border: `1px solid ${activeTab === tab.id ? 'var(--primary)' : 'var(--border-subtle)'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span style={{
                  fontSize: '0.72rem',
                  padding: '0.1rem 0.45rem',
                  borderRadius: '999px',
                  background: activeTab === tab.id ? 'rgba(255,255,255,0.25)' : 'var(--primary-subtle)',
                  color: activeTab === tab.id ? '#ffffff' : 'var(--primary-light)'
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW & KPIS */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            {/* KPI Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2.5rem'
            }}>
              {[
                {
                  title: 'Total Generated Revenue',
                  value: formatGHS(stats?.totalRevenueGHS || 2410),
                  sub: 'Verified MoMo, Telecel & Cash',
                  icon: DollarSign,
                  color: '#10b981'
                },
                {
                  title: 'Active Operations Today',
                  value: stats?.activeCleans || 2,
                  sub: 'Squads on site or en route',
                  icon: Truck,
                  color: '#3b82f6'
                },
                {
                  title: 'Pending Dispatch Confirmation',
                  value: stats?.pendingConfirmation || 1,
                  sub: 'Requires team assignment',
                  icon: Clock,
                  color: '#f59e0b'
                },
                {
                  title: 'Active Ghana Squads',
                  value: '4 Regional Units',
                  sub: 'Accra East, Tema, Kumasi, Takoradi',
                  icon: Users,
                  color: '#8b5cf6'
                }
              ].map((kpi, idx) => {
                const Icon = kpi.icon;
                return (
                  <div
                    key={idx}
                    className="glass-panel"
                    style={{
                      padding: '1.5rem',
                      background: 'var(--bg-surface)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-secondary)' }}>{kpi.title}</span>
                      <div style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        background: 'var(--primary-subtle)',
                        color: kpi.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={18} />
                      </div>
                    </div>
                    <div style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                      {kpi.value}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                      {kpi.sub}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Middle Section: Recent Bookings & Dispatch Radar */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr', gap: '1.5rem' }} className="admin-overview-grid">
              
              {/* Recent Bookings Quick Table */}
              <div className="glass-panel" style={{ padding: '1.75rem', background: 'var(--bg-surface)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    Recent Booking Stream
                  </h3>
                  <button onClick={() => setActiveTab('bookings')} style={{ color: 'var(--primary-light)', fontSize: '0.82rem', fontWeight: '700' }}>
                    View All →
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                        <th style={{ padding: '0.6rem 0' }}>Customer</th>
                        <th style={{ padding: '0.6rem 0' }}>Service</th>
                        <th style={{ padding: '0.6rem 0' }}>City</th>
                        <th style={{ padding: '0.6rem 0' }}>Amount</th>
                        <th style={{ padding: '0.6rem 0' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 5).map(b => (
                        <tr key={b.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <td style={{ padding: '0.75rem 0' }}>
                            <div style={{ fontWeight: '700' }}>{b.customerName}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{b.id}</div>
                          </td>
                          <td style={{ padding: '0.75rem 0' }}>{b.serviceName}</td>
                          <td style={{ padding: '0.75rem 0' }}>{b.city}</td>
                          <td style={{ padding: '0.75rem 0', fontWeight: '700' }}>{formatGHS(b.totalAmount)}</td>
                          <td style={{ padding: '0.75rem 0' }}>
                            <span style={{
                              padding: '0.2rem 0.55rem',
                              borderRadius: '4px',
                              fontSize: '0.72rem',
                              fontWeight: '700',
                              background: b.status === 'Completed' ? '#dcfce7' : b.status === 'In Progress' ? 'var(--primary-subtle)' : '#fef3c7',
                              color: b.status === 'Completed' ? '#15803d' : b.status === 'In Progress' ? 'var(--primary-light)' : '#b45309'
                            }}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Regional Dispatch Hubs & Capacity */}
              <div className="glass-panel" style={{ padding: '1.75rem', background: 'var(--bg-surface)' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                  Regional Squad Readiness
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { hub: 'Accra East (East Legon/Airport)', squad: 'Team Emerald', lead: 'Sarah Addo', status: 'Active (2 Cleans)', util: 80 },
                    { hub: 'Tema (Community 1-25)', squad: 'Team Gold', lead: 'Emmanuel Darko', status: 'Available for Dispatch', util: 35 },
                    { hub: 'Kumasi Hub (Ahodwo/Nhyiaeso)', squad: 'Team Ashanti', lead: 'Rita Asare', status: 'Active (1 Clean)', util: 60 },
                    { hub: 'Takoradi Hub (Beach Road)', squad: 'Team Western', lead: 'Jonathan Mensah', status: 'On Standby', util: 20 }
                  ].map((h, idx) => (
                    <div key={idx} style={{ padding: '0.85rem', background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                        <strong style={{ fontSize: '0.85rem' }}>{h.hub}</strong>
                        <span style={{ fontSize: '0.72rem', fontWeight: '700', color: h.util > 70 ? 'var(--primary-light)' : '#10b981' }}>
                          {h.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {h.squad} • Lead: {h.lead}
                      </div>
                      <div style={{ width: '100%', height: '5px', background: 'var(--border-subtle)', borderRadius: '4px', marginTop: '0.5rem', overflow: 'hidden' }}>
                        <div style={{ width: `${h.util}%`, height: '100%', background: 'var(--primary-light)' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2 & 3: BOOKINGS CRM & DISPATCH TABLE */}
        {(activeTab === 'bookings' || activeTab === 'dispatch') && (
          <div className="animate-fade-in">
            {/* Filter Bar */}
            <div className="glass-panel" style={{
              padding: '1.25rem 1.5rem',
              background: 'var(--bg-surface)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              {/* Search Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexGrow: 1, maxWidth: '400px' }}>
                <Search size={18} color="var(--text-muted)" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && loadAdminData()}
                  placeholder="Search by ID, Customer, Phone, or City..."
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
                    <option value="Cancelled">Cancelled</option>
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
                    <option value="all">All Ghana Hubs</option>
                    <option value="Accra East">Accra East</option>
                    <option value="Accra West">Accra West</option>
                    <option value="Tema">Tema</option>
                    <option value="Kumasi">Kumasi</option>
                    <option value="Takoradi">Takoradi</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="glass-panel" style={{
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface)',
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
                          Syncing with AuraClean Cloud Database...
                        </td>
                      </tr>
                    ) : bookings.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                          No bookings matching criteria found.
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
                            <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginTop: '0.15rem' }}>{b.customerName}</div>
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

                          {/* Amount & Payment Status */}
                          <td style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: '800', color: 'var(--text-primary)' }}>{formatGHS(b.totalAmount)}</div>
                            <button
                              onClick={() => handleTogglePayment(b.id, b.paymentStatus)}
                              title="Click to toggle payment status"
                              style={{
                                fontSize: '0.72rem',
                                fontWeight: '700',
                                padding: '0.15rem 0.45rem',
                                borderRadius: '4px',
                                background: b.paymentStatus.toLowerCase().includes('paid') ? '#dcfce7' : '#fef3c7',
                                color: b.paymentStatus.toLowerCase().includes('paid') ? '#166534' : '#b45309',
                                border: 'none',
                                marginTop: '0.2rem'
                              }}
                            >
                              {b.paymentStatus}
                            </button>
                          </td>

                          {/* Assigned Squad Selector */}
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
                              <option value="Team Gold (Lead: Emmanuel Darko)">Team Gold (Tema)</option>
                              <option value="Team Ashanti (Lead: Rita Asare)">Team Ashanti (Kumasi)</option>
                              <option value="Team Western (Lead: Jonathan Mensah)">Team Western (Takoradi)</option>
                            </select>
                          </td>

                          {/* Status Dispatch Selector */}
                          <td style={{ padding: '1rem' }}>
                            <select
                              value={b.status}
                              disabled={updatingId === b.id}
                              onChange={(e) => handleUpdateStatus(b.id, e.target.value, b.cleanerAssigned)}
                              style={{
                                padding: '0.45rem 0.7rem',
                                borderRadius: 'var(--radius-sm)',
                                border: `1.5px solid ${b.status === 'Completed' ? '#16a34a' : b.status === 'In Progress' ? 'var(--primary-light)' : '#f59e0b'}`,
                                background: 'var(--bg-primary)',
                                color: 'var(--text-primary)',
                                fontWeight: '800',
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
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                              <a
                                href={`https://wa.me/233${b.phone.replace(/^0/, '')}?text=${encodeURIComponent(`Hello ${b.customerName}, this is AuraClean Ghana update regarding your booking ${b.id}. Current Status: ${b.status}.`)}`}
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
        )}

        {/* TAB 4: CLEANER SQUADS */}
        {activeTab === 'squads' && (
          <div className="animate-fade-in">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                { name: 'Team Emerald', region: 'Greater Accra (East Legon, Cantonments, Airport)', lead: 'Sarah Addo', phone: '054 991 2231', size: '4 Cleaners', rating: '4.99★' },
                { name: 'Team Gold', region: 'Tema Community 1-25 & Spintex Corridor', lead: 'Emmanuel Darko', phone: '055 882 1199', size: '3 Cleaners', rating: '4.95★' },
                { name: 'Team Ashanti', region: 'Kumasi (Ahodwo, Nhyiaeso, Asokwa, Ridge)', lead: 'Rita Asare', phone: '024 331 4455', size: '4 Cleaners', rating: '4.98★' },
                { name: 'Team Western', region: 'Takoradi (Beach Road, Anaji, Airport Ridge)', lead: 'Jonathan Mensah', phone: '050 112 3344', size: '3 Cleaners', rating: '4.92★' }
              ].map((sq, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '1.75rem', background: 'var(--bg-surface)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-light)' }}>{sq.name}</h3>
                    <span className="badge-gold" style={{ fontSize: '0.75rem' }}>{sq.rating}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    📍 {sq.region}
                  </p>
                  <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
                    <div>Team Lead: <strong>{sq.lead}</strong></div>
                    <div>Phone: <a href={`tel:${sq.phone}`} style={{ textDecoration: 'underline' }}>{sq.phone}</a></div>
                    <div>Roster: <strong>{sq.size}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SERVICE CATALOG & RATES */}
        {activeTab === 'services' && (
          <div className="animate-fade-in">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem'
            }}>
              {SERVICES_DATA.map((s) => (
                <div key={s.id} className="glass-panel" style={{ padding: '1.75rem', background: 'var(--bg-surface)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: '800' }}>{s.name}</h4>
                    <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary-light)' }}>{formatGHS(s.basePrice)}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{s.tagline}</p>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Duration: {s.duration} • Recommended: {s.recommended}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SYSTEM AUDIT LOGS */}
        {activeTab === 'logs' && (
          <div className="animate-fade-in">
            <div className="glass-panel" style={{ padding: '2rem', background: 'var(--bg-surface)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.5rem' }}>
                System Activity & Dispatch Trail
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {systemLogs.map((log) => (
                  <div key={log.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-light)', marginTop: '6px' }}></div>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{log.action}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{log.time}</span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{log.details}</p>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Initiated by: {log.user}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL: TAKE MANUAL BOOKING */}
      {isNewBookingModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '650px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>Register Phone / Offline Booking</h3>
              <button onClick={() => setIsNewBookingModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateManualBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', display: 'block', marginBottom: '0.3rem' }}>Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={newBookingData.customerName}
                    onChange={(e) => setNewBookingData({ ...newBookingData, customerName: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', display: 'block', marginBottom: '0.3rem' }}>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newBookingData.phone}
                    onChange={(e) => setNewBookingData({ ...newBookingData, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', display: 'block', marginBottom: '0.3rem' }}>Service Package</label>
                  <select
                    value={newBookingData.serviceId}
                    onChange={(e) => {
                      const s = SERVICES_DATA.find(x => x.id === e.target.value);
                      setNewBookingData({ ...newBookingData, serviceId: e.target.value, serviceName: s?.name || '', totalAmount: s?.basePrice || 480 });
                    }}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)' }}
                  >
                    {SERVICES_DATA.map(s => <option key={s.id} value={s.id}>{s.name} ({formatGHS(s.basePrice)})</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', display: 'block', marginBottom: '0.3rem' }}>City / Region</label>
                  <select
                    value={newBookingData.city}
                    onChange={(e) => setNewBookingData({ ...newBookingData, city: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)' }}
                  >
                    <option value="Accra East">Accra East</option>
                    <option value="Accra West">Accra West</option>
                    <option value="Tema">Tema</option>
                    <option value="Kumasi">Kumasi</option>
                    <option value="Takoradi">Takoradi</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', display: 'block', marginBottom: '0.3rem' }}>Specific Location / Landmark</label>
                  <input
                    type="text"
                    required
                    value={newBookingData.location}
                    onChange={(e) => setNewBookingData({ ...newBookingData, location: e.target.value })}
                    placeholder="e.g. East Legon, near ANC Mall"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', display: 'block', marginBottom: '0.3rem' }}>Total Amount (GH₵)</label>
                  <input
                    type="number"
                    required
                    value={newBookingData.totalAmount}
                    onChange={(e) => setNewBookingData({ ...newBookingData, totalAmount: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary shimmer-btn"
                style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
              >
                <span>Save to Active Dispatch Queue</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Inline styles for responsive layout */}
      <style>{`
        @media (max-width: 991px) {
          .admin-overview-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
