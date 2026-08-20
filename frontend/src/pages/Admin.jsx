import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fallback seed data in case Spring Boot backend is offline
  const seedInquiries = [
    { id: 1, fullName: 'Grace Hopper', email: 'hopper@compsci.edu', targetProgram: 'Bachelor of Science in Computer Science & AI', trackingId: 'MU-492716', submissionDate: '2026-08-20T08:15:30.000' },
    { id: 2, fullName: 'Ada Lovelace', email: 'ada@computing.org', targetProgram: 'Ph.D. Bio-Engineering & Genomics', trackingId: 'MU-928172', submissionDate: '2026-08-19T14:22:10.000' },
    { id: 3, fullName: 'Richard Feynman', email: 'feynman@caltech.edu', targetProgram: 'Master of Science in Cybersecurity Engineering', trackingId: 'MU-104829', submissionDate: '2026-08-18T10:04:45.000' }
  ];

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/admissions/inquiries');
      if (response.ok) {
        const data = await response.json();
        // Sort inquiries with newest first
        const sorted = data.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));
        setInquiries(sorted);
      } else {
        throw new Error('Failed to load inquiries');
      }
    } catch (err) {
      console.warn('Backend API connection failed, showing database seed inquiries:', err);
      setInquiries(seedInquiries);
    } finally {
      setLoading(false);
    }
  };

  const filteredInquiries = inquiries.filter(item => 
    item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.targetProgram.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: '120px 24px 60px 24px', minHeight: '80vh' }}>
      <div className="section-heading-block">
        <span className="section-tag">Administration</span>
        <h2 className="section-title">Admissions Enrollment Dashboard</h2>
        <p className="section-desc">Manage submitted student inquiry forms, evaluate degree level clusters, and review tracking indices from MySQL database.</p>
      </div>

      {/* Dashboard Stats */}
      <div className="stats-row" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', padding: '24px', borderRadius: '12px' }}>
          <span style={{ fontSize: '0.8rem', color: '#9f1239', fontWeight: 700, textTransform: 'uppercase' }}>Total Inquiries</span>
          <h3 style={{ fontSize: '2rem', color: '#881337', marginTop: '10px' }}>{inquiries.length}</h3>
        </div>
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '24px', borderRadius: '12px' }}>
          <span style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 700, textTransform: 'uppercase' }}>Computer Science & AI</span>
          <h3 style={{ fontSize: '2rem', color: '#15803d', marginTop: '10px' }}>
            {inquiries.filter(i => i.targetProgram.toLowerCase().includes('computer science')).length}
          </h3>
        </div>
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '24px', borderRadius: '12px' }}>
          <span style={{ fontSize: '0.8rem', color: '#1e40af', fontWeight: 700, textTransform: 'uppercase' }}>Bio-Engineering</span>
          <h3 style={{ fontSize: '2rem', color: '#1d4ed8', marginTop: '10px' }}>
            {inquiries.filter(i => i.targetProgram.toLowerCase().includes('bio-engineering')).length}
          </h3>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <input 
          type="text" 
          placeholder="Filter by name, email, program or tracking ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '12px 20px',
            width: '100%',
            maxWidth: '400px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            outline: 'none',
            fontSize: '0.9rem'
          }}
        />
        
        <button 
          onClick={fetchInquiries}
          style={{
            padding: '12px 24px',
            background: 'var(--dark-slate)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Refresh Database <i className="fa-solid fa-arrows-rotate" style={{ marginLeft: 8 }}></i>
        </button>
      </div>

      {/* Inquiries Table */}
      <div style={{ overflowX: 'auto', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--slate-muted)' }}>
            Retrieving inquiries from Spring Boot SQL database...
          </div>
        ) : filteredInquiries.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #cbd5e1' }}>
                <th style={{ padding: '16px 20px' }}>Tracking ID</th>
                <th style={{ padding: '16px 20px' }}>Applicant Name</th>
                <th style={{ padding: '16px 20px' }}>Email Address</th>
                <th style={{ padding: '16px 20px' }}>Target Program</th>
                <th style={{ padding: '16px 20px' }}>Submission Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0', transition: 'background 0.2s' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--primary)' }}>{item.trackingId}</td>
                  <td style={{ padding: '16px 20px', fontWeight: 600 }}>{item.fullName}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate-muted)' }}>{item.email}</td>
                  <td style={{ padding: '16px 20px' }}>{item.targetProgram}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--slate-muted)' }}>
                    {new Date(item.submissionDate).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--slate-muted)' }}>
            No candidate inquiry records found matching the query.
          </div>
        )}
      </div>
    </div>
  );
}
