import React from 'react';
import { useStore } from '../../context/StoreContext';

export const BrochuresView: React.FC = () => {
  const { navigate } = useStore();

  const brochures = [
    {
      title: 'Sahayak Associates — Corporate Profile 2026',
      description: 'An executive overview of our practice, founders, AMFI registration, and family CFO advisory architecture.',
      format: 'PDF',
      size: '2.4 MB',
      updated: 'January 2026',
    },
    {
      title: 'The 3I Concept Investor Blueprint',
      description: 'A deep-dive guide into balancing Insurance, Investment, and Inheritance across multiple decades.',
      format: 'PDF',
      size: '3.1 MB',
      updated: 'February 2026',
    },
    {
      title: 'Mutual Funds & Systematic Compounding Handbook',
      description: 'Everything you need to know about navigating volatility, equity vs. debt allocation, and rupee-cost averaging.',
      format: 'PDF',
      size: '1.8 MB',
      updated: 'March 2026',
    },
    {
      title: 'Estate Planning & Will Drafting Checklist',
      description: 'Essential checklist for safeguarding family real estate, liquid securities, and business shares.',
      format: 'PDF',
      size: '1.2 MB',
      updated: 'December 2025',
    },
  ];

  return (
    <div className="w-full bg-[#FAF7F2] text-[#11243B]">
      <section className="bg-[#071526] text-white py-20 border-b border-stone-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="text-xs font-semibold tracking-widest text-[#C9A24E] uppercase">
            SAHAYAK GURUKUL
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
            Brochures &amp; <span className="italic font-normal text-[#DEBF6A]">Publications</span>
          </h1>
          <p className="text-stone-300 text-sm max-w-xl mx-auto">
            Official literature, strategy dossiers, and educational guides prepared by Sahayak Associates.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {brochures.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-[#C9A24E] transition-all"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold bg-[#FAF7F2] text-[#C9A24E] border border-stone-200 px-2 py-0.5 rounded">
                    {item.format}
                  </span>
                  <span className="text-xs text-stone-400">Updated: {item.updated} · {item.size}</span>
                </div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#071526]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => alert(`Downloading "${item.title}"...`)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#071526] bg-[#C9A24E] hover:bg-[#DEBF6A] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Download PDF</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          <div className="pt-10 text-center">
            <button
              onClick={() => navigate('/gurukul')}
              className="text-xs font-semibold text-stone-600 hover:text-[#C9A24E] transition-colors"
            >
              ← Back to Gurukul Hub
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
