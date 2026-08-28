'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import {
  MapPin,
  Pill,
  Clock,
  CreditCard,
  CheckCircle,
  Truck,
  ArrowRight,
  ShieldCheck,
  Plus,
  AlertCircle,
  FileText,
} from 'lucide-react';

type StepType = 'address' | 'prescription' | 'delivery' | 'payment' | 'confirmation';

interface DeliverySlot {
  id: string;
  day: string;
  time: string;
  fee: number;
}

const mockAddresses = [
  { id: 'addr-1', label: 'Home', name: 'John Doe', phone: '+91 98765 43210', line1: 'Flat 402, Block C, Royal Residency', line2: 'Sector 56, Gurgaon', city: 'Gurugram', state: 'Haryana', pincode: '122011', isDefault: true },
  { id: 'addr-2', label: 'Office', name: 'John Doe', phone: '+91 98765 43210', line1: 'Medinova Tech Labs, Phase III', line2: 'Udyog Vihar', city: 'Gurugram', state: 'Haryana', pincode: '122016', isDefault: false }
];

const mockSlots: DeliverySlot[] = [
  { id: 'slot-1', day: 'Today', time: '04:00 PM - 07:00 PM', fee: 49 },
  { id: 'slot-2', day: 'Tomorrow', time: '09:00 AM - 12:00 PM', fee: 29 },
  { id: 'slot-3', day: 'Tomorrow', time: '02:00 PM - 05:00 PM', fee: 19 },
];

export default function CheckoutPage() {
  const { items, subtotal, totalDiscount, deliveryFee, total, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<StepType>('address');
  
  // States
  const [addresses, setAddresses] = useState(mockAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState('addr-1');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  
  // New address form
  const [newLabel, setNewLabel] = useState('Home');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newLine1, setNewLine1] = useState('');
  const [newLine2, setNewLine2] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPincode, setNewPincode] = useState('');

  // Prescription states
  const [rxFileUploaded, setRxFileUploaded] = useState(false);
  const [rxFileName, setRxFileName] = useState('');

  // Delivery slot states
  const [selectedSlotId, setSelectedSlotId] = useState('slot-1');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  
  // Confirmation state
  const [orderNumber, setOrderNumber] = useState('');

  const hasRxItems = items.some((item) => item.product.requiresPrescription);

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone || !newLine1 || !newCity || !newPincode) return;

    const newAddr = {
      id: `addr-${Date.now()}`,
      label: newLabel,
      name: newName,
      phone: newPhone,
      line1: newLine1,
      line2: newLine2,
      city: newCity,
      state: newState,
      pincode: newPincode,
      isDefault: false
    };

    setAddresses([...addresses, newAddr]);
    setSelectedAddressId(newAddr.id);
    setIsAddingAddress(false);
    
    // reset form
    setNewName('');
    setNewPhone('');
    setNewLine1('');
    setNewLine2('');
    setNewCity('');
    setNewState('');
    setNewPincode('');
  };

  const handleRxUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setRxFileName(e.target.files[0].name);
      setRxFileUploaded(true);
    }
  };

  const goToPrescriptionOrNext = () => {
    if (hasRxItems) {
      setCurrentStep('prescription');
    } else {
      setCurrentStep('delivery');
    }
  };

  const submitOrder = () => {
    // Generate order number
    const num = 'MN' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(num);
    setCurrentStep('confirmation');
    clearCart();
  };

  const stepsList: { id: StepType; label: string }[] = [
    { id: 'address', label: 'Delivery Address' },
    ...(hasRxItems ? [{ id: 'prescription' as StepType, label: 'Upload Prescription' }] : []),
    { id: 'delivery' as StepType, label: 'Delivery Time' },
    { id: 'payment' as StepType, label: 'Payment Details' },
    { id: 'confirmation' as StepType, label: 'Success' }
  ];

  if (items.length === 0 && currentStep !== 'confirmation') {
    return (
      <div className="min-h-screen bg-brand-bg py-12 text-center flex flex-col items-center justify-center container-page">
        <h1 className="text-xl sm:text-2xl font-extrabold text-navy-900 mb-2">
          Checkout Empty
        </h1>
        <p className="text-sm text-navy-500 mb-8 max-w-sm leading-relaxed">
          Please add products to your cart before proceeding to checkout.
        </p>
        <Link href="/" className="h-11 px-6 bg-navy-900 text-white rounded-full font-bold text-xs flex items-center justify-center">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg py-6 sm:py-10 text-left">
      <div className="container-page">
        
        {/* Stepper Progress bar */}
        {currentStep !== 'confirmation' && (
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
            <div className="flex items-center justify-between relative">
              {/* background line */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-brand-border z-0" />
              
              {stepsList.map((step, idx) => {
                const stepIndex = stepsList.findIndex(s => s.id === currentStep);
                const currentIdx = stepsList.findIndex(s => s.id === step.id);
                const isCompleted = currentIdx < stepIndex;
                const isActive = step.id === currentStep;
                
                return (
                  <div key={step.id} className="relative z-10 flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      isCompleted ? 'bg-mint-500 text-white' : isActive ? 'bg-navy-900 text-white ring-4 ring-navy-100' : 'bg-white border border-brand-border text-navy-400'
                    }`}>
                      {isCompleted ? <CheckCircle className="w-5 h-5" /> : idx + 1}
                    </div>
                    <span className="hidden sm:block text-[10px] font-bold text-navy-500 uppercase tracking-wider mt-2.5">
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Grid split */}
        {currentStep !== 'confirmation' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Steps details (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* ── STEP 1: Address ─────────────────────────── */}
              {currentStep === 'address' && (
                <div className="bg-white rounded-3xl border border-brand-border p-5 sm:p-8 space-y-6 animate-fade-in">
                  <h2 className="text-lg font-extrabold text-navy-900">Select Delivery Address</h2>
                  
                  {!isAddingAddress ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {addresses.map((addr) => {
                          const isSelected = selectedAddressId === addr.id;
                          return (
                            <button
                              key={addr.id}
                              onClick={() => setSelectedAddressId(addr.id)}
                              className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-44 relative transition-all ${
                                isSelected ? 'border-mint-500 bg-mint-50/10 shadow-sm' : 'border-brand-border hover:border-navy-400 bg-white'
                              }`}
                            >
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                    addr.label === 'Home' ? 'bg-mint-50 text-mint-700' : 'bg-navy-50 text-navy-700'
                                  }`}>
                                    {addr.label}
                                  </span>
                                  {isSelected && <CheckCircle className="w-4 h-4 text-mint-500" />}
                                </div>
                                <h4 className="text-xs font-bold text-navy-900">{addr.name}</h4>
                                <p className="text-[11px] text-navy-500 mt-1 line-clamp-2 leading-relaxed">
                                  {addr.line1}, {addr.line2}
                                </p>
                                <p className="text-[11px] text-navy-400 font-semibold mt-0.5">
                                  {addr.city}, {addr.state} - {addr.pincode}
                                </p>
                              </div>
                              <p className="text-[10px] text-navy-500 font-semibold">{addr.phone}</p>
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => setIsAddingAddress(true)}
                        className="w-full h-11 border border-dashed border-brand-border rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-navy-600 hover:border-mint-500 hover:text-mint-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add New Address
                      </button>

                      <div className="pt-4 flex justify-end">
                        <button
                          onClick={goToPrescriptionOrNext}
                          className="h-11 px-8 rounded-full bg-navy-900 hover:bg-mint-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          <span>Deliver to this Address</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Add address form */
                    <form onSubmit={handleAddAddress} className="space-y-4 animate-fade-in text-left">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Address Label</label>
                          <select
                            value={newLabel}
                            onChange={(e) => setNewLabel(e.target.value)}
                            className="w-full h-10 px-3 border border-brand-border bg-white rounded-lg text-xs"
                          >
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Enter recipient's name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full h-10 px-3 border border-brand-border rounded-lg text-xs focus:border-mint-400 outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Mobile Number</label>
                          <input
                            type="tel"
                            required
                            placeholder="10-digit number"
                            value={newPhone}
                            onChange={(e) => setNewPhone(e.target.value)}
                            className="w-full h-10 px-3 border border-brand-border rounded-lg text-xs focus:border-mint-400 outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Pincode</label>
                          <input
                            type="text"
                            required
                            placeholder="6-digit PIN"
                            value={newPincode}
                            onChange={(e) => setNewPincode(e.target.value)}
                            className="w-full h-10 px-3 border border-brand-border rounded-lg text-xs focus:border-mint-400 outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Address Line 1</label>
                        <input
                          type="text"
                          required
                          placeholder="Flat/House No, Building, Street"
                          value={newLine1}
                          onChange={(e) => setNewLine1(e.target.value)}
                          className="w-full h-10 px-3 border border-brand-border rounded-lg text-xs focus:border-mint-400 outline-none"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Address Line 2 (Optional)</label>
                        <input
                          type="text"
                          placeholder="Locality, Sector, Landmark"
                          value={newLine2}
                          onChange={(e) => setNewLine2(e.target.value)}
                          className="w-full h-10 px-3 border border-brand-border rounded-lg text-xs focus:border-mint-400 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">City</label>
                          <input
                            type="text"
                            required
                            placeholder="City name"
                            value={newCity}
                            onChange={(e) => setNewCity(e.target.value)}
                            className="w-full h-10 px-3 border border-brand-border rounded-lg text-xs focus:border-mint-400 outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">State</label>
                          <input
                            type="text"
                            required
                            placeholder="State"
                            value={newState}
                            onChange={(e) => setNewState(e.target.value)}
                            className="w-full h-10 px-3 border border-brand-border rounded-lg text-xs focus:border-mint-400 outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 justify-end">
                        <button
                          type="button"
                          onClick={() => setIsAddingAddress(false)}
                          className="h-10 px-5 border border-brand-border rounded-lg text-xs font-bold text-navy-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="h-10 px-6 bg-navy-900 text-white rounded-lg text-xs font-bold"
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* ── STEP 2: Prescription ────────────────────── */}
              {currentStep === 'prescription' && (
                <div className="bg-white rounded-3xl border border-brand-border p-5 sm:p-8 space-y-6 animate-fade-in">
                  <h2 className="text-lg font-extrabold text-navy-900">Upload Doctor Prescription</h2>
                  
                  <div className="p-4 rounded-xl bg-warning-50 border border-warning-500/20 text-xs flex gap-2">
                    <AlertCircle className="w-5 h-5 text-warning-500 shrink-0" />
                    <p className="text-navy-500 leading-relaxed">
                      Your cart contains prescription items. A registered pharmacist must verify a physical or digital copy of your prescription before the order is packed.
                    </p>
                  </div>

                  <div className="border-2 border-dashed border-brand-border rounded-2xl p-8 flex flex-col items-center justify-center">
                    <input
                      type="file"
                      id="rx-checkout-file"
                      accept="image/*,application/pdf"
                      onChange={handleRxUpload}
                      className="hidden"
                    />
                    
                    {rxFileUploaded ? (
                      <div className="text-center space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-mint-50 text-mint-500 flex items-center justify-center mx-auto border border-mint-500/10">
                          <FileText className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-bold text-navy-900">{rxFileName}</p>
                        <label
                          htmlFor="rx-checkout-file"
                          className="text-xs font-bold text-mint-600 underline cursor-pointer"
                        >
                          Upload a different copy
                        </label>
                      </div>
                    ) : (
                      <label htmlFor="rx-checkout-file" className="flex flex-col items-center text-center cursor-pointer">
                        <FileText className="w-8 h-8 text-navy-400 mb-3" />
                        <span className="text-xs font-bold text-navy-900">Click to upload Rx image or PDF</span>
                        <span className="text-[10px] text-navy-400 mt-0.5">Maximum size: 10MB</span>
                        <span className="mt-4 px-4 py-2 bg-navy-900 text-white rounded-lg text-xs font-bold shadow-xs">
                          Choose File
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="pt-4 flex justify-between gap-4">
                    <button
                      onClick={() => setCurrentStep('address')}
                      className="h-11 px-5 border border-brand-border rounded-full text-xs font-bold text-navy-600"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep('delivery')}
                      disabled={!rxFileUploaded}
                      className="h-11 px-8 rounded-full bg-navy-900 hover:bg-mint-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors disabled:bg-navy-200 disabled:cursor-not-allowed"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Delivery Slots ─────────────────── */}
              {currentStep === 'delivery' && (
                <div className="bg-white rounded-3xl border border-brand-border p-5 sm:p-8 space-y-6 animate-fade-in">
                  <h2 className="text-lg font-extrabold text-navy-900">Select Delivery Time Slot</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {mockSlots.map((slot) => {
                      const isSelected = selectedSlotId === slot.id;
                      return (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedSlotId(slot.id)}
                          className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-32 relative transition-all ${
                            isSelected ? 'border-mint-500 bg-mint-50/10 shadow-sm' : 'border-brand-border hover:border-navy-400 bg-white'
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-bold text-navy-900">{slot.day}</span>
                              {isSelected && <CheckCircle className="w-4 h-4 text-mint-500" />}
                            </div>
                            <p className="text-[11px] text-navy-500 leading-normal">{slot.time}</p>
                          </div>
                          
                          <span className="text-[10px] font-bold text-navy-400 mt-2">
                            Delivery Fee: {slot.fee === 0 ? 'FREE' : formatPrice(slot.fee)}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-between gap-4">
                    <button
                      onClick={() => setCurrentStep(hasRxItems ? 'prescription' : 'address')}
                      className="h-11 px-5 border border-brand-border rounded-full text-xs font-bold text-navy-600"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep('payment')}
                      className="h-11 px-8 rounded-full bg-navy-900 hover:bg-mint-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 4: Payment Details ────────────────── */}
              {currentStep === 'payment' && (
                <div className="bg-white rounded-3xl border border-brand-border p-5 sm:p-8 space-y-6 animate-fade-in">
                  <h2 className="text-lg font-extrabold text-navy-900">Select Payment Method</h2>
                  
                  <div className="space-y-3">
                    {[
                      { id: 'upi', label: 'UPI / Google Pay / PhonePe', icon: CreditCard, subtitle: 'Pay instantly from your bank account' },
                      { id: 'card', label: 'Credit or Debit Cards', icon: CreditCard, subtitle: 'Visa, MasterCard, RuPay, Maestro' },
                      { id: 'cod', label: 'Cash on Delivery (COD)', icon: Truck, subtitle: 'Pay at your door via cash or UPI link' },
                    ].map((method) => {
                      const isSelected = paymentMethod === method.id;
                      const Icon = method.icon;
                      
                      return (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id as 'upi' | 'card' | 'cod')}
                          className={`w-full p-4 rounded-2xl border text-left flex items-start gap-4 transition-all ${
                            isSelected ? 'border-mint-500 bg-mint-50/10' : 'border-brand-border hover:border-navy-400 bg-white'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-mint-500 text-white' : 'bg-navy-50 text-navy-500'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-navy-900">{method.label}</h4>
                            <p className="text-[10px] text-navy-400 mt-0.5">{method.subtitle}</p>
                          </div>
                          
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isSelected ? 'bg-mint-500 border-mint-500 text-white' : 'border-brand-border'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-between gap-4">
                    <button
                      onClick={() => setCurrentStep('delivery')}
                      className="h-11 px-5 border border-brand-border rounded-full text-xs font-bold text-navy-600"
                    >
                      Back
                    </button>
                    <button
                      onClick={submitOrder}
                      className="h-11 px-8 rounded-full bg-mint-500 hover:bg-mint-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>Complete Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Right: Checkout Order Summary Panel (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-brand-border rounded-3xl p-5 shadow-sm">
                <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-4">
                  Order Summary
                </h3>
                
                <div className="max-h-60 overflow-y-auto space-y-3 pr-1 mb-4 border-b border-brand-muted pb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center text-xs gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-navy-900 truncate">{item.product.name}</p>
                        <p className="text-[10px] text-navy-400">{item.product.packSize} · Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-navy-800 shrink-0">{formatPrice(item.product.salePrice * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pb-4 border-b border-brand-muted text-xs text-navy-500">
                  <div className="flex justify-between">
                    <span>MRP Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-success-500">
                    <span>Product Discounts</span>
                    <span>-{formatPrice(totalDiscount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery charges</span>
                    {deliveryFee === 0 ? <span className="text-success-500 font-semibold">FREE</span> : <span>{formatPrice(deliveryFee)}</span>}
                  </div>
                </div>

                <div className="flex justify-between items-baseline pt-3 mb-4">
                  <span className="text-xs font-bold text-navy-950">Payable Total</span>
                  <span className="text-lg font-extrabold text-navy-950">{formatPrice(total)}</span>
                </div>
                
                <div className="flex items-center gap-1 text-[10px] text-navy-400 justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-mint-500" />
                  <span>100% Genuine Medicines Guarantee</span>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* ── Screen 5: Confirmation (Success screen) ─────── */
          <div className="bg-white border border-brand-border rounded-3xl p-6 sm:p-12 text-center max-w-xl mx-auto shadow-sm space-y-8 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-mint-50 text-mint-500 border border-mint-500/10 flex items-center justify-center mx-auto">
              <CheckCircle className="w-9 h-9 stroke-[1.5]" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy-900">
                Order Placed Successfully!
              </h2>
              <p className="text-xs text-navy-500 mt-2 leading-relaxed">
                Thank you for choosing MediNova. Your order reference code is <strong className="text-navy-950 font-bold">{orderNumber}</strong>. We have sent a confirmation email & SMS receipt.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-brand-bg border border-brand-border text-xs text-navy-500 space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold text-navy-700">Estimated Delivery:</span>
                <span>Within 2 to 4 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-navy-700">Payment Status:</span>
                <span className="text-mint-600 font-bold uppercase">Pending Verification</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href={`/orders/${orderNumber}`}
                className="w-full sm:w-auto h-11 px-6 bg-navy-900 hover:bg-mint-600 text-white font-bold text-xs rounded-full flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <span>Track Order Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto h-11 px-6 border border-brand-border rounded-full text-navy-700 hover:bg-navy-50 text-xs font-bold transition-all flex items-center justify-center"
              >
                Return to Home
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
