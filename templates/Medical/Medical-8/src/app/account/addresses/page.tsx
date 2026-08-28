'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Plus, Trash2, Home, Briefcase, Globe, ChevronLeft } from 'lucide-react';

interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

const initialAddresses: Address[] = [
  { id: 'addr-1', label: 'Home', name: 'John Doe', phone: '+91 98765 43210', line1: 'Flat 402, Block C, Royal Residency', line2: 'Sector 56, Gurgaon', city: 'Gurugram', state: 'Haryana', pincode: '122011', isDefault: true },
  { id: 'addr-2', label: 'Office', name: 'John Doe', phone: '+91 98765 43210', line1: 'Medinova Tech Labs, Phase III', line2: 'Udyog Vihar', city: 'Gurugram', state: 'Haryana', pincode: '122016', isDefault: false }
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [label, setLabel] = useState('Home');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !line1 || !city || !pincode) return;

    const newAddress: Address = {
      id: `addr-${Date.now()}`,
      label,
      name,
      phone,
      line1,
      line2,
      city,
      state,
      pincode,
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, newAddress]);
    setShowAddForm(false);

    // Reset Form
    setName('');
    setPhone('');
    setLine1('');
    setLine2('');
    setCity('');
    setState('');
    setPincode('');
  };

  const handleRemoveAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-brand-bg py-8 sm:py-12 text-left">
      <div className="container-page max-w-4xl">
        
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-xs font-bold text-navy-500 hover:text-mint-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Address Cards List (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="bg-white rounded-3xl border border-brand-border p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-lg sm:text-xl font-extrabold text-navy-900">
                    Saved Addresses
                  </h1>
                  <p className="text-xs text-navy-500 mt-0.5">
                    Manage delivery profiles for faster checkout.
                  </p>
                </div>
                
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="h-9 px-4 rounded-full bg-navy-900 hover:bg-mint-600 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Address</span>
                </button>
              </div>

              {/* Cards layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-4 rounded-2xl border flex flex-col justify-between h-48 relative transition-all ${
                      addr.isDefault ? 'border-mint-500 bg-mint-50/10' : 'border-brand-border bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-navy-50 text-navy-700 px-2 py-0.5 rounded-full">
                          {addr.label === 'Home' ? <Home className="w-3 h-3 text-mint-500" /> : addr.label === 'Office' ? <Briefcase className="w-3 h-3 text-mint-500" /> : <Globe className="w-3 h-3 text-mint-500" />}
                          <span>{addr.label}</span>
                        </span>
                        
                        <div className="flex gap-2">
                          {!addr.isDefault && (
                            <button
                              onClick={() => handleSetDefault(addr.id)}
                              className="text-[9px] font-extrabold text-navy-400 hover:text-mint-600 uppercase"
                            >
                              Set Default
                            </button>
                          )}
                          <button
                            onClick={() => handleRemoveAddress(addr.id)}
                            className="text-navy-400 hover:text-error-500 transition-colors"
                            aria-label="Delete address"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-navy-900">{addr.name}</h4>
                      <p className="text-[11px] text-navy-500 mt-1 line-clamp-2 leading-relaxed">
                        {addr.line1}, {addr.line2}
                      </p>
                      <p className="text-[11px] text-navy-400 font-semibold mt-0.5">
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                    </div>

                    <p className="text-[10px] text-navy-500 font-semibold mt-auto">{addr.phone}</p>
                  </div>
                ))}

                {addresses.length === 0 && (
                  <div className="col-span-2 text-center py-12 text-navy-400">
                    <MapPin className="w-10 h-10 mx-auto mb-2 text-navy-300" />
                    <p className="text-xs">No saved addresses found.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Add Address Panel (lg:col-span-4) */}
          {showAddForm && (
            <div className="lg:col-span-4 bg-white border border-brand-border rounded-3xl p-5 shadow-sm animate-fade-in text-left">
              <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-mint-500" />
                Add New Delivery Location
              </h3>
              
              <form onSubmit={handleAddAddress} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-navy-800 uppercase tracking-wider block">Label</label>
                    <select
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      className="w-full h-9 px-2.5 border border-brand-border bg-white rounded-lg text-xs outline-none"
                    >
                      <option value="Home">Home</option>
                      <option value="Office">Office</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-navy-800 uppercase tracking-wider block">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Recipient's Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-9 px-3 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-navy-800 uppercase tracking-wider block">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit Mobile"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-9 px-3 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-navy-800 uppercase tracking-wider block">Pincode</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="6-digit PIN"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full h-9 px-3 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-navy-800 uppercase tracking-wider block">Address Line 1</label>
                  <input
                    type="text"
                    required
                    placeholder="House/Plot, Building, Street Name"
                    value={line1}
                    onChange={(e) => setLine1(e.target.value)}
                    className="w-full h-9 px-3 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-navy-800 uppercase tracking-wider block">Address Line 2</label>
                  <input
                    type="text"
                    placeholder="Area, Landmark, Sector"
                    value={line2}
                    onChange={(e) => setLine2(e.target.value)}
                    className="w-full h-9 px-3 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-navy-800 uppercase tracking-wider block">City</label>
                    <input
                      type="text"
                      required
                      placeholder="City Name"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-9 px-3 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-navy-800 uppercase tracking-wider block">State</label>
                    <input
                      type="text"
                      required
                      placeholder="State Name"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full h-9 px-3 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-10 bg-mint-500 hover:bg-mint-600 text-white font-bold text-xs rounded-lg transition-colors shadow-xs"
                >
                  Save Address Profile
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
