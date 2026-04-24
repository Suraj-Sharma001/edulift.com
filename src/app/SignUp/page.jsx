"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companySize, setCompanySize] = useState('1-10 employees');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  async function registerUser(e) {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedRole) {
      setErrorMessage('Please choose Candidate or Recruiter before creating account.');
      return;
    }

    if (!name || !email || !password) {
      setErrorMessage('Please fill all required fields.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          email, 
          password, 
          role: selectedRole,
          ...(selectedRole === 'recruiter' ? { companySize } : {})
        }),  
      });
      
      const data = await res.json();
      if(data.ok) {
        // Auto-login: server sets HttpOnly cookie; store user info locally and redirect
        const { user } = data;
        try {
          localStorage.setItem('isAuthenticated', 'true');
          const userDataForStorage = { username: user.name, email: user.email, role: user.role, _id: user._id };
          localStorage.setItem('user', JSON.stringify(userDataForStorage));
          window.dispatchEvent(new Event('storage'));
        } catch (e) {
          // ignore storage errors
        }
        router.push('/');
      } else {
        setErrorMessage(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('An error occurred during registration');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="glass-panel fade-rise mx-auto w-full max-w-xl rounded-[28px]">
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <h1 className="text-center text-3xl font-extrabold text-[var(--brand-700)] sm:text-4xl">
            Create Account
          </h1>
          <p className="mt-2 text-center text-sm text-[rgba(15,31,61,0.68)]">Launch your EduLift profile in a few steps.</p>

          {/* Role Selection */}
          <div className="mb-6 mt-7 flex space-x-3">
            <button
              onClick={() => setSelectedRole('candidate')}
              className={`w-1/2 rounded-2xl py-3 text-sm font-semibold transition-all duration-300 ease-in-out transform ${
                selectedRole === 'candidate'
                  ? 'bg-[var(--brand-600)] text-white scale-[1.02] shadow-lg'
                  : 'bg-white/80 text-[var(--brand-700)] hover:bg-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Candidate
            </button>
            <button
              onClick={() => setSelectedRole('recruiter')}
              className={`w-1/2 rounded-2xl py-3 text-sm font-semibold transition-all duration-300 ease-in-out transform ${
                selectedRole === 'recruiter'
                  ? 'bg-[var(--brand-600)] text-white scale-[1.02] shadow-lg'
                  : 'bg-white/80 text-[var(--brand-700)] hover:bg-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Recruiter
            </button>
          </div>

          {/* Conditional Rendering Based on Role */}
          {selectedRole && (
            <form className="space-y-6" onSubmit={registerUser}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--brand-700)]">
                  {selectedRole === 'candidate' ? 'Full Name' : 'Company Name'}
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder={selectedRole === 'candidate' ? 'Enter your full name' : 'Enter company name'}
                    className="input-field"
                    style={{ paddingLeft: '3rem' }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--brand-700)]">
                  Email Address
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="input-field"
                    style={{ paddingLeft: '3rem' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {selectedRole === 'recruiter' && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[var(--brand-700)]">
                    Company Size
                  </label>
                  <select
                    className="input-field"
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                  >
                    <option>1-10 employees</option>
                    <option>11-50 employees</option>
                    <option>51-200 employees</option>
                    <option>201-500 employees</option>
                    <option>500+ employees</option>
                  </select>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--brand-700)]">
                  Password
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <input
                    type="password"
                    placeholder="Create a strong password"
                    className="input-field"
                    style={{ paddingLeft: '3rem' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                    minLength="8"
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{errorMessage}</p>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full rounded-2xl py-3.5 text-sm tracking-wide"
              >
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-[rgba(15,31,61,0.72)]">
            Already have an account? 
            <Link href="/Login" className="ml-1 font-semibold text-[var(--brand-600)] hover:text-[var(--brand-700)]">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;