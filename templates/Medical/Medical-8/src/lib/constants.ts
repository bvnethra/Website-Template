export const APP_NAME = 'MediNova';
export const APP_TAGLINE = 'Healthcare that fits your life.';
export const APP_DESCRIPTION = 'Order medicines, track your health, book diagnostics and access trusted healthcare from one place.';

export const SITE_URL = 'https://medinova.health';

export const DELIVERY_PINCODE_DEFAULT = '110001';
export const DELIVERY_FEE_FREE_THRESHOLD = 499;
export const DELIVERY_FEE = 49;

export const MEDICAL_DISCLAIMER = 'This information is for general product understanding and does not replace advice from a qualified healthcare professional. Always consult your doctor or pharmacist before starting any medication or supplement.';

export const NAV_ITEMS = [
  { label: 'Medicines', href: '/category/pain-relief', icon: 'pill' },
  { label: 'Wellness', href: '/category/nutrition', icon: 'heart' },
  { label: 'Lab Tests', href: '/lab-tests', icon: 'flask' },
  { label: 'Doctor Care', href: '/doctors', icon: 'stethoscope' },
  { label: 'Health Records', href: '/health-records', icon: 'file-heart' },
] as const;

export const MOBILE_NAV_ITEMS = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Categories', href: '/category/pain-relief', icon: 'grid' },
  { label: 'Orders', href: '/account/orders', icon: 'package' },
  { label: 'Health', href: '/health-records', icon: 'heart-pulse' },
  { label: 'Account', href: '/account', icon: 'user' },
] as const;

export const QUICK_ACTIONS = [
  {
    title: 'Order Medicines',
    description: 'Get genuine medicines delivered to your door in hours',
    icon: 'pill',
    href: '/category/pain-relief',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    title: 'Upload Prescription',
    description: 'Upload a photo and our pharmacists will process your order',
    icon: 'upload',
    href: '/prescription',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Book Lab Test',
    description: 'Book diagnostic tests with home sample collection',
    icon: 'flask',
    href: '/lab-tests',
    color: 'from-violet-500 to-purple-600',
  },
  {
    title: 'Talk to a Doctor',
    description: 'Consult verified doctors online from anywhere',
    icon: 'stethoscope',
    href: '/doctors',
    color: 'from-rose-500 to-pink-600',
  },
] as const;

export const POPULAR_SEARCHES = [
  'Paracetamol',
  'Vitamin D3',
  'Multivitamin',
  'Blood Pressure Monitor',
  'Protein Powder',
  'Calcium Tablets',
  'Ashwagandha',
  'Glucometer',
];

export const TRUST_BADGES = [
  { icon: 'shield-check', label: '100% Genuine', description: 'All products are verified authentic' },
  { icon: 'truck', label: 'Fast Delivery', description: 'Delivered within 2-4 hours in select cities' },
  { icon: 'rotate-ccw', label: 'Easy Returns', description: '15-day hassle-free return policy' },
  { icon: 'lock', label: 'Secure & Private', description: 'Your health data is always protected' },
] as const;
