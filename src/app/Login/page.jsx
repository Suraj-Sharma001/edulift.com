"use client"

import React, { use, useState } from 'react';
// Importing necessary libraries and components
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter to handle redirection
import { signIn } from 'next-auth/react';


const Page = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize router for navigation


async function loginUser() {
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
      const { token, user } = data;
      
      // Store authentication data
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', token);
      
      // Store user data with the correct structure for navbar
      const userDataForStorage = {
        username: user.name, // Map 'name' to 'username' for navbar compatibility
        email: user.email,
        role: user.role,
        _id: user._id
      };
      localStorage.setItem('user', JSON.stringify(userDataForStorage));
      
      // Trigger a storage event to update other components
      window.dispatchEvent(new Event('storage'));
      
      // Redirect to home page
      router.push('/');
      
    } else {
      alert(data.error || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred during login');
  }
}

  const handleOAuthLogin = async (provider) => signIn(provider, {callbackUrl: '/'});


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
        <div className="px-8 py-10 bg-white">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
            Login
          </h1>

          {/* Role Selection */}
          <div className="mb-6 flex space-x-4">
            <button
              onClick={() => setSelectedRole('candidate')}
              className={`w-1/2 py-3 rounded-xl transition-all duration-300 ease-in-out transform ${
                selectedRole === 'candidate'
                  ? 'bg-blue-600 text-white scale-105 shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Candidate
            </button>
            <button
              onClick={() => setSelectedRole('recruiter')}
              className={`w-1/2 py-3 rounded-xl transition-all duration-300 ease-in-out transform ${
                selectedRole === 'recruiter'
                  ? 'bg-blue-600 text-white scale-105 shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Recruiter
            </button>
          </div>

          { selectedRole && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {selectedRole === 'candidate' ? 'Email Address' : 'Company Email'}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder={selectedRole === 'candidate' ? "you@example.com" : "company@example.com"}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
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
          
              <button 
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-md hover:shadow-lg font-semibold tracking-wider"
                onClick={loginUser}
              >
                Login
              </button>
            </div>
          )}

          {/* Conditional Rendering Based on Role */}


          {/* Social Login Options */}
          <div className="mt-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-full border-t border-gray-300"></div>
              <span className="mx-2 text-gray-500 text-sm">OR</span>
              <div className="w-full border-t border-gray-300"></div>
            </div>

            <button
              onClick={() => handleOAuthLogin("google")}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl mb-4 transition-all shadow-md">
              Continue with Google
            </button>

            <button
              onClick={() => handleOAuthLogin("linkedin")}
              className="w-full bg-[#0077b5] hover:bg-[#005f8d] text-white py-3 rounded-xl transition-all shadow-md">
              Continue with LinkedIn
            </button>
          </div>


          <div className="mt-6 text-center text-sm text-gray-600">
            New Here? 
            <Link href="/SignUp" className="text-blue-600 hover:text-blue-800 ml-1 font-medium">
              Create Your Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;