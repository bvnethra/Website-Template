import React from 'react';
import {
  UserCheck,
  Stethoscope,
  CalendarCheck,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Award
} from 'lucide-react';

interface AboutSectionProps {
  onOpenBooking: () => void;
  onNavigateTo: (sectionId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking, onNavigateTo }) => {
  const features = [
    {
      icon: <UserCheck className="w-5 h-5 text-[#3157D5]" />,
      title: 'Experienced Specialists',
      description: 'Over 150 board-certified physicians, surgeons, and healthcare practitioners across leading disciplines.'
    },
    {
      icon: <Stethoscope className="w-5 h-5 text-[#28B8D4]" />,
      title: 'Modern Healthcare Services',
      description: 'Equipped with digital imaging, sub-millimeter robotic surgery suites, and rapid point-of-care diagnostics.'
    },
    {
      icon: <CalendarCheck className="w-5 h-5 text-[#7567E8]" />,
      title: 'Easy Appointment Booking',
      description: 'Book verified specialist appointments in under 60 seconds with instant confirmation and automated reminders.'
    },
    {
      icon: <PhoneCall className="w-5 h-5 text-[#E5484D]" />,
      title: '24/7 Emergency Support',
      description: 'Continuous trauma care, emergency triage hotlines, and instant telemedicine emergency routing.'
    }
  ];

  return (
    <section id="about-section" className="py-16 lg:py-24 bg-[#F6F8FC] border-b border-[#E4E9F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Showcase Card & Quality Accreditations */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E4E9F2] bg-white p-3 sm:p-4">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000"
                alt="Modern Medical Healthcare Facility"
                className="w-full h-80 sm:h-96 object-cover rounded-2xl"
              />

              {/* Floating Quality Stamp */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#E4E9F2] shadow-lg flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#15213D]">
                      JCI & ISO 9001 Accredited
                    </h4>
                    <p className="text-[11px] text-[#667085]">Exceeding international clinical patient safety standards</p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center text-xs font-bold text-[#3157D5] bg-[#3157D5]/10 px-2.5 py-1 rounded-lg">
                  Top Tier
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Feature Items */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3157D5]/10 text-[#3157D5] text-xs font-bold uppercase tracking-wide mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>About NovaCare Platform</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#15213D] tracking-tight leading-tight mb-4">
              Healthcare Designed Around You
            </h2>

            <p className="text-sm sm:text-base text-[#667085] leading-relaxed mb-8">
              At NovaCare, we combine patient-centered clinical excellence with modern digital convenience. Whether you need a routine health check, complex specialized surgical care, or urgent 24/7 medical response, our integrated platform makes connecting with world-class specialists simple and seamless.
            </p>

            {/* Feature Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mb-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  id={`about-feature-${idx}`}
                  className="p-4 rounded-2xl bg-white border border-[#E4E9F2] hover:border-[#3157D5]/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#F6F8FC] flex items-center justify-center mb-2.5">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-bold text-[#15213D] mb-1">{feature.title}</h3>
                  <p className="text-xs text-[#667085] leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                id="about-explore-depts-btn"
                onClick={() => onNavigateTo('departments')}
                className="px-5 py-3 rounded-xl text-sm font-semibold text-white bg-[#3157D5] hover:bg-[#2443AE] shadow-sm transition-all duration-150 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Departments</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="about-book-btn"
                onClick={onOpenBooking}
                className="px-5 py-3 rounded-xl text-sm font-semibold text-[#15213D] bg-white hover:bg-[#EEF3FA] border border-[#E4E9F2] transition-all duration-150 active:scale-95 cursor-pointer"
              >
                Book Appointment
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
