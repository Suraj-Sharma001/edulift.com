'use client'; 
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // Corrected state name
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const navItems = ['Home', 'Scholarships', 'Internships', 'Community'];

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (authStatus === 'true' && token && userStr) {
        const user = JSON.parse(userStr); // Parse user data
        setIsAuthenticated(true);
        setUserProfile({
          name: user.username, // Ensure this matches your user object structure
          email: user.email,
          role: user.role 
        });
      } else {
        setIsAuthenticated(false);
        setUserProfile(null);
      }
    };

    checkAuthStatus();
    
    // Listen for storage changes (useful for multiple tabs)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserProfile(null);
    setShowProfileDropdown(false);
    router.push('/');
  };

  return (
    <nav className="bg-gradient-to-r from-orange-400 to-orange-400 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href='/' className="text-2xl font-bold hover:text-orange-200 transition-colors duration-300 flex items-center">
          <span className="mr-2">📚</span> EduLift
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item} 
              href={item === 'Home' ? '/' : `/${item}`}
              className="hover:text-orange-200 font-medium transition-colors duration-300 border-b-2 border-transparent hover:border-orange-200 pb-1"
            >
              {item}
            </Link>
          ))}
          
          {/* Profile Button for Authenticated Users */}
          {isAuthenticated && userProfile ? ( // Check if authenticated and userProfile is set
            <div className="relative ml-4">
              <button 
                onClick={toggleProfileDropdown}
                className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-sm">
                    {userProfile.name.charAt(0).toUpperCase()} {/* Display first letter of name */}
                  </span>
                </div>
                <span className="font-medium">{userProfile.name}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Profile Dropdown */}
              {showProfileDropdown && ( 
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{userProfile.name}</p>
                    <p className="text-sm text-gray-500">{userProfile.email}</p>
                    <p className="text-xs text-gray-400 capitalize">{userProfile.role}</p>
                  </div>
                  <Link 
                    href="/Profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    View Profile
                  </Link>
                  <Link 
                    href="/Setting" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4 ml-4">
              <Link 
                href='/Login' 
                className="border-2 border-white hover:border-orange-200 text-white px-4 py-1.5 rounded-lg font-medium hover:text-orange-200 transition-colors duration-300"
              >
                Log In
              </Link>
              <Link 
                href='/SignUp' 
                className="bg-white text-orange-600 px-4 py-2 rounded-lg font-bold hover:bg-orange-100 transition-colors duration-300 shadow-md"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-orange-600 mt-4 rounded-lg shadow-inner p-4 animate-fade-in-down">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item} 
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="hover:bg-orange-700 font-medium transition-colors duration-300 px-4 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            
            {/* Mobile Auth Section */}
            {isAuthenticated && userProfile ? (
              <div className="pt-2 border-t border-orange-400 space-y-2">
                <div className="px-4 py-2 bg-orange-700 rounded-md">
                  <p className="font-medium">{userProfile.name}</p>
                  <p className="text-sm text-orange-200">{userProfile.email}</p>
                </div>
                <Link 
                  href="/profile" 
                  className="block hover:bg-orange-700 font-medium transition-colors duration-300 px-4 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  View Profile
                </Link>
                <Link 
                  href="/settings" 
                  className="block hover:bg-orange-700 font-medium transition-colors duration-300 px-4 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left hover:bg-red-600 font-medium transition-colors duration-300 px-4 py-2 rounded-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t border-orange-400">
                <Link 
                  href='/Login' 
                  className="text-center hover:bg-orange-700 font-medium transition-colors duration-300 px-4 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link 
                  href='/SignUp' 
                  className="text-center bg-white text-orange-600 px-4 py-2 rounded-lg font-bold hover:bg-orange-100 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
