export interface GalleryItem {
  id: string;
  title: string;
  category: 'Facilities' | 'Doctors' | 'Events' | 'Technology';
  image: string;
  description: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Advanced Robotic Surgical Suite',
    category: 'Technology',
    image: '/images/gallery/robotic-surgery.jpg',
    description: 'Ultra-precision robotic surgical arm allowing sub-millimeter surgical accuracy and minimal recovery times.'
  },
  {
    id: 'gal-2',
    title: 'Flagship Hospital Atrium',
    category: 'Facilities',
    image: '/images/gallery/atrium.jpg',
    description: 'Naturally lit, calming patient lobby designed to promote serenity and reduce clinical anxiety.'
  },
  {
    id: 'gal-3',
    title: 'Multidisciplinary Cardiac Panel',
    category: 'Doctors',
    image: '/images/gallery/cardiac-panel.jpg',
    description: 'Our senior cardiovascular specialists discussing complex patient diagnostics during daily morning rounds.'
  },
  {
    id: 'gal-4',
    title: 'Annual Community Health Expo 2026',
    category: 'Events',
    image: '/images/gallery/health-expo.jpg',
    description: 'CareNova medical team providing free health screenings and diabetes checks for over 1,200 local residents.'
  },
  {
    id: 'gal-5',
    title: '3T High-Definition MRI Imaging Bay',
    category: 'Technology',
    image: '/images/gallery/mri-bay.jpg',
    description: 'Quiet-bore 3-Tesla Magnetic Resonance Imaging machine offering non-claustrophobic neuro and joint scans.'
  },
  {
    id: 'gal-6',
    title: 'Pediatric Care & Play Suite',
    category: 'Facilities',
    image: '/images/gallery/pediatric-suite.jpg',
    description: 'Vibrant, child-friendly examination and waiting area designed specifically for pediatric patients.'
  },
  {
    id: 'gal-7',
    title: 'Emergency Response & Trauma Unit',
    category: 'Facilities',
    image: '/images/gallery/emergency-trauma.jpg',
    description: '24/7 Level 1 emergency resuscitation bay staffed by board-certified emergency physicians.'
  },
  {
    id: 'gal-8',
    title: 'Physical Rehabilitation & Kinesiology Gym',
    category: 'Technology',
    image: '/images/gallery/rehab-gym.jpg',
    description: 'State-of-the-art biomechanical physical therapy lab equipped with zero-gravity gait trainers.'
  }
];
