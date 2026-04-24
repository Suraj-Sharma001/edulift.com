import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-14 sm:px-6 md:pt-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-130px] top-[-120px] h-[310px] w-[310px] rounded-full bg-[radial-gradient(circle,rgba(30,111,208,0.22),transparent_72%)]" />
        <div className="absolute bottom-[-170px] right-[-110px] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(255,138,61,0.2),transparent_70%)]" />
      </div>

      <div className="glass-panel fade-rise mx-auto grid w-full max-w-7xl gap-10 rounded-[28px] px-6 py-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-14">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-[rgba(30,111,208,0.18)] bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand-700)]">
            Education Opportunity Platform
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.08] text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            Build your
            <span className="bg-[linear-gradient(100deg,var(--brand-600),var(--accent))] bg-clip-text text-transparent"> future faster </span>
            with scholarships and internships that fit.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[rgba(15,31,61,0.8)] sm:text-lg">
            EduLift connects ambitious students with verified funding and real project experience. Discover personalized paths, apply faster, and track progress from one dashboard.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/Scholarships" className="btn-primary">
              Explore Scholarships
            </Link>
            <Link href="/Internships" className="btn-outline">
              Browse Internships
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-5 text-sm text-[var(--brand-700)]">
            <div>
              <p className="text-2xl font-extrabold">15k+</p>
              <p className="font-medium">student members</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold">1200+</p>
              <p className="font-medium">active opportunities</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold">94%</p>
              <p className="font-medium">application success rate</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 self-center sm:grid-cols-2 lg:grid-cols-1">
          <div className="glass-card p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--brand-500)]">Scholarship Match</p>
            <h3 className="mt-2 text-lg font-extrabold text-[var(--brand-700)]">Merit + Need Scoring</h3>
            <p className="mt-2 text-sm leading-6 text-[rgba(15,31,61,0.75)]">Intelligent matching surfaces high-probability programs based on your profile and deadlines.</p>
          </div>

          <div className="glass-card p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--mint)]">Career Readiness</p>
            <h3 className="mt-2 text-lg font-extrabold text-[var(--brand-700)]">Micro Internship Tracks</h3>
            <p className="mt-2 text-sm leading-6 text-[rgba(15,31,61,0.75)]">Gain verified experience with remote-friendly internships and transparent status updates.</p>
          </div>
        </div>
      </div>
    </section>
  );  
}
