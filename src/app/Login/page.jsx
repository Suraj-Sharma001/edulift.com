"use client"

import React, { useState, Suspense } from 'react';
// Importing necessary libraries and components
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'; // Import useRouter to handle redirection


const LoginContent = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Initialize router for navigation
  const searchParams = useSearchParams();


async function loginUser(e) {
  e.preventDefault();
  setErrorMessage('');

  if (!selectedRole) {
    setErrorMessage('Please choose Candidate or Recruiter before logging in.');
    return;
  }

  if (!email || !password) {
    setErrorMessage('Please enter both email and password.');
    return;
  }

  setIsSubmitting(true);
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),  
    });
    
    const data = await res.json();
    
    if(data.ok) {
      const { user } = data;

      if (user.role !== selectedRole) {
        setErrorMessage(`This account is registered as ${user.role}. Please select ${user.role} role.`);
        setIsSubmitting(false);
        return;
      }
      
      // Store authentication flag and user info locally (token is set as HttpOnly cookie)
      localStorage.setItem('isAuthenticated', 'true');
      const userDataForStorage = {
        username: user.name,
        email: user.email,
        role: user.role,
        _id: user._id
      };
      localStorage.setItem('user', JSON.stringify(userDataForStorage));
      
      // Trigger a storage event to update other components
      window.dispatchEvent(new Event('storage'));

      const returnUrl = searchParams.get('returnUrl');
      const safeReturnUrl = returnUrl && returnUrl.startsWith('/') ? returnUrl : null;
      
      // Redirect based on role
      if (safeReturnUrl) {
        router.push(safeReturnUrl);
      } else if (user.role === 'recruiter') {
        router.push('/Recruiter-Dashboard');
      } else {
        router.push('/');
      }
      
    } else {
      setErrorMessage(data.error || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    setErrorMessage('An error occurred during login');
  } finally {
    setIsSubmitting(false);
  }
}

  const handleOAuthLogin = () => {
    alert('OAuth login is not configured yet. Please use email and password.');
  };


  return (
    <div className="min-h-[calc(100vh-80px)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="glass-panel fade-rise mx-auto w-full max-w-xl rounded-[28px] transition-all duration-300">
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <h1 className="text-center text-3xl font-extrabold text-[var(--brand-700)] sm:text-4xl">
            Login
          </h1>
          <p className="mt-2 text-center text-sm text-[rgba(15,31,61,0.68)]">Welcome back. Continue your learning journey.</p>

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

          { selectedRole && (
            <form className="space-y-6" onSubmit={loginUser}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--brand-700)]">
                  {selectedRole === 'candidate' ? 'Email Address' : 'Company Email'}
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
                    placeholder={selectedRole === 'candidate' ? "you@example.com" : "company@example.com"}
                    className="input-field"
                    style={{ paddingLeft: '3rem' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>

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
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="input-field"
                    style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.781-1.781zm4.261 4.262l1.514 1.514a2.003 2.003 0 012.345 2.345l1.514 1.514a4 4 0 00-5.373-5.373z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </button>
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
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </form>
          )}

          {/* Conditional Rendering Based on Role */}


          {/* Social Login Options */}
          <div className="mt-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-full border-t border-gray-300"></div>
              <span className="mx-2 text-gray-500 text-sm">OR</span>
              <div className="w-full border-t border-gray-300"></div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleOAuthLogin}
                className="w-full rounded-2xl bg-[#ea5a47] py-3 font-semibold text-white shadow-md transition-all hover:bg-[#d74b38]">
                Continue with Google
              </button>

              <button
                onClick={handleOAuthLogin}
                className="w-full rounded-2xl bg-[#0c6ea8] py-3 font-semibold text-white shadow-md transition-all hover:bg-[#0a5f90]">
                Continue with LinkedIn
              </button>
            </div>
          </div>


          <div className="mt-6 text-center text-sm text-[rgba(15,31,61,0.72)]">
            New Here? 
            <Link href="/SignUp" className="ml-1 font-semibold text-[var(--brand-600)] hover:text-[var(--brand-700)]">
              Create Your Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() { return <Suspense fallback={<div>Loading...</div>}><LoginContent /></Suspense>; }
