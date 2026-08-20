import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('modern-university'); // 'modern-university', 'college', 'myschool'
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fallback seed data in case Spring Boot backend is offline
  const seedModernUniversity = [
    { id: 1, fullName: 'Grace Hopper', email: 'hopper@compsci.edu', targetProgram: 'Bachelor of Science in Computer Science & AI', trackingId: 'MU-492716', submissionDate: '2026-08-20T08:15:30.000' },
    { id: 2, fullName: 'Ada Lovelace', email: 'ada@computing.org', targetProgram: 'Ph.D. Bio-Engineering & Genomics', trackingId: 'MU-928172', submissionDate: '2026-08-19T14:22:10.000' }
  ];

  const seedCollege = [
    { id: 1, studentName: 'Alan Turing', email: 'turing@decryption.org', intendedMajor: 'Computer Science & Engineering', trackingId: 'CLG-382910', submissionDate: '2026-08-20T09:02:15.000' },
    { id: 2, studentName: 'Margaret Hamilton', email: 'hamilton@apollo.gov', intendedMajor: 'Bio-Genomics & CRISPR Science', trackingId: 'CLG-194827', submissionDate: '2026-08-18T11:42:00.000' }
  ];

  const seedMySchool = [
    { id: 1, parentName: 'Charles Babbage', childName: 'Edward Babbage', email: 'babbage@difference.com', targetGrade: 'Grade 3', message: 'Inquiring about math acceleration seats.', submissionDate: '2026-08-19T10:14:00.000' }
  ];

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setSearchTerm('');
    
    let url = 'http://localhost:8080/api/admissions/inquiries';
    if (activeTab === 'college') {
      url = 'http://localhost:8080/api/college/applications';
    } else if (activeTab === 'myschool') {
      url = 'http://localhost:8080/api/myschool/inquiries';
    }

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        // Sort newest first
        const sorted = data.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));
        setInquiries(sorted);
      } else {
        throw new Error('Server offline');
      }
    } catch (err) {
      console.warn(`Connection failed to endpoint: ${url}, showing simulated database:`, err);
      if (activeTab === 'modern-university') {
        setInquiries(seedModernUniversity);
      } else if (activeTab === 'college') {
        setInquiries(seedCollege);
      } else {
        setInquiries(seedMySchool);
      }
    } finally {
      setLoading(false);
    }
  };

  const getFilteredData = () => {
    return inquiries.filter(item => {
      const term = searchTerm.toLowerCase();
      if (activeTab === 'modern-university') {
        return item.fullName.toLowerCase().includes(term) ||
               item.email.toLowerCase().includes(term) ||
               item.trackingId.toLowerCase().includes(term) ||
               item.targetProgram.toLowerCase().includes(term);
      } else if (activeTab === 'college') {
        return item.studentName.toLowerCase().includes(term) ||
               item.email.toLowerCase().includes(term) ||
               item.trackingId.toLowerCase().includes(term) ||
               item.intendedMajor.toLowerCase().includes(term);
      } else {
        return item.parentName.toLowerCase().includes(term) ||
               item.childName.toLowerCase().includes(term) ||
               item.email.toLowerCase().includes(term) ||
               item.targetGrade.toLowerCase().includes(term);
      }
    });
  };

  const filteredInquiries = getFilteredData();

  return (
    <div className="container" style={{ padding: '40px 24px', minHeight: '80vh', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20, marginBottom: 40 }}>
        <div>
          <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5 }}>Multi-Portal Admin Console</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: '5px 0' }}>Admissions Enrollment Dashboard</h2>
        </div>
        
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="/" style={{ padding: '8px 16px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#334155', fontWeight: 600, textDecoration: 'none', fontSize: '0.85rem' }}>Back to University</a>
          <a href="/college" style={{ padding: '8px 16px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#334155', fontWeight: 600, textDecoration: 'none', fontSize: '0.85rem' }}>College Portal</a>
          <a href="/myschool" style={{ padding: '8px 16px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#334155', fontWeight: 600, textDecoration: 'none', fontSize: '0.85rem' }}>MySchool Portal</a>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: 30, gap: 10 }}>
        <button 
          onClick={() => setActiveTab('modern-university')}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: 'none',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            borderBottom: activeTab === 'modern-university' ? '3px solid #881337' : 'none',
            color: activeTab === 'modern-university' ? '#881337' : '#64748b'
          }}
        >
          Modern University Admissions
        </button>
        <button 
          onClick={() => setActiveTab('college')}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: 'none',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            borderBottom: activeTab === 'college' ? '3px solid #002f6c' : 'none',
            color: activeTab === 'college' ? '#002f6c' : '#64748b'
          }}
        >
          College Applications
        </button>
        <button 
          onClick={() => setActiveTab('myschool')}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: 'none',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            borderBottom: activeTab === 'myschool' ? '3px solid #ca8a04' : 'none',
            color: activeTab === 'myschool' ? '#ca8a04' : '#64748b'
          }}
        >
          MySchool Inquiries
        </button>
      </div>

      {/* Controls Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20, marginBottom: 20 }}>
        <input 
          type="text" 
          placeholder="Filter candidate details..."
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
          onClick={fetchData}
          style={{
            padding: '12px 24px',
            background: '#0f172a',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Refresh Console
        </button>
      </div>

      {/* Data Table */}
      <div style={{ overflowX: 'auto', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            Querying MySQL admissions database...
          </div>
        ) : filteredInquiries.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #cbd5e1' }}>
                {activeTab === 'modern-university' && (
                  <>
                    <th style={{ padding: '16px 20px' }}>Tracking ID</th>
                    <th style={{ padding: '16px 20px' }}>Applicant Name</th>
                    <th style={{ padding: '16px 20px' }}>Email Address</th>
                    <th style={{ padding: '16px 20px' }}>Target Program</th>
                    <th style={{ padding: '16px 20px' }}>Submission Date</th>
                  </>
                )}
                {activeTab === 'college' && (
                  <>
                    <th style={{ padding: '16px 20px' }}>Tracking ID</th>
                    <th style={{ padding: '16px 20px' }}>Student Name</th>
                    <th style={{ padding: '16px 20px' }}>Email Address</th>
                    <th style={{ padding: '16px 20px' }}>Intended Major</th>
                    <th style={{ padding: '16px 20px' }}>Submission Date</th>
                  </>
                )}
                {activeTab === 'myschool' && (
                  <>
                    <th style={{ padding: '16px 20px' }}>Parent Name</th>
                    <th style={{ padding: '16px 20px' }}>Child Name</th>
                    <th style={{ padding: '16px 20px' }}>Email Address</th>
                    <th style={{ padding: '16px 20px' }}>Target Grade</th>
                    <th style={{ padding: '16px 20px' }}>Message Details</th>
                    <th style={{ padding: '16px 20px' }}>Date</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  {activeTab === 'modern-university' && (
                    <>
                      <td style={{ padding: '16px 20px', fontWeight: 700, color: '#881337' }}>{item.trackingId}</td>
                      <td style={{ padding: '16px 20px', fontWeight: 600 }}>{item.fullName}</td>
                      <td style={{ padding: '16px 20px', color: '#64748b' }}>{item.email}</td>
                      <td style={{ padding: '16px 20px' }}>{item.targetProgram}</td>
                      <td style={{ padding: '16px 20px', color: '#64748b' }}>{new Date(item.submissionDate).toLocaleString()}</td>
                    </>
                  )}
                  {activeTab === 'college' && (
                    <>
                      <td style={{ padding: '16px 20px', fontWeight: 700, color: '#002f6c' }}>{item.trackingId}</td>
                      <td style={{ padding: '16px 20px', fontWeight: 600 }}>{item.studentName}</td>
                      <td style={{ padding: '16px 20px', color: '#64748b' }}>{item.email}</td>
                      <td style={{ padding: '16px 20px' }}>{item.intendedMajor}</td>
                      <td style={{ padding: '16px 20px', color: '#64748b' }}>{new Date(item.submissionDate).toLocaleString()}</td>
                    </>
                  )}
                  {activeTab === 'myschool' && (
                    <>
                      <td style={{ padding: '16px 20px', fontWeight: 600 }}>{item.parentName}</td>
                      <td style={{ padding: '16px 20px', fontWeight: 600 }}>{item.childName}</td>
                      <td style={{ padding: '16px 20px', color: '#64748b' }}>{item.email}</td>
                      <td style={{ padding: '16px 20px', fontWeight: 700, color: '#ca8a04' }}>{item.targetGrade}</td>
                      <td style={{ padding: '16px 20px' }}>{item.message}</td>
                      <td style={{ padding: '16px 20px', color: '#64748b' }}>{new Date(item.submissionDate).toLocaleString()}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            No candidate applications or inquiries found.
          </div>
        )}
      </div>
    </div>
  );
}
