"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const ManageInternships = () => {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('recruiterInternships');
      const parsed = raw ? JSON.parse(raw) : [];
      setInternships(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      console.error('Failed to load internships', err);
      setInternships([]);
    }
  }, []);

  return (
    <div className="px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <div className="mx-auto grid w-full max-w-6xl gap-8">
        <section className="glass-panel fade-rise rounded-[28px] px-6 py-10 sm:px-10 sm:py-12">
          <h1 className="text-4xl font-extrabold text-[var(--brand-700)]">Manage Internships</h1>
          <p className="mt-3 text-base leading-7 text-[rgba(15,31,61,0.8)]">Create, review, and maintain internship listings in one recruiter-friendly workspace.</p>
          <div className="mt-6">
            <Link href="/Manage-Internships/create" className="btn-primary">Create New Internship</Link>
          </div>
        </section>

        <section className="glass-card p-6 sm:p-8">
          <h2 className="text-xl font-extrabold text-[var(--brand-700)]">Your Internship Listings</h2>
          <div className="mt-4">
            {internships.length === 0 ? (
              <p className="text-[rgba(15,31,61,0.72)]">No internships yet. Create your first listing.</p>
            ) : (
              <div className="space-y-3 mt-4">
                {internships.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-[rgba(30,111,208,0.16)] bg-white/85 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-[var(--brand-700)]">{item.title}</h3>
                      <span className="text-sm font-semibold text-[var(--brand-500)]">{item.mode}</span>
                    </div>
                    <p className="mt-1 text-sm text-[rgba(15,31,61,0.72)]">{item.duration} | {item.stipend}</p>
                    <p className="mt-2 text-sm text-[rgba(15,31,61,0.85)]">{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManageInternships;
