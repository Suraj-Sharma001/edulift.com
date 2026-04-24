'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [editForm, setEditForm] = useState({
    phone: '',
    college: '',
    degree: '',
    graduationYear: '',
    resume: ''
  });

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const userStr = localStorage.getItem('user');

    if (authStatus !== 'true' || !userStr) {
      router.push('/Login');
      return;
    }

    const user = JSON.parse(userStr);
    
    // Check if user is a recruiter - if so, redirect to recruiter dashboard
    if (user.role === 'recruiter') {
      router.push('/Recruiter-Dashboard');
      return;
    }

    setUserProfile(user);
    
    // Fetch full profile from API (candidate only)
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/candidate/profile', {
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok) {
          setUserProfile(prev => ({
            ...prev,
            ...data.profile
          }));
          setEditForm({
            phone: data.profile.phone || '',
            college: data.profile.college || '',
            degree: data.profile.degree || '',
            graduationYear: data.profile.graduationYear || '',
            resume: data.profile.resume || ''
          });
        }
      } catch (err) {
        console.error('Fetch profile error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const res = await fetch('/api/candidate/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(editForm)
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to update profile');
        return;
      }

      setUserProfile(prev => ({
        ...prev,
        ...data.profile
      }));
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="px-6 py-10 text-[var(--brand-700)]">Loading profile...</div>;
  }

  if (!userProfile) {
    return (
      <div className="px-6 py-10">
        <div className="glass-card mx-auto max-w-xl p-8 text-center">
          <p className="text-[var(--brand-700)]">Please login to view your profile.</p>
          <Link href="/Login" className="btn-primary mt-4">Go to Login</Link>
        </div>
      </div>
    );
  }

  const isProfileComplete = !!(
    userProfile.name && 
    userProfile.email && 
    editForm.phone && 
    editForm.college && 
    editForm.degree && 
    editForm.graduationYear && 
    editForm.resume
  );

  return (
    <div className="px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <div className="mx-auto grid w-full max-w-7xl gap-8">
        {successMessage && (
          <div className="glass-card rounded-[20px] bg-[rgba(18,184,134,0.1)] p-4 text-[#0f7e5d]">
            {successMessage}
          </div>
        )}

        <section className="glass-panel fade-rise rounded-[28px] px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[linear-gradient(110deg,var(--brand-600),var(--accent))] text-2xl font-extrabold text-white">
                {(userProfile.name || 'U').charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[var(--brand-700)]">{userProfile.name || 'Profile'}</h1>
                <p className="text-sm text-[rgba(15,31,61,0.65)]">{userProfile.email}</p>
              </div>
            </div>
            {isProfileComplete && (
              <span className="inline-block rounded-full bg-[rgba(18,184,134,0.12)] px-4 py-2 text-sm font-semibold text-[#0f7e5d]">
                ✓ Profile Complete
              </span>
            )}
            {!isProfileComplete && (
              <span className="inline-block rounded-full bg-[rgba(255,138,61,0.14)] px-4 py-2 text-sm font-semibold text-[#b35a19]">
                ⚠ Incomplete Profile
              </span>
            )}
          </div>
        </section>

        <section className="glass-card rounded-[28px] p-6 sm:p-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[var(--brand-700)]">Profile Information</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-outline text-sm"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {!isEditing ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-[20px] bg-[rgba(30,111,208,0.04)] p-6">
                <label className="text-xs font-semibold uppercase tracking-wide text-[rgba(15,31,61,0.65)]">Full Name</label>
                <p className="mt-2 text-lg font-semibold text-[var(--brand-700)]">{userProfile.name}</p>
              </div>
              <div className="rounded-[20px] bg-[rgba(30,111,208,0.04)] p-6">
                <label className="text-xs font-semibold uppercase tracking-wide text-[rgba(15,31,61,0.65)]">Email</label>
                <p className="mt-2 text-lg font-semibold text-[var(--brand-700)]">{userProfile.email}</p>
              </div>
              <div className="rounded-[20px] bg-[rgba(30,111,208,0.04)] p-6">
                <label className="text-xs font-semibold uppercase tracking-wide text-[rgba(15,31,61,0.65)]">Phone</label>
                <p className="mt-2 text-lg font-semibold text-[var(--brand-700)]">{editForm.phone || '—'}</p>
              </div>
              <div className="rounded-[20px] bg-[rgba(30,111,208,0.04)] p-6">
                <label className="text-xs font-semibold uppercase tracking-wide text-[rgba(15,31,61,0.65)]">College</label>
                <p className="mt-2 text-lg font-semibold text-[var(--brand-700)]">{editForm.college || '—'}</p>
              </div>
              <div className="rounded-[20px] bg-[rgba(30,111,208,0.04)] p-6">
                <label className="text-xs font-semibold uppercase tracking-wide text-[rgba(15,31,61,0.65)]">Degree</label>
                <p className="mt-2 text-lg font-semibold text-[var(--brand-700)]">{editForm.degree || '—'}</p>
              </div>
              <div className="rounded-[20px] bg-[rgba(30,111,208,0.04)] p-6">
                <label className="text-xs font-semibold uppercase tracking-wide text-[rgba(15,31,61,0.65)]">Graduation Year</label>
                <p className="mt-2 text-lg font-semibold text-[var(--brand-700)]">{editForm.graduationYear || '—'}</p>
              </div>
              <div className="col-span-1 md:col-span-2 rounded-[20px] bg-[rgba(30,111,208,0.04)] p-6">
                <label className="text-xs font-semibold uppercase tracking-wide text-[rgba(15,31,61,0.65)]">Resume</label>
                <p className="mt-2 text-sm text-[var(--brand-700)] break-all">{editForm.resume ? editForm.resume.substring(0, 100) + '...' : '—'}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[var(--brand-700)] mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="input-field w-full"
                  value={editForm.phone}
                  onChange={onChange}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--brand-700)] mb-2">College</label>
                <input
                  type="text"
                  name="college"
                  placeholder="Enter your college name"
                  className="input-field w-full"
                  value={editForm.college}
                  onChange={onChange}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--brand-700)] mb-2">Degree</label>
                <input
                  type="text"
                  name="degree"
                  placeholder="e.g., B.Tech, BA, BSc"
                  className="input-field w-full"
                  value={editForm.degree}
                  onChange={onChange}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--brand-700)] mb-2">Graduation Year</label>
                <input
                  type="text"
                  name="graduationYear"
                  placeholder="e.g., 2024"
                  className="input-field w-full"
                  value={editForm.graduationYear}
                  onChange={onChange}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--brand-700)] mb-2">Resume (Mandatory)</label>
                <textarea
                  name="resume"
                  placeholder="Paste your resume text or describe your qualifications..."
                  className="input-field w-full min-h-[120px] resize-none"
                  value={editForm.resume}
                  onChange={onChange}
                />
              </div>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="btn-primary w-full"
              >
                {isSaving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          )}
        </section>

        {!isProfileComplete && (
          <section className="glass-card rounded-[28px] border border-[rgba(255,138,61,0.3)] bg-[rgba(255,138,61,0.04)] p-6 sm:p-10">
            <h3 className="text-lg font-bold text-[#b35a19] mb-2">Complete Your Profile</h3>
            <p className="text-sm text-[#b35a19]">
              To apply for internships and scholarships, you need to complete all profile fields including phone, college, degree, graduation year, and resume.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

