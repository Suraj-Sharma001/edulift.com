'use client'; 
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Scholarships', href: '/Scholarships' },
    { label: 'Internships', href: '/Internships' },
    { label: 'Community', href: '/Community' }
  ];

  const recruiterNavItems = [
    { label: 'Dashboard', href: '/Recruiter-Dashboard' },
    { label: 'Manage Internships', href: '/Manage-Internships' }
  ];

  useEffect(() => {
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      const userStr = localStorage.getItem('user');

      if (authStatus === 'true' && userStr) {
        try {
          const user = JSON.parse(userStr);
          const displayName = user?.username || user?.name || user?.email?.split('@')[0] || 'User';
          setIsAuthenticated(true);
          setUserProfile({
            name: displayName,
            email: user?.email || '',
            role: (user?.role || '').toLowerCase()
          });
        } catch (e) {
          setIsAuthenticated(false);
          setUserProfile(null);
        }
      } else {
        setIsAuthenticated(false);
        setUserProfile(null);
      }
    };

    checkAuthStatus();
    window.addEventListener('storage', checkAuthStatus);

    return () => window.removeEventListener('storage', checkAuthStatus);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setShowProfileDropdown(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      console.error('Logout request failed', err);
    }

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserProfile(null);
    setShowProfileDropdown(false);
    router.push('/');
  };

  const activeNav = isAuthenticated && userProfile?.role === 'recruiter' ? recruiterNavItems : navItems;

  const linkClass = (href) => {
    const isActive = pathname === href;
    return `relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
      isActive
        ? 'bg-white text-[var(--brand-700)] shadow'
        : 'text-white/90 hover:bg-white/15 hover:text-white'
    }`;
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/25 bg-[linear-gradient(110deg,var(--brand-700),var(--brand-500))] text-white shadow-[0_8px_30px_rgba(9,42,92,0.22)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href='/' className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-white transition-opacity hover:opacity-90 sm:text-2xl">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/20 text-base shadow-inner">EL</span>
          <span>EduLift</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {activeNav.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}

          {isAuthenticated && userProfile ? (
            <div className="relative ml-3">
              <button 
                onClick={toggleProfileDropdown}
                className="flex items-center gap-2 rounded-full bg-white/20 px-2 py-1.5 pr-3 text-sm font-semibold transition-colors duration-200 hover:bg-white/28"
              >
                <div className="grid h-8 w-8 place-items-center rounded-full bg-white text-[var(--brand-700)]">
                  <span className="text-sm font-extrabold">
                    {userProfile.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="max-w-28 truncate">{userProfile.name}</span>
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

              {showProfileDropdown && (
                <div className="glass-panel absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl py-2 text-[var(--foreground)]">
                  <div className="border-b border-[rgba(16,64,131,0.15)] px-4 py-3">
                    <p className="truncate text-sm font-bold text-[var(--brand-700)]">{userProfile.name}</p>
                    <p className="truncate text-xs text-[var(--brand-600)]">{userProfile.email}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">{userProfile.role}</p>
                  </div>
                  <Link 
                    href="/Profile" 
                    className="block px-4 py-2 text-sm font-medium text-[var(--brand-700)] transition-colors duration-200 hover:bg-[rgba(30,111,208,0.12)]"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    View Profile
                  </Link>
                  <Link 
                    href="/Setting" 
                    className="block px-4 py-2 text-sm font-medium text-[var(--brand-700)] transition-colors duration-200 hover:bg-[rgba(30,111,208,0.12)]"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm font-semibold text-[#cf4e0b] transition-colors duration-200 hover:bg-[rgba(255,138,61,0.12)]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="ml-4 flex items-center gap-3">
              <Link 
                href='/Login' 
                className="rounded-full border border-white/45 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15"
              >
                Log In
              </Link>
              <Link 
                href='/SignUp' 
                className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[var(--brand-700)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <button 
          className="rounded-lg p-2 text-white/95 transition-colors hover:bg-white/15 md:hidden" 
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
      
      {isMenuOpen && (
        <div className="mx-4 mb-4 rounded-2xl border border-white/25 bg-white/95 p-3 text-[var(--foreground)] shadow-xl md:hidden">
          <div className="flex flex-col gap-2">
            {activeNav.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${pathname === item.href ? 'bg-[rgba(30,111,208,0.14)] text-[var(--brand-700)]' : 'hover:bg-[rgba(30,111,208,0.1)]'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {isAuthenticated && userProfile ? (
              <div className="space-y-2 border-t border-[rgba(20,83,162,0.16)] pt-3">
                <div className="rounded-xl bg-[rgba(30,111,208,0.12)] px-4 py-3">
                  <p className="font-semibold text-[var(--brand-700)]">{userProfile.name}</p>
                  <p className="text-xs text-[var(--brand-600)]">{userProfile.email}</p>
                </div>
                <Link 
                  href="/Profile" 
                  className="block rounded-xl px-4 py-2 text-sm font-semibold transition-colors hover:bg-[rgba(30,111,208,0.1)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  View Profile
                </Link>
                <Link 
                  href="/Setting" 
                  className="block rounded-xl px-4 py-2 text-sm font-semibold transition-colors hover:bg-[rgba(30,111,208,0.1)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full rounded-xl px-4 py-2 text-left text-sm font-semibold text-[#cf4e0b] transition-colors hover:bg-[rgba(255,138,61,0.14)]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 border-t border-[rgba(20,83,162,0.16)] pt-3">
                <Link 
                  href='/Login' 
                  className="rounded-xl border border-[rgba(30,111,208,0.25)] px-4 py-2 text-center text-sm font-semibold text-[var(--brand-700)] transition-colors hover:bg-[rgba(30,111,208,0.1)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link 
                  href='/SignUp' 
                  className="rounded-xl bg-[var(--brand-600)] px-4 py-2 text-center text-sm font-bold text-white transition-colors hover:bg-[var(--brand-500)]"
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
