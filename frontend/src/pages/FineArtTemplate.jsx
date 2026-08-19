import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/fineart/Navbar';
import Hero from '../components/fineart/Hero';
import CollectionsGrid from '../components/fineart/CollectionsGrid';
import FeatureBlock from '../components/fineart/FeatureBlock';
import Newsletter from '../components/fineart/Newsletter';
import Footer from '../components/fineart/Footer';
import { siteConfig } from '../data/fineart/config';
import './FineArtTemplate.css';

export default function FineArtTemplate() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  // Track mouse coordinates for the custom cursor
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  // Listen to hover states on dynamic gallery components
  useEffect(() => {
    const handleMouseOver = (e) => {
      const isImg = e.target.closest('a[href*="#collections-"]') || 
                    e.target.closest('.group') || 
                    e.target.closest('[class*="bg-cover"]');
      if (isImg) {
        setIsHoveringImage(true);
      } else {
        setIsHoveringImage(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    <div className="fineart-body min-h-screen relative select-none">
      
      {/* Custom Circular Hover Cursor */}
      <AnimatePresence>
        {isHoveringImage && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="fineart-custom-cursor hidden md:flex"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
          >
            View
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Collections Grid */}
      <CollectionsGrid />

      {/* 4. Feature Work Blocks (Dynamic alternating layout) */}
      {siteConfig.featureBlocks.map((block, idx) => (
        <FeatureBlock
          key={block.id}
          title={block.title}
          label={block.eyebrow}
          description={block.description}
          image={block.image}
          ctaText={block.ctaText}
          reverse={block.reverse}
          theme={block.theme}
        />
      ))}

      {/* 5. Newsletter / Update dispatcher */}
      <Newsletter />

      {/* 6. Footer */}
      <Footer />

    </div>
  );
}
