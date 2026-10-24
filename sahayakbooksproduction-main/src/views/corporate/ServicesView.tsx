import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export const ServicesView: React.FC = () => {
  const { navigate } = useStore();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'growth' | 'protection' | 'legacy' | 'planning'>('all');

  const allServices = [
    {
      id: 'mutual-funds',
      category: 'growth',
      title: 'Mutual Funds Distribution',
      subtitle: 'Wealth Creation & Systematic Investing',
      icon: '📈',
      description: 'We help you invest in professionally managed mutual funds tailored to your goals and risk profile — with access to top fund houses across equity, debt, and hybrid categories.',
      benefits: ['Goal-based SIP & Lumpsum planning', 'Asset rebalancing & risk monitoring', 'Direct portfolio reviews bi-annually'],
    },
    {
      id: 'insurance',
      category: 'protection',
      title: 'Insurance Products Distribution',
      subtitle: 'Life, Health & Asset Protection',
      icon: '🛡️',
      description: 'Protect what matters most. We offer a curated range of life, health, and critical illness insurance products to ensure comprehensive financial safety for your family and businesses.',
      benefits: ['Term insurance coverage evaluation', 'High-sum insured family health shields', 'Keyman & business liability coverage'],
    },
    {
      id: 'capital-markets',
      category: 'growth',
      title: 'Capital Markets – Direct Equity & PMS',
      subtitle: 'Bespoke Stock & Portfolio Management',
      icon: '🏛️',
      description: 'Invest confidently in the Indian stock market with seasoned research guidance. From curated bluechip portfolios to high-conviction PMS strategies for HNIs.',
      benefits: ['Discretionary & Non-Discretionary PMS', 'Fundamental long-term research focus', 'Direct interaction with fund managers'],
    },
    {
      id: 'estate-planning',
      category: 'legacy',
      title: 'Estate Planning & Will Drafting',
      subtitle: 'Generational Legacy Preservation',
      icon: '📜',
      description: 'Ensure seamless transition of family wealth with legally robust wills, family private trusts, and generational asset protection mechanisms.',
      benefits: ['Confidential family will drafting', 'Private family trusts establishment', 'Seamless estate succession without probate delays'],
    },
    {
      id: 'fixed-income',
      category: 'planning',
      title: 'Fixed Income & Corporate Fixed Deposits',
      subtitle: 'Capital Preservation & Regular Yield',
      icon: '💰',
      description: 'Secure, high-credit fixed-income instruments, AAA-rated corporate FDs, and RBI-regulated bonds for steady cash flow and capital preservation.',
      benefits: ['Higher yields than traditional bank savings', 'Structured monthly / quarterly income', 'Sovereign and high-grade safety'],
    },
    {
      id: 'retirement',
      category: 'planning',
      title: 'Retirement Planning & NPS',
      subtitle: 'Financial Freedom For Your Golden Years',
      icon: '🏖️',
      description: 'Structured retirement corpus creation, pension solutions, and National Pension System distribution to ensure financial independence for life.',
      benefits: ['Inflation-adjusted retirement target calculations', 'Tax-efficient NPS Tier I & II distribution', 'Guaranteed annuity & pension stream design'],
    },
    {
      id: 'aif',
      category: 'growth',
      title: 'Alternative Investment Funds (AIF)',
      subtitle: 'Private Equity & Venture Strategies',
      icon: '🚀',
      description: 'Access curated Category I, II, and III Alternative Investment Funds targeting pre-IPO, private equity, venture debt, and long-short strategies for accredited investors.',
      benefits: ['Non-market correlated high-growth returns', 'Exclusive institutional fund managers', 'Sophisticated risk mitigation structures'],
    },
    {
      id: 'sgb-gold',
      category: 'protection',
      title: 'Sovereign Gold Bonds & Digital Bullion',
      subtitle: 'Strategic Gold Allocation',
      icon: '✨',
      description: 'Sovereign Gold Bonds (SGB) offering annual interest plus capital appreciation without storage charges, alongside digital gold allocation.',
      benefits: ['2.50% p.a. guaranteed sovereign interest', 'Tax-free capital gains on maturity', 'Zero making charges or purity risks'],
    },
    {
      id: 'tax-planning',
      category: 'planning',
      title: 'Tax Planning & Optimization Strategy',
      subtitle: 'Legitimate Tax Efficiency Across Portfolios',
      icon: '⚖️',
      description: 'Strategic portfolio positioning to minimize capital gains, optimize dividend taxation, and leverage tax deductions under applicable IT provisions.',
      benefits: ['Capital gains tax harvesting', 'Deduction maximization across Sec 80C/80D', 'HUF (Hindu Undivided Family) tax efficiency'],
    },
    {
      id: 'nri-services',
      category: 'growth',
      title: 'Global & NRI Investment Services',
      subtitle: 'FEMA-Compliant Wealth Building In India',
      icon: '🌐',
      description: 'Dedicated financial planning for Non-Resident Indians seeking to participate in India’s multi-trillion dollar growth trajectory with full FEMA and repatriable compliance.',
      benefits: ['NRE / NRO account setup & management', 'Repatriation assistance under Form 15CA/CB', 'Direct video consultations across global timezones'],
    },
    {
      id: 'family-office',
      category: 'legacy',
      title: 'Family CFO & Succession Advisory',
      subtitle: 'Holistic Balance Sheet Stewardship',
      icon: '👑',
      description: 'Acting as your dedicated personal CFO to manage family governance, business liquidity, philanthropy, and inter-generational wealth transfer.',
      benefits: ['Single consolidated family balance sheet', 'Multi-generational financial education', 'Independent conflict-free fiduciary approach'],
    },
    {
      id: 'goal-wealth',
      category: 'planning',
      title: 'Goal-Based Wealth Creation',
      subtitle: 'Child Higher Education & Life Milestones',
      icon: '🎯',
      description: 'Earmarking distinct asset pools for children’s international education, daughter’s wedding, dream property purchases, or venture capital seed funds.',
      benefits: ['Custom maturity timeline matching', 'Education inflation hedging (10-12% p.a.)', 'Emergency protection rings'],
    },
    {
      id: 'liquidity-emergency',
      category: 'protection',
      title: 'Emergency & Liquidity Reserves',
      subtitle: 'Unshakable Peace of Mind',
      icon: '🌊',
      description: 'Design of 6 to 12 months liquid emergency reserves parked in high-liquidity, overnight, or ultra-short duration funds with T+1 redemption access.',
      benefits: ['Zero market volatility exposure', 'Instant bank account withdrawal access', 'Protection against premature asset liquidation'],
    },
    {
      id: 'health-checkup',
      category: 'planning',
      title: '360° Financial Health Audit & Rebalancing',
      subtitle: 'Bi-Annual Strategic Portfolio Clean-Up',
      icon: '🩺',
      description: 'Comprehensive forensic analysis of your existing investments to eliminate underperforming schemes, high-expense ratios, and asset overlap.',
      benefits: ['Detailed X-Ray of mutual fund holdings', 'Expense ratio and turnover audit', 'Clear written action plan with exit timetable'],
    },
  ];

  const filteredServices = allServices.filter((srv) => {
    if (selectedFilter === 'all') return true;
    return srv.category === selectedFilter;
  });

  return (
    <div className="w-full bg-[#FAF7F2] text-[#11243B]">
      {/* Hero Header */}
      <section className="bg-[#071526] text-white py-20 border-b border-stone-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,78,0.15)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C9A24E] uppercase">
            <span>THE SAHAYAK PRODUCT BASKET</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Our 14 Corporate <span className="italic font-normal text-[#DEBF6A]">Financial Services</span>
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            From growing your wealth to generational legacy preservation — institutional discipline tailored for every stage of your family&apos;s journey.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {[
              { id: 'all', label: 'All 14 Services' },
              { id: 'growth', label: 'Wealth Growth' },
              { id: 'protection', label: 'Insurance & Protection' },
              { id: 'legacy', label: 'Legacy & Estate' },
              { id: 'planning', label: 'Planning & Advisory' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedFilter === tab.id
                    ? 'bg-[#C9A24E] text-[#071526] font-bold shadow-md'
                    : 'bg-[#102542] text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-7 border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-[#C9A24E] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-3 rounded-xl bg-[#FAF7F2] border border-stone-200">
                      {service.icon}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-[#C9A24E] uppercase font-semibold bg-[#F5F2EA] px-2.5 py-1 rounded-full">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#071526] group-hover:text-[#C9A24E] transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-xs text-[#738094] font-medium mt-0.5 mb-3">
                    {service.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="border-t border-stone-100 pt-4 space-y-2">
                    <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                      Key Highlights:
                    </div>
                    {service.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                        <span className="text-[#C9A24E] font-bold">✓</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100">
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold text-[#071526] bg-[#FAF7F2] hover:bg-[#C9A24E] hover:text-white transition-colors border border-stone-200"
                  >
                    Consult on this service →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Consultation CTA banner */}
          <div className="mt-20 rounded-2xl bg-gradient-to-r from-[#071526] via-[#102542] to-[#071526] text-white p-10 text-center shadow-xl border border-[#C9A24E]/30 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">
              Unsure which financial solution fits your family&apos;s goals?
            </h2>
            <p className="text-stone-300 text-sm max-w-xl mx-auto">
              Schedule an introductory financial health checkup with our Chandigarh advisory desk.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-[#071526] bg-gradient-to-r from-[#DEBF6A] via-[#C9A24E] to-[#B08B43] hover:shadow-lg transition-all"
              >
                Schedule A Confidential Review →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
