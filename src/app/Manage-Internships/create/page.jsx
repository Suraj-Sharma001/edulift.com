"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateInternshipPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    duration: '3 months',
    mode: 'Remote',
    stipend: 'Stipend Available'
  });

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      alert('Please fill title and description.');
      return;
    }

    try {
      const raw = localStorage.getItem('recruiterInternships');
      const existing = raw ? JSON.parse(raw) : [];
      const next = [
        {
          id: Date.now().toString(),
          ...form,
          createdAt: new Date().toISOString()
        },
        ...(Array.isArray(existing) ? existing : [])
      ];
      localStorage.setItem('recruiterInternships', JSON.stringify(next));
      router.push('/Manage-Internships');
    } catch (err) {
      console.error('Failed to save internship', err);
      alert('Could not save internship. Please try again.');
    }
  };

  return (
    <div className="px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <div className="glass-panel fade-rise mx-auto w-full max-w-3xl rounded-[28px] px-6 py-8 sm:px-10 sm:py-10">
        <h1 className="text-3xl font-extrabold text-[var(--brand-700)]">Create Internship</h1>
        <p className="mt-2 text-sm text-[rgba(15,31,61,0.72)]">Post a concise role summary candidates can trust and act on quickly.</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="mb-1 block text-sm font-semibold text-[var(--brand-700)]">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={onChange}
              className="input-field"
              placeholder="e.g. Frontend Developer Intern"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-[var(--brand-700)]">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              className="input-field min-h-28"
              placeholder="Describe role responsibilities and requirements"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-sm font-semibold text-[var(--brand-700)]">Duration</label>
              <input
                name="duration"
                value={form.duration}
                onChange={onChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-[var(--brand-700)]">Mode</label>
              <select name="mode" value={form.mode} onChange={onChange} className="input-field">
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On-site</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-[var(--brand-700)]">Stipend</label>
              <input
                name="stipend"
                value={form.stipend}
                onChange={onChange}
                className="input-field"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary rounded-xl px-5 py-2.5">
              Save Internship
            </button>
            <button
              type="button"
              onClick={() => router.push('/Manage-Internships')}
              className="btn-outline rounded-xl px-5 py-2.5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
