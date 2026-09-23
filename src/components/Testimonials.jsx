import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, MessageSquarePlus, Quote, ThumbsUp, Send } from 'lucide-react';

export function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('Accra');
  const [rating, setRating] = useState(5);
  const [service, setService] = useState('Luxury Deep Cleaning');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!author || !comment) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, location, rating, service, comment })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Thank you! Your verified review has been published.');
        setAuthor('');
        setComment('');
        fetchReviews();
        setTimeout(() => {
          setShowReviewForm(false);
          setSuccessMsg('');
        }, 2000);
      }
    } catch (err) {
      console.error('Error posting review:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" style={{ padding: '6rem 0', background: 'var(--bg-surface)', position: 'relative' }}>
      <div className="container">
        
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '3.5rem'
        }}>
          <div>
            <span className="badge-gold" style={{ marginBottom: '0.75rem' }}>
              <Star size={14} fill="#f59e0b" color="#f59e0b" /> Verified Ghanaian Testimonials
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', letterSpacing: '-0.02em' }}>
              What Our Clients Say in Ghana
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.5rem' }}>
              Real feedback from homeowners, Airbnb hosts, and corporate office managers.
            </p>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="btn btn-secondary"
          >
            <MessageSquarePlus size={16} />
            <span>{showReviewForm ? 'Close Form' : 'Write a Review'}</span>
          </button>
        </div>

        {/* Review Submission Form Modal / Box */}
        {showReviewForm && (
          <div className="glass-panel-strong animate-fade-in" style={{
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            border: '2px solid var(--primary-light)',
            marginBottom: '3rem',
            maxWidth: '650px'
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1rem' }}>
              Leave Your AuraClean Review
            </h3>

            {successMsg ? (
              <div style={{ padding: '1rem', background: 'var(--primary-subtle)', color: 'var(--primary-light)', borderRadius: 'var(--radius-md)', fontWeight: '700' }}>
                ✓ {successMsg}
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem' }}>Your Name *</label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Kwame Mensah"
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem' }}>Location / Estate</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. East Legon, Accra"
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem' }}>Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    >
                      <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                      <option value="4">★★★★☆ (4 Stars - Very Good)</option>
                      <option value="3">★★★☆☆ (3 Stars - Good)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem' }}>Service Performed</label>
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      placeholder="e.g. Luxury Deep Cleaning"
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem' }}>Your Feedback & Experience *</label>
                  <textarea
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about the cleaner punctuality, thoroughness, and results..."
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                  />
                </div>

                <button type="submit" disabled={submitting} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  <Send size={16} />
                  <span>{submitting ? 'Publishing...' : 'Publish Verified Review'}</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Reviews Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel"
              style={{
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                {/* Rating Stars */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.2rem', color: '#f59e0b' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#f59e0b" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                </div>

                {/* Comment */}
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-primary)',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem'
                }}>
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Verification */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    {rev.author}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {rev.location}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.72rem',
                  color: '#16a34a',
                  fontWeight: '700',
                  background: 'var(--primary-subtle)',
                  padding: '0.25rem 0.55rem',
                  borderRadius: 'var(--radius-full)'
                }}>
                  <CheckCircle size={12} />
                  <span>Verified Clean</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
