import React, { useState } from 'react';

export const CareersView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Senior Wealth Relationship Manager',
    experience: '3-5 years',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const positions = [
    {
      title: 'Senior Wealth Relationship Manager',
      location: 'Chandigarh (Sector 31-A)',
      type: 'Full-Time',
      experience: '4+ Years in Mutual Funds / PMS',
      description: 'Manage high-trust relationships with high-net-worth families, execute goal-based asset allocation, and conduct bi-annual reviews.',
    },
    {
      title: 'Research Analyst – Equity & Mutual Funds',
      location: 'Chandigarh Office',
      type: 'Full-Time',
      experience: '2-4 Years (CFA / NISM certified preferred)',
      description: 'Perform qualitative and quantitative fund manager due diligence, macroeconomic tracking, and build quarterly investment dossiers.',
    },
    {
      title: 'Client Services & Onboarding Specialist',
      location: 'Chandigarh / Hybrid',
      type: 'Full-Time',
      experience: '1-3 Years in FinTech / Banking Operations',
      description: 'Ensure smooth digital KYC, CAMS/KFintech execution, portfolio reporting, and seamless administrative support for our client base.',
    },
    {
      title: 'Financial Content & Publishing Associate',
      location: 'Chandigarh Office',
      type: 'Full-Time',
      experience: '1-3 Years in Financial Editorial / Publishing',
      description: 'Assist in drafting Gurukul educational articles, client newsletters, and publication production for our bookstore division.',
    },
  ];

  return (
    <div className="w-full bg-[#FAF7F2] text-[#11243B]">
      {/* Hero */}
      <section className="bg-[#071526] text-white py-20 border-b border-stone-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="text-xs font-semibold tracking-widest text-[#C9A24E] uppercase">
            JOIN OUR TEAM
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
            Careers at <span className="italic font-normal text-[#DEBF6A]">Sahayak Associates</span>
          </h1>
          <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed">
            Build a meaningful career in wealth stewardship where integrity, intellectual rigor, and genuine client care are celebrated every day.
          </p>
        </div>
      </section>

      {/* Culture Values */}
      <section className="py-16 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-stone-200">
              <span className="text-2xl">🌱</span>
              <h3 className="font-serif font-bold text-lg text-[#071526] mt-3">
                No Sales Pressure
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                We never push toxic monthly sales targets or speculative products. Your only metric of success is client satisfaction and portfolio health.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-stone-200">
              <span className="text-2xl">📖</span>
              <h3 className="font-serif font-bold text-lg text-[#071526] mt-3">
                Culture of Learning
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                We sponsor CFP and CFA certifications and provide access to our comprehensive office library and executive seminars.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-stone-200">
              <span className="text-2xl">🤝</span>
              <h3 className="font-serif font-bold text-lg text-[#071526] mt-3">
                Long-Term Thinking
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                We treat our colleagues like family, offering transparent career progression, competitive packages, and healthy work-life balance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions & Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Open Roles */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#071526]">
                Current Openings
              </h2>

              <div className="space-y-4">
                {positions.map((pos, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm hover:border-[#C9A24E] transition-all space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-serif font-bold text-base sm:text-lg text-[#071526]">
                        {pos.title}
                      </h3>
                      <span className="text-[10px] font-mono font-semibold bg-[#F5F2EA] text-[#C9A24E] px-2.5 py-0.5 rounded-full">
                        {pos.type}
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 font-medium">
                      📍 {pos.location} &nbsp;·&nbsp; ⏱️ {pos.experience}
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-1">
                      {pos.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quick Application Form */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-7 border border-stone-200 shadow-md space-y-5 sticky top-28">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#071526]">
                    Apply for a Role
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Send your details directly to our human resources team.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                    <span className="text-3xl">✅</span>
                    <h4 className="font-serif font-bold text-emerald-900 text-base">
                      Application Submitted!
                    </h4>
                    <p className="text-xs text-emerald-700 leading-relaxed">
                      Thank you for your interest in Sahayak Associates. Our talent team will review your profile and reach out within 3 business days.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:border-[#C9A24E] focus:outline-none"
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:border-[#C9A24E] focus:outline-none"
                          placeholder="rahul@example.com"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:border-[#C9A24E] focus:outline-none"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Position Applied For</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:border-[#C9A24E] focus:outline-none bg-white"
                      >
                        <option>Senior Wealth Relationship Manager</option>
                        <option>Research Analyst – Equity &amp; Mutual Funds</option>
                        <option>Client Services &amp; Onboarding Specialist</option>
                        <option>Financial Content &amp; Publishing Associate</option>
                        <option>General / Open Application</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Brief Background / Cover Note</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg border border-stone-300 focus:border-[#C9A24E] focus:outline-none"
                        placeholder="Tell us about your background and why you want to join Sahayak..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-full text-xs font-semibold text-[#071526] bg-[#C9A24E] hover:bg-[#DEBF6A] transition-colors shadow-sm cursor-pointer"
                    >
                      Submit Application →
                    </button>
                    <p className="text-[10px] text-stone-400 text-center">
                      Or email your resume directly to{' '}
                      <a href="mailto:info@sahayakassociates.com" className="text-[#071526] underline">
                        info@sahayakassociates.com
                      </a>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
