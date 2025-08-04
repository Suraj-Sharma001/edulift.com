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
    <nav className="bg-gradient-to-r from-[#232946] to-[#121629] text-[#fffffe] p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href='/' className="text-2xl font-bold hover:text-[#eebbc3] transition-colors duration-300 flex items-center">
          <span className="mr-2">📚</span> EduLift
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item} 
              href={item === 'Home' ? '/' : `/${item}`}
              className="hover:text-[#eebbc3] font-medium transition-colors duration-300 border-b-2 border-transparent hover:border-[#eebbc3] pb-1"
            >
              {item}
            </Link>
          ))}
          
          {/* Profile Button for Authenticated Users */}
          {isAuthenticated && userProfile ? ( // Check if authenticated and userProfile is set
            <div className="relative ml-4">
              <button 
                onClick={toggleProfileDropdown}
                className="flex items-center space-x-2 bg-[#b8c1ec] bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <div className="w-8 h-8 bg-[#eebbc3] rounded-full flex items-center justify-center">
                  <span className="text-[#232946] font-bold text-sm">
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
                <div className="absolute right-0 mt-2 w-48 bg-[#232946] rounded-lg shadow-lg py-2 z-10">
                  <div className="px-4 py-2 border-b border-[#b8c1ec]">
                    <p className="text-sm font-medium text-[#eebbc3]">{userProfile.name}</p>
                    <p className="text-sm text-[#b8c1ec]">{userProfile.email}</p>
                    <p className="text-xs text-[#b8c1ec] capitalize">{userProfile.role}</p>
                  </div>
                  <Link 
                    href="/Profile" 
                    className="block px-4 py-2 text-sm text-[#b8c1ec] hover:bg-[#eebbc3] hover:text-[#232946] transition-colors duration-200"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    View Profile
                  </Link>
                  <Link 
                    href="/Setting" 
                    className="block px-4 py-2 text-sm text-[#b8c1ec] hover:bg-[#eebbc3] hover:text-[#232946] transition-colors duration-200"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-[#eebbc3] hover:bg-[#b8c1ec] hover:text-[#232946] transition-colors duration-200"
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
                className="border-2 border-[#b8c1ec] hover:border-[#eebbc3] text-[#b8c1ec] px-4 py-1.5 rounded-lg font-medium hover:text-[#eebbc3] transition-colors duration-300"
              >
                Log In
              </Link>
              <Link 
                href='/SignUp' 
                className="bg-[#eebbc3] text-[#232946] px-4 py-2 rounded-lg font-bold hover:bg-[#b8c1ec] hover:text-[#232946] transition-colors duration-300 shadow-md"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-[#b8c1ec] focus:outline-none" 
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
        <div className="md:hidden bg-[#232946] mt-4 rounded-lg shadow-inner p-4 animate-fade-in-down">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item} 
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="hover:bg-[#eebbc3] hover:text-[#232946] font-medium transition-colors duration-300 px-4 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            
            {/* Mobile Auth Section */}
            {isAuthenticated && userProfile ? (
              <div className="pt-2 border-t border-[#b8c1ec] space-y-2">
                <div className="px-4 py-2 bg-[#eebbc3] rounded-md">
                  <p className="font-medium text-[#232946]">{userProfile.name}</p>
                  <p className="text-sm text-[#232946]">{userProfile.email}</p>
                </div>
                <Link 
                  href="/profile" 
                  className="block hover:bg-[#b8c1ec] hover:text-[#232946] font-medium transition-colors duration-300 px-4 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  View Profile
                </Link>
                <Link 
                  href="/settings" 
                  className="block hover:bg-[#b8c1ec] hover:text-[#232946] font-medium transition-colors duration-300 px-4 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left hover:bg-[#b8c1ec] hover:text-[#232946] font-medium transition-colors duration-300 px-4 py-2 rounded-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t border-[#b8c1ec]">
                <Link 
                  href='/Login' 
                  className="text-center hover:bg-[#eebbc3] hover:text-[#232946] font-medium transition-colors duration-300 px-4 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link 
                  href='/SignUp' 
                  className="text-center bg-[#eebbc3] text-[#232946] px-4 py-2 rounded-lg font-bold hover:bg-[#b8c1ec] hover:text-[#232946] transition-colors duration-300"
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
