import HeroSection from '@/app/components/HeroSection';
import Link from 'next/link';

const stats = [
  { value: '$2.5M+', label: 'Scholarship funds distributed' },
  { value: '15,000+', label: 'Students supported' },
  { value: '1,200+', label: 'Partner organizations' }
];

const features = [
  {
    title: 'Funding Discovery',
    description: 'Find scholarships aligned to your profile, goals, and deadlines without endless searching.'
  },
  {
    title: 'Internship Pathways',
    description: 'Explore role-based internships designed to build real portfolio outcomes and confidence.'
  },
  {
    title: 'Progress Visibility',
    description: 'Track applications and status updates in one place so you always know what comes next.'
  }
];

const testimonials = [
  {
    quote: 'EduLift helped me identify opportunities I would have missed otherwise. My scholarship process became straightforward.',
    name: 'Alex Johnson',
    program: 'Computer Science'
  },
  {
    quote: 'The internship section gave me practical direction and I built projects that directly helped in interviews.',
    name: 'Maya Patel',
    program: 'Business Administration'
  },
  {
    quote: 'As a first-generation college student, I finally had a clear path and support system for financial aid.',
    name: 'Carlos Rodriguez',
    program: 'Engineering'
  }
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col pb-16">
      <HeroSection />

      <section className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto grid w-full max-w-7xl gap-8">
          <div className="grid gap-5 md:grid-cols-3">
            {stats.map((stat) => (
              <article key={stat.label} className="glass-card p-6 text-center">
                <p className="text-4xl font-extrabold text-[var(--brand-700)]">{stat.value}</p>
                <p className="mt-2 text-sm font-semibold text-[rgba(15,31,61,0.75)]">{stat.label}</p>
              </article>
            ))}
          </div>

          <section className="glass-panel rounded-[28px] px-6 py-10 sm:px-10 sm:py-12">
            <h2 className="text-3xl font-extrabold text-[var(--brand-700)] sm:text-4xl">How EduLift Helps You Move Faster</h2>
            <p className="mt-3 max-w-3xl text-[rgba(15,31,61,0.78)]">
              A focused platform where scholarships, internships, and profile growth work together instead of scattered tools.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {features.map((feature) => (
                <article key={feature.title} className="glass-card p-6">
                  <h3 className="text-xl font-extrabold text-[var(--brand-700)]">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[rgba(15,31,61,0.78)]">{feature.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="glass-panel rounded-[28px] p-6 sm:p-8">
              <h2 className="text-3xl font-extrabold text-[var(--brand-700)]">Ready to start your journey?</h2>
              <p className="mt-3 text-[rgba(15,31,61,0.78)]">
                Build a strong student profile, apply to opportunities faster, and track outcomes with confidence.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/SignUp" className="btn-primary">Create Account</Link>
                <Link href="/Scholarships" className="btn-outline">Explore Scholarships</Link>
              </div>
            </article>

            <article className="glass-card p-6 sm:p-8">
              <h3 className="text-2xl font-extrabold text-[var(--brand-700)]">What you get</h3>
              <ul className="mt-4 grid gap-2 text-sm font-medium text-[rgba(15,31,61,0.8)]">
                <li>• Personalized scholarship recommendations</li>
                <li>• Internship roles mapped by skill track</li>
                <li>• Deadline and progress visibility</li>
                <li>• Cleaner, faster application flow</li>
                <li>• Community-driven support</li>
              </ul>
            </article>
          </section>

          <section className="grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="glass-card p-6">
                <p className="text-sm italic leading-7 text-[rgba(15,31,61,0.82)]">&quot;{testimonial.quote}&quot;</p>
                <div className="mt-5">
                  <p className="font-bold text-[var(--brand-700)]">{testimonial.name}</p>
                  <p className="text-xs font-semibold text-[rgba(15,31,61,0.62)]">{testimonial.program}</p>
                </div>
              </article>
            ))}
          </section>
        </div>
      </section>
    </div>
  );
}
