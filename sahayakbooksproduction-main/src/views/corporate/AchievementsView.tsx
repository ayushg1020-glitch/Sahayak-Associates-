import React from 'react';
import { useStore } from '../../context/StoreContext';

export const AchievementsView: React.FC = () => {
  const { navigate } = useStore();

  const milestones = [
    {
      year: '2017',
      title: 'Inception in Chandigarh',
      description: 'Founded with a clear mandate: to act as a personal Family CFO, replacing speculative sales with fiduciary, goal-based financial distribution.',
    },
    {
      year: '2019',
      title: '₹100 Cr+ AUM Milestone',
      description: 'Crossed the landmark of ₹100 Crores in client assets under management with over 500 high-trust families across North India and NRI communities.',
    },
    {
      year: '2021',
      title: 'Establishment of Sahayak Gurukul',
      description: 'Launched our dedicated educational initiative to share unbiased investment literature, hosting seminars for young professionals and business owners.',
    },
    {
      year: '2023',
      title: 'Expansion into Financial Publishing',
      description: 'Authored and published landmark titles including "Heyy 18" and "Dear Son", expanding our mission to empower youth and families with financial wisdom.',
    },
    {
      year: '2025 - Present',
      title: '₹500 Cr+ AUM & 1,500+ Families',
      description: 'Celebrating 11+ years of sustained practice, managing ₹500 Cr+ with an industry-leading 98% client retention rate.',
    },
  ];

  return (
    <div className="w-full bg-[#FAF7F2] text-[#11243B]">
      {/* Header */}
      <section className="bg-[#071526] text-white py-20 border-b border-stone-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="text-xs font-semibold tracking-widest text-[#C9A24E] uppercase">
            11+ YEARS OF TRUST &amp; DISCIPLINE
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
            Our <span className="italic font-normal text-[#DEBF6A]">Achievements</span>
          </h1>
          <p className="text-stone-300 text-sm max-w-xl mx-auto">
            Milestones of stewardship, growth, and long-term partnerships built on unwavering client-first principles.
          </p>
        </div>
      </section>

      {/* Counters Strip */}
      <section className="py-12 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-stone-200">
            <div>
              <div className="text-4xl font-serif font-bold text-[#071526]">11<span className="text-[#C9A24E]">+</span></div>
              <div className="text-xs font-mono text-stone-500 mt-1 uppercase">Years in Wealth Management</div>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-[#071526]">1,500<span className="text-[#C9A24E]">+</span></div>
              <div className="text-xs font-mono text-stone-500 mt-1 uppercase">Families Guided</div>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-[#071526]">98<span className="text-[#C9A24E]">%</span></div>
              <div className="text-xs font-mono text-stone-500 mt-1 uppercase">Client Retention Rate</div>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-[#C9A24E]">₹500 Cr+</div>
              <div className="text-xs font-mono text-stone-500 mt-1 uppercase">Assets Under Management</div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestone Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-[#071526]">
              A Decade of Measured Compounding
            </h2>
          </div>

          <div className="relative border-l-2 border-[#C9A24E]/40 ml-4 sm:ml-32 space-y-12 py-4">
            {milestones.map((item, idx) => (
              <div key={idx} className="relative pl-8 sm:pl-12 group">
                {/* Year Marker */}
                <div className="sm:absolute sm:-left-32 sm:text-right sm:w-24 top-0 font-mono font-bold text-lg text-[#C9A24E]">
                  {item.year}
                </div>

                {/* Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#071526] border-2 border-[#C9A24E] group-hover:scale-125 transition-transform" />

                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:border-[#C9A24E] transition-all">
                  <h3 className="font-serif font-bold text-lg text-[#071526]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-12 text-center">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-[#071526] bg-[#C9A24E] hover:bg-[#DEBF6A] transition-colors shadow-md"
            >
              Partner With Our Practice →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
