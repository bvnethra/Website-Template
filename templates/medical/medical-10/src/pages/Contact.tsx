import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Mail, Send, ShieldAlert } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../context/ToastContext';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.string().min(3, 'Please enter a message subject'),
  message: z.string().min(10, 'Please write your message (at least 10 characters)'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  });

  const onSubmitContact = (_data: ContactFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      reset();
      showToast('Message Sent Successfully', 'Our patient support team will reply within 2 business hours.', 'success');
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-2xl space-y-3">
          <Badge variant="primary" size="md" className="bg-blue-900/60 text-blue-200 border-blue-700">
            24/7 Patient Support
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Contact CareNova Health</h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Have questions about doctor appointments, medical records, or insurance claims? We are here to help.
          </p>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-red-950 text-lg">24/7 Medical Emergency Hotline</h3>
            <p className="text-red-700 text-xs">For life-threatening emergencies, call dispatch immediately.</p>
          </div>
        </div>
        <a
          href="tel:5559112273"
          className="bg-danger hover:bg-red-700 text-white font-extrabold px-6 py-3 rounded-2xl shadow-soft transition-colors shrink-0 text-sm"
        >
          Call (555) 911-CARE
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Send Us a Direct Message</h2>

          <form onSubmit={handleSubmit(onSubmitContact)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  {...register('fullName')}
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="john@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  {...register('phone')}
                  placeholder="(555) 000-0000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
                <input
                  type="text"
                  {...register('subject')}
                  placeholder="Appointment Inquiry, Billing..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Message *</label>
              <textarea
                rows={5}
                {...register('message')}
                placeholder="Write details of your inquiry..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
            </div>

            <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} leftIcon={<Send className="w-4 h-4" />}>
              Send Message
            </Button>
          </form>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Central Contact Directory</h3>

            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-2xl">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900 text-xs">Flagship Medical Hub</p>
                  <p className="text-slate-600 text-xs">450 Innovation Parkway, Suite 100, Metropolis NY 10001</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 text-xs">General Appointments & Info</p>
                  <p className="text-slate-600 text-xs">(555) 019-2831</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl">
                <Mail className="w-5 h-5 text-indigo-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 text-xs">Patient Relations Email</p>
                  <p className="text-slate-600 text-xs">contact@carenovahealth.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
