import React from 'react';

const values = [
  {
    title: 'Access For Everyone',
    description: 'We design opportunities so students from every background can find practical paths to grow.',
    icon: 'A'
  },
  {
    title: 'Career-First Learning',
    description: 'Scholarships and internships are mapped to real roles so progress translates into employability.',
    icon: 'C'
  },
  {
    title: 'Trust & Transparency',
    description: 'Clear timelines, verified listings, and honest status updates give students confidence to apply.',
    icon: 'T'
  }
];

export default function AboutPage() {
  return (
    <div className="px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <div className="mx-auto grid w-full max-w-7xl gap-8">
        <section className="glass-panel fade-rise rounded-[28px] px-6 py-10 sm:px-10 sm:py-12">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand-500)]">About EduLift</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight text-[var(--foreground)] sm:text-5xl">
            We help students move from ambition to opportunity.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[rgba(15,31,61,0.78)] sm:text-lg">
            EduLift was built to close the gap between academic goals and practical career outcomes. We combine scholarship access, internship discovery, and profile-driven tracking in one place.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="glass-card p-6 sm:p-7">
            <h2 className="text-2xl font-extrabold text-[var(--brand-700)]">Our Mission</h2>
            <p className="mt-3 text-sm leading-7 text-[rgba(15,31,61,0.8)] sm:text-base">
              To make quality education pathways financially and professionally achievable for every student by connecting them to trusted opportunities at the right time.
            </p>
          </article>
          <article className="glass-card p-6 sm:p-7">
            <h2 className="text-2xl font-extrabold text-[var(--brand-700)]">Our Vision</h2>
            <p className="mt-3 text-sm leading-7 text-[rgba(15,31,61,0.8)] sm:text-base">
              A world where students no longer struggle to discover funding or career exposure, because opportunity is personalized, visible, and actionable.
            </p>
          </article>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {values.map((item) => (
            <article key={item.title} className="glass-card p-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[linear-gradient(110deg,var(--brand-600),var(--accent))] text-sm font-extrabold text-white">
                {item.icon}
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-[var(--brand-700)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[rgba(15,31,61,0.8)]">{item.description}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
