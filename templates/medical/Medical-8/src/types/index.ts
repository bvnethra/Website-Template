// ============================================================
// MediNova — Core Type Definitions
// ============================================================

// ── Product System ──────────────────────────────────────────

export interface Product {
  id: string;
  slug: string;
  name: string;
  genericName?: string;
  brand: string;
  category: string;
  subcategory?: string;
  shortDescription: string;
  description: string;
  form: 'tablet' | 'capsule' | 'syrup' | 'cream' | 'gel' | 'drops' | 'injection' | 'powder' | 'device' | 'other';
  strength?: string;
  packSize: string;
  mrp: number;
  salePrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  requiresPrescription: boolean;
  isVerified: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  imageUrl: string;
  images: string[];
  ingredients?: string[];
  usage?: string;
  warnings?: string[];
  sideEffects?: string[];
  manufacturer: string;
  storage?: string;
  faqs?: FAQ[];
  tags: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

// ── Category System ─────────────────────────────────────────

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string; // SVG icon identifier
  color: string; // Tailwind color class
  productCount: number;
  subcategories?: SubCategory[];
}

export interface SubCategory {
  id: string;
  slug: string;
  name: string;
  productCount: number;
}

// ── Health Goal ─────────────────────────────────────────────

export interface HealthGoal {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  productIds: string[];
  educationLink?: string;
}

// ── Brand ───────────────────────────────────────────────────

export interface Brand {
  id: string;
  slug: string;
  name: string;
  description?: string;
  logoUrl?: string;
  productCount: number;
}

// ── Cart ────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  couponCode?: string;
  couponDiscount?: number;
}

// ── User & Auth ─────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  label: string; // Home, Office, Other
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

// ── Orders ──────────────────────────────────────────────────

export type OrderStatus =
  | 'placed'
  | 'prescription_verified'
  | 'preparing'
  | 'packed'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  address: Address;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  prescriptionRequired: boolean;
  paymentMethod: string;
  placedAt: string;
  deliveredAt?: string;
  timeline: OrderTimelineEvent[];
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  label: string;
  timestamp?: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

// ── Prescription ────────────────────────────────────────────

export type PrescriptionStatus =
  | 'uploaded'
  | 'processing'
  | 'needs_clarification'
  | 'verified'
  | 'rejected'
  | 'completed';

export interface Prescription {
  id: string;
  userId: string;
  fileUrl: string;
  fileName: string;
  fileType: 'image' | 'pdf';
  patientName: string;
  status: PrescriptionStatus;
  uploadedAt: string;
  verifiedAt?: string;
  notes?: string;
}

// ── Lab Tests ───────────────────────────────────────────────

export interface LabTest {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  mrp: number;
  salePrice: number;
  discount: number;
  sampleType: string;
  preparationInstructions?: string;
  reportTime: string;
  homeCollection: boolean;
  parameters: string[];
  icon: string;
}

export interface LabBooking {
  id: string;
  userId: string;
  test: LabTest;
  date: string;
  slot: string;
  address: Address;
  status: 'booked' | 'sample_collected' | 'processing' | 'report_ready';
  reportUrl?: string;
}

// ── Doctors ─────────────────────────────────────────────────

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: number; // years
  consultationFee: number;
  rating: number;
  reviewCount: number;
  languages: string[];
  availability: DoctorAvailability[];
  imageUrl: string;
  about?: string;
  isAvailableNow: boolean;
}

export interface DoctorAvailability {
  day: string;
  slots: string[];
}

// ── Store Locator ───────────────────────────────────────────

export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  lat: number;
  lng: number;
  openingHours: string;
  services: string[];
  isOpen: boolean;
}

// ── Health Records ──────────────────────────────────────────

export interface HealthRecord {
  id: string;
  userId: string;
  type: 'prescription' | 'lab_report' | 'medical_document' | 'consultation';
  title: string;
  date: string;
  fileUrl?: string;
  notes?: string;
}

// ── Refill Reminders ────────────────────────────────────────

export interface RefillReminder {
  id: string;
  userId: string;
  medicineName: string;
  dosage: string;
  schedule: string;
  quantity: number;
  refillDate: string;
  reminderPreference: 'email' | 'sms' | 'push' | 'none';
  isActive: boolean;
}

// ── Coupon ──────────────────────────────────────────────────

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  isActive: boolean;
  expiresAt: string;
}

// ── Search ──────────────────────────────────────────────────

export interface SearchSuggestion {
  type: 'product' | 'brand' | 'category' | 'condition';
  text: string;
  slug: string;
  subtitle?: string;
}

// ── Filter & Sort ───────────────────────────────────────────

export interface FilterState {
  priceRange: [number, number];
  brands: string[];
  categories: string[];
  rating: number | null;
  availability: 'all' | 'in_stock';
  discount: number | null;
  prescriptionRequired: 'all' | 'yes' | 'no';
}

export type SortOption =
  | 'recommended'
  | 'popularity'
  | 'price_low_high'
  | 'price_high_low'
  | 'newest'
  | 'rating';

// ── Checkout ────────────────────────────────────────────────

export type CheckoutStep = 'address' | 'prescription' | 'delivery' | 'payment' | 'confirmation';

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod';

export interface DeliverySlot {
  id: string;
  date: string;
  timeRange: string;
  fee: number;
  isAvailable: boolean;
}
