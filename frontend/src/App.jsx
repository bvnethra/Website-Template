import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User as UserIcon, LogOut, Layout, Settings, Compass, HelpCircle, Bell, Heart } from 'lucide-react';
import { api } from './services/api';
import Home from './pages/Home';
import Templates from './pages/Templates';
import TemplateDetails from './pages/TemplateDetails';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import HotelTemplate from './pages/HotelTemplate';
import PhotographyCatalog from './pages/PhotographyCatalog';

function Header({ cartCount, user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/templates?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      margin: 0,
      padding: '16px 40px',
      borderRadius: 0,
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.jpg" alt="TechnoSprint Templates Logo" style={{ height: '35px', borderRadius: '4px' }} />
        </Link>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search templates, e.g. 'SaaS landing page'"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '10px 18px',
              width: '320px',
              borderRadius: '99px',
              border: '1px solid #e2e8f0',
              fontSize: '0.85rem',
              outline: 'none',
              background: '#f8fafc'
            }}
          />
          <button type="submit" style={{ display: 'none' }} />
        </form>
      </div>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div className="nav-item-templates">
          <Link to="/templates" style={{
            fontSize: '0.9rem',
            fontWeight: 600,
            color: location.pathname === '/templates' ? 'var(--primary-color)' : 'var(--text-muted)',
            borderBottom: location.pathname === '/templates' ? '2px solid var(--primary-color)' : 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '6px 0'
          }}>
            Templates <span style={{ fontSize: '0.75rem' }}>▼</span>
          </Link>
          <div className="templates-dropdown">
            <div className="dropdown-column">
              <Link to="/templates?category=admin" className="dropdown-link">› Admin</Link>
              <Link to="/templates?category=medical" className="dropdown-link">› Medical</Link>
              <Link to="/templates?category=block-magazine" className="dropdown-link">› Block magazine</Link>
              <Link to="/templates?category=comming-soon" className="dropdown-link">› Comming soon</Link>
              <Link to="/templates?category=travels" className="dropdown-link">› Travels</Link>
              <Link to="/templates?category=hotel" className="dropdown-link">› Hotel</Link>
            </div>
            <div className="dropdown-column">
              <Link to="/templates?category=events" className="dropdown-link">› Events</Link>
              <Link to="/templates/photography" className="dropdown-link">› Photography</Link>
              <Link to="/templates?category=construction" className="dropdown-link">› Construction</Link>
              <Link to="/templates?category=education" className="dropdown-link">› Education</Link>
              <Link to="/templates?category=restaurant" className="dropdown-link">› Restaurant</Link>
              <Link to="/templates?category=ecommerce" className="dropdown-link">› Ecommerce</Link>
            </div>
            <div className="dropdown-column">
              <Link to="/templates?category=buisness" className="dropdown-link">› Buisness</Link>
              <Link to="/templates?category=onepage" className="dropdown-link">› onepage</Link>
              <Link to="/templates?category=landing-page" className="dropdown-link">› landing page</Link>
              <Link to="/templates?category=cooperate" className="dropdown-link">› cooperate</Link>
              <Link to="/templates?category=agency" className="dropdown-link">› agency</Link>
              <Link to="/templates?category=portfolio" className="dropdown-link">› portfolio</Link>
            </div>
          </div>
        </div>
        <Link to="/templates?type=PREMIUM" style={{
          fontSize: '0.9rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          padding: '6px 0'
        }}>
          Premium
        </Link>
        <Link to="/dashboard" style={{
          fontSize: '0.9rem',
          fontWeight: 600,
          color: location.pathname === '/dashboard' ? 'var(--primary-color)' : 'var(--text-muted)',
          padding: '6px 0'
        }}>
          Support
        </Link>
        <a href="#footer" onClick={(e) => { e.preventDefault(); document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' }); }} style={{
          fontSize: '0.9rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          padding: '6px 0'
        }}>
          Contact
        </a>

        {/* Action icons */}
        <Link to="/dashboard?tab=favorites" style={{ color: 'var(--text-muted)' }}>
          <Heart size={20} />
        </Link>
        <div style={{ color: 'var(--text-muted)', cursor: 'pointer', position: 'relative' }}>
          <Bell size={20} />
          <span style={{
            position: 'absolute',
            top: -2,
            right: -2,
            background: '#ff3b30',
            width: 6,
            height: 6,
            borderRadius: '50%'
          }} />
        </div>



        {user ? (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: 0
              }}
            >
              <div style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: 'var(--primary-gradient)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
            </button>
            {dropdownOpen && (
              <div className="glass-panel" style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                marginTop: 10,
                width: 200,
                padding: '8px 0',
                borderRadius: '12px',
                background: 'white',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}>
                <Link to="/dashboard" onClick={() => setDropdownOpen(false)} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 16px',
                  fontSize: '0.85rem',
                  color: 'var(--text-main)'
                }}>
                  <UserIcon size={16} /> My Dashboard
                </Link>
                {user.role === 'ROLE_ADMIN' && (
                  <Link to="/admin" onClick={() => setDropdownOpen(false)} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 16px',
                    fontSize: '0.85rem',
                    color: 'var(--text-main)'
                  }}>
                    <Settings size={16} /> Admin Console
                  </Link>
                )}
                <div style={{ height: '1px', background: '#f1f5f9', margin: '4px 0' }} />
                <button onClick={() => { setDropdownOpen(false); onLogout(); }} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: '10px 16px',
                  fontSize: '0.85rem',
                  textAlign: 'left',
                  color: '#ef4444',
                  cursor: 'pointer'
                }}>
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/auth" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer id="footer" style={{
      background: 'var(--secondary-color)',
      color: 'white',
      padding: '60px 40px 30px 40px',
      marginTop: 80,
      borderTopLeftRadius: '30px',
      borderTopRightRadius: '30px'
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 40,
        marginBottom: 50
      }}>
        <div>
          <img src="/logo.jpg" alt="TechnoSprint Templates" style={{ height: 35, marginBottom: 20, filter: 'brightness(0) invert(1)', borderRadius: '4px' }} />
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.6' }}>
            175+ premium HTML, CSS, React, and Bootstrap templates crafted for modern developers, agencies, and online creators.
          </p>
        </div>
        <div>
          <h4 style={{ color: 'white', marginBottom: 20, fontSize: '1rem' }}>Browse</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.85rem' }}>
            <li><Link to="/templates" style={{ color: '#cbd5e1' }}>All Templates</Link></li>
            <li><Link to="/templates?type=FREE" style={{ color: '#cbd5e1' }}>Free Templates</Link></li>
            <li><Link to="/templates?type=PREMIUM" style={{ color: '#cbd5e1' }}>Premium Templates</Link></li>
            <li><Link to="/builder" style={{ color: '#cbd5e1' }}>Online Customizer</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: 'white', marginBottom: 20, fontSize: '1rem' }}>Support & Service</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.85rem' }}>
            <li><a href="#" style={{ color: '#cbd5e1' }}>Documentation</a></li>
            <li><a href="#" style={{ color: '#cbd5e1' }}>Template Licensing</a></li>
            <li><a href="#" style={{ color: '#cbd5e1' }}>Contact Helpdesk</a></li>
            <li><a href="#" style={{ color: '#cbd5e1' }}>Refund Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: 'white', marginBottom: 20, fontSize: '1rem' }}>Company</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.85rem' }}>
            <li><a href="#" style={{ color: '#cbd5e1' }}>About Us</a></li>
            <li><a href="#" style={{ color: '#cbd5e1' }}>Careers</a></li>
            <li><a href="#" style={{ color: '#cbd5e1' }}>Terms of Service</a></li>
            <li><a href="#" style={{ color: '#cbd5e1' }}>Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        paddingTop: 30,
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'between',
        flexWrap: 'wrap',
        gap: 20,
        fontSize: '0.8rem',
        color: '#94a3b8'
      }}>
        <span>&copy; {new Date().getFullYear()} TechnoSprint Templates. All Rights Reserved.</span>
        <span>Built with React + Spring Boot + MySQL + PHP contact forms.</span>
      </div>
    </footer>
  );
}

function AppRoutes({ user, cart, addToCart, removeFromCart, clearCart, handleLogin, handleLogout }) {
  const location = useLocation();
  const isHotelTemplate = location.pathname === '/hotel-template';

  // Hotel template renders full-screen with its own nav/footer
  if (isHotelTemplate) {
    return (
      <Routes>
        <Route path="/hotel-template" element={<HotelTemplate />} />
      </Routes>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header cartCount={cart.length} user={user} onLogout={handleLogout} />
      
      <main style={{ flex: 1, maxWidth: 1300, width: '100%', margin: '0 auto', padding: '0 20px' }}>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} cart={cart} />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/photography" element={<PhotographyCatalog />} />
          <Route path="/templates/:slug" element={<TemplateDetails addToCart={addToCart} cart={cart} />} />
          <Route path="/dashboard" element={<Dashboard user={user} cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
          <Route path="/builder" element={<Builder user={user} />} />
          <Route path="/admin" element={<Admin user={user} />} />
          <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

function MainApp() {
  const [user, setUser] = useState(api.getCurrentUser());
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setUser(api.getCurrentUser());
    const savedCart = localStorage.getItem('ts_cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { setCart([]); }
    }
  }, []);

  const handleLogin = (userInfo) => setUser(userInfo);

  const handleLogout = () => {
    api.logout().then(() => {
      setUser(null);
      window.location.href = '/';
    });
  };

  const addToCart = (template) => {
    if (cart.find(item => item.id === template.id)) { alert('Template is already in your cart!'); return; }
    const updatedCart = [...cart, template];
    setCart(updatedCart);
    localStorage.setItem('ts_cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (templateId) => {
    const updatedCart = cart.filter(item => item.id !== templateId);
    setCart(updatedCart);
    localStorage.setItem('ts_cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('ts_cart');
  };

  return (
    <Router>
      <AppRoutes
        user={user}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    </Router>
  );
}

export default MainApp;
