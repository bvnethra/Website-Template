import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchTeam } from '../../services/api';

export default function Team() {
  const [team, setTeam] = useState([]);
  const [activeHover, setActiveHover] = useState(null);

  useEffect(() => {
    fetchTeam().then((data) => setTeam(data));
  }, []);

  // Helper to render customized vector portraits
  const renderPortrait = (avatarId, isHovered) => {
    // Colors alter based on hover state
    const bgFace = isHovered ? '#FFE885' : '#FCF9F2';
    const accentFace = isHovered ? '#FF5F38' : '#1E4620';

    switch (avatarId) {
      case 'vishal':
        return (
          <svg viewBox="0 0 200 200" className="team-avatar-svg">
            <rect width="100%" height="100%" fill={bgFace} style={{ transition: 'fill 0.3s' }} />
            {/* Outline Face */}
            <path d="M 60,150 C 60,110 80,70 100,70 C 120,70 140,110 140,150" fill="none" stroke="#232120" strokeWidth="2.5" />
            <circle cx="100" cy="95" r="30" fill="none" stroke="#232120" strokeWidth="2.5" />
            {/* Glasses */}
            <rect x="82" y="88" width="16" height="12" rx="2" fill="none" stroke={accentFace} strokeWidth="2.5" />
            <rect x="102" y="88" width="16" height="12" rx="2" fill="none" stroke={accentFace} strokeWidth="2.5" />
            <line x1="98" y1="94" x2="102" y2="94" stroke="#232120" strokeWidth="2.5" />
            {/* Smile */}
            <path d="M 94,112 Q 100,118 106,112" fill="none" stroke="#232120" strokeWidth="2" />
          </svg>
        );
      case 'nethra':
        return (
          <svg viewBox="0 0 200 200" className="team-avatar-svg">
            <rect width="100%" height="100%" fill={bgFace} style={{ transition: 'fill 0.3s' }} />
            {/* Hair Bun */}
            <circle cx="100" cy="50" r="16" fill="none" stroke="#232120" strokeWidth="2.5" />
            <path d="M 60,150 C 60,110 80,72 100,72 C 120,72 140,110 140,150" fill="none" stroke="#232120" strokeWidth="2.5" />
            <circle cx="100" cy="95" r="28" fill="none" stroke="#232120" strokeWidth="2.5" />
            {/* Creative Round Glasses */}
            <circle cx="86" cy="95" r="10" fill="none" stroke={accentFace} strokeWidth="2.5" />
            <circle cx="114" cy="95" r="10" fill="none" stroke={accentFace} strokeWidth="2.5" />
            <line x1="96" y1="95" x2="104" y2="95" stroke="#232120" strokeWidth="2" />
            {/* Smile */}
            <path d="M 95,114 Q 100,120 105,114" fill="none" stroke="#232120" strokeWidth="2" />
          </svg>
        );
      case 'sakthi':
        return (
          <svg viewBox="0 0 200 200" className="team-avatar-svg">
            <rect width="100%" height="100%" fill={bgFace} style={{ transition: 'fill 0.3s' }} />
            {/* Face shape */}
            <path d="M 60,150 C 60,110 75,75 100,75 C 125,75 140,110 140,150" fill="none" stroke="#232120" strokeWidth="2.5" />
            <circle cx="100" cy="95" r="28" fill="none" stroke="#232120" strokeWidth="2.5" />
            {/* Hair details */}
            <path d="M 80,72 Q 100,55 120,72" fill="none" stroke={accentFace} strokeWidth="3" />
            {/* Eyes */}
            <circle cx="90" cy="95" r="3" fill="#232120" />
            <circle cx="110" cy="95" r="3" fill="#232120" />
            {/* Smile */}
            <path d="M 93,111 Q 100,118 107,111" fill="none" stroke="#232120" strokeWidth="2" />
          </svg>
        );
      case 'varun':
      default:
        return (
          <svg viewBox="0 0 200 200" className="team-avatar-svg">
            <rect width="100%" height="100%" fill={bgFace} style={{ transition: 'fill 0.3s' }} />
            {/* Cool cap */}
            <path d="M 75,70 L 125,70 L 135,82 L 65,82 Z" fill={accentFace} stroke="#232120" strokeWidth="2" />
            {/* Face */}
            <path d="M 60,150 C 60,110 80,82 100,82 C 120,82 140,110 140,150" fill="none" stroke="#232120" strokeWidth="2.5" />
            <circle cx="100" cy="100" r="26" fill="none" stroke="#232120" strokeWidth="2.5" />
            <circle cx="92" cy="100" r="3" fill="#232120" />
            <circle cx="108" cy="100" r="3" fill="#232120" />
            {/* Smile */}
            <path d="M 94,114 Q 100,120 106,114" fill="none" stroke="#232120" strokeWidth="2" />
          </svg>
        );
    }
  };

  return (
    <section id="team" className="section team-section">
      <div className="team-header">
        <span className="team-sup">THE CREW</span>
        <h2 className="team-heading">PEOPLE</h2>
        <p className="team-desc">Meet the creative authors behind the code and design systems.</p>
      </div>

      {/* Swipeable Container for Mobile, Grid for Desktop */}
      <div className="team-cards-arena">
        {team.map((member) => {
          const isHovered = activeHover === member.id;

          return (
            <motion.div
              key={member.id}
              className={`team-card-frame ${isHovered ? 'hovered' : ''}`}
              onMouseEnter={() => setActiveHover(member.id)}
              onMouseLeave={() => setActiveHover(null)}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              data-cursor="OPEN"
            >
              {/* Portrait cutout with organic outline */}
              <div className="portrait-cutout-container organic-card-1">
                {renderIllustration(member.avatarUrl, isHovered)}
              </div>

              {/* Text Meta info */}
              <div className="member-info-box">
                <h3 className="member-name">{member.name}</h3>
                <span className="member-role">{member.role}</span>
                
                {/* Reveal Bio details on hover */}
                <motion.p 
                  className="member-bio"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: isHovered ? 'auto' : 0, 
                    opacity: isHovered ? 1 : 0 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {member.bio}
                </motion.p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        .team-section {
          background-color: var(--bg-cream);
        }

        .team-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .team-sup {
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--accent-coral);
          font-size: 0.9rem;
        }

        .team-heading {
          font-size: clamp(2rem, 3.5vw, 3rem);
          margin-top: 10px;
          font-family: var(--font-serif);
        }

        .team-desc {
          font-size: 1rem;
          color: var(--text-muted);
          margin-top: 10px;
        }

        /* Responsive Layout Arena */
        .team-cards-arena {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
        }

        @media (max-width: 991px) {
          .team-cards-arena {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 600px) {
          /* Mobile swipe gallery view */
          .team-cards-arena {
            display: flex;
            overflow-x: auto;
            gap: 1.5rem;
            padding: 1rem 0.5rem 2rem 0.5rem;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }
          .team-card-frame {
            min-width: 280px;
            scroll-snap-align: center;
          }
        }

        /* Team Individual Frame */
        .team-card-frame {
          background: var(--bg-paper);
          border: var(--border-sketch);
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 4px 4px 0px var(--border-color);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
        }

        .portrait-cutout-container {
          width: 100%;
          aspect-ratio: 1;
          overflow: hidden;
          margin-bottom: 1.2rem;
          box-shadow: 3px 3px 0px var(--border-color);
        }

        .team-avatar-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .member-info-box {
          width: 100%;
        }

        .member-name {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 900;
          margin-bottom: 5px;
          color: var(--text-charcoal);
        }

        .member-role {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: bold;
          text-transform: uppercase;
          color: var(--accent-coral);
          letter-spacing: 0.5px;
          display: inline-block;
          margin-bottom: 8px;
        }

        .member-bio {
          font-size: 0.85rem;
          line-height: 1.4;
          color: var(--text-muted);
          overflow: hidden;
        }
      `}</style>
    </section>
  );

  // Quick helper map
  function renderIllustration(avatarUrl, isHovered) {
    return renderPortrait(avatarUrl, isHovered);
  }
}
