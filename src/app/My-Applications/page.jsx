"use client";

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const MyApplications = () => {
  const router = useRouter();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuth) {
      router.push('/Login?returnUrl=' + encodeURIComponent(window.location.pathname));
      return;
    }

    (async () => {
      try {
        const res = await fetch('/api/auth/my-applications', {
          credentials: 'include'
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Failed to load applications');
          setLoading(false);
          return;
        }
        setApps(data.applications || []);
        setLoading(false);
      } catch (err) {
        console.error('Load apps error', err);
        setError('Error loading applications');
        setLoading(false);
      }
    })();
  }, [router]);

  if (loading) return <div className="px-6 py-10 text-[var(--brand-700)]">Loading applications...</div>;

  if (error) return (
    <div className="px-6 py-10">
      <div className="glass-card rounded-[28px] p-6 text-center bg-[rgba(224,70,70,0.12)]">
        <p className="text-[#ae2a2a]">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <div className="mx-auto grid w-full max-w-5xl gap-8">
        <section className="glass-panel fade-rise rounded-[28px] px-6 py-10 sm:px-10 sm:py-12">
          <h1 className="text-3xl font-extrabold text-[var(--brand-700)]">My Applications</h1>
          <p className="mt-2 text-sm text-[rgba(15,31,61,0.72)]">Track progress and status changes across your applications.</p>
        </section>

        <section className="glass-card p-6 sm:p-8">
          {apps.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-[rgba(15,31,61,0.72)]">You haven&apos;t applied to any opportunities yet.</p>
              <p className="mt-2 text-sm text-[rgba(15,31,61,0.65)]">Explore internships and scholarships to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {apps.map(app => (
                <div key={app._id} className="rounded-2xl border border-[rgba(30,111,208,0.16)] bg-white/85 p-5 hover:border-[rgba(30,111,208,0.3)] transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block rounded-full bg-[rgba(30,111,208,0.12)] px-2 py-1 text-xs font-bold text-[var(--brand-700)]">
                          {app.type || 'Application'}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-[var(--brand-700)]">
                        {app.listingId?.title || app.position || 'Application'}
                      </h3>
                      <p className="text-sm text-[rgba(15,31,61,0.65)] mt-1">Applied on: {new Date(app.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={app.status} />
                    </div>
                  </div>
                  <ProgressBar status={app.status} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const statusMap = {
    'Applied': { bg: 'bg-[rgba(30,111,208,0.12)]', text: 'text-[var(--brand-700)]', label: '📝 Applied' },
    'Under Review': { bg: 'bg-[rgba(255,138,61,0.14)]', text: 'text-[#b35a19]', label: '👀 Under Review' },
    'Shortlisted': { bg: 'bg-[rgba(18,184,134,0.12)]', text: 'text-[#0f7e5d]', label: '⭐ Shortlisted' },
    'Selected': { bg: 'bg-[rgba(18,184,134,0.16)]', text: 'text-[#0f7e5d]', label: '✅ Selected' },
    'Rejected': { bg: 'bg-[rgba(224,70,70,0.12)]', text: 'text-[#ae2a2a]', label: '❌ Rejected' }
  };
  
  const config = statusMap[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };
  
  return (
    <span className={`px-4 py-2 rounded-full text-sm font-bold ${config.bg} ${config.text} whitespace-nowrap`}>
      {config.label}
    </span>
  );
};

const ProgressBar = ({ status }) => {
  const stages = ['Applied', 'Under Review', 'Shortlisted', 'Selected'];
  const statusIndex = stages.indexOf(status);
  const index = statusIndex === -1 ? (status === 'Rejected' ? -1 : 0) : statusIndex;
  const progress = status === 'Rejected' ? 0 : ((index + 1) / stages.length) * 100;

  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-[rgba(15,31,61,0.62)]">
        {stages.map(s => (
          <div key={s} className="flex-1 text-center">{s}</div>
        ))}
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[rgba(30,111,208,0.12)]">
        <div 
          className={`h-full transition-all duration-300 ${status === 'Rejected' ? 'bg-[rgba(224,70,70,0.6)]' : 'bg-[linear-gradient(110deg,var(--brand-600),var(--accent))]'}`}
          style={{ width: status === 'Rejected' ? '0%' : `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default MyApplications;
