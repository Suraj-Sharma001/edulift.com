import React from 'react';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';

const highlights = [
  {
    title: 'Mentor Network',
    description: 'Connect with experienced professionals and alumni for practical guidance.'
  },
  {
    title: 'Peer Collaboration',
    description: 'Share resources, referrals, and feedback with students across domains.'
  },
  {
    title: 'Opportunity Signals',
    description: 'Receive timely updates for scholarships and internships that match your profile.'
  }
];

export default function CommunityPage() {
  return (
    <div className="px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <div className="mx-auto grid w-full max-w-7xl gap-8">
        <section className="glass-panel fade-rise rounded-[28px] px-6 py-10 sm:px-10 sm:py-12">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand-500)]">Community</p>
          <h1 className="mt-3 text-4xl font-extrabold text-[var(--foreground)] sm:text-5xl">
            Learn faster with a community that actually supports your goals.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[rgba(15,31,61,0.78)] sm:text-lg">
            EduLift is more than listings. It is a student-centered ecosystem where opportunities, mentorship, and momentum come together.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="glass-card p-6 sm:p-8">
            <h2 className="text-2xl font-extrabold text-[var(--brand-700)]">Creator Spotlight</h2>
            <p className="mt-3 text-sm leading-7 text-[rgba(15,31,61,0.8)] sm:text-base">
              Suraj Sharma built EduLift to simplify how students discover scholarships and early-career opportunities. The platform is evolving with a focus on clarity, trust, and measurable student outcomes.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://github.com/Suraj-Sharma001" className="btn-outline" aria-label="GitHub"><Github className="h-4 w-4" /> GitHub</a>
              <a href="https://linkedin.com/in/Suraj-sharma-99ab95270" className="btn-outline" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /> LinkedIn</a>
              <a href="https://instagram.com/sharma_suraj001" className="btn-outline" aria-label="Instagram"><Instagram className="h-4 w-4" /> Instagram</a>
              <a href="mailto:surajsharma60923@gmail.com" className="btn-outline" aria-label="Email"><Mail className="h-4 w-4" /> Email</a>
            </div>
          </article>

          <article className="glass-card p-6 sm:p-8">
            <h3 className="text-xl font-extrabold text-[var(--brand-700)]">Core Skills</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {['React', 'Next.js', 'MongoDB', 'UI Systems', 'API Architecture', 'EdTech'].map((skill) => (
                <span key={skill} className="rounded-full border border-[rgba(30,111,208,0.24)] bg-[rgba(30,111,208,0.1)] px-3 py-1.5 text-xs font-semibold text-[var(--brand-700)]">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.title} className="glass-card p-6">
              <h3 className="text-xl font-extrabold text-[var(--brand-700)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[rgba(15,31,61,0.8)]">{item.description}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
