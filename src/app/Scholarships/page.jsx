'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ScholarshipsPage() {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('/api/scholarships/listings', {
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok) {
          setListings(data.listings || []);
        }
      } catch (err) {
        console.error('Fetch listings error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleApplyNow = async (listing) => {
    const isAuth = typeof window !== 'undefined' && localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuth) {
      const returnUrl = encodeURIComponent(window.location.pathname);
      router.push(`/Login?returnUrl=${returnUrl}`);
      return;
    }

    try {
      const res = await fetch('/api/candidate/profile', {
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) {
        alert('Unable to verify profile');
        return;
      }

      if (!data.profile.profileComplete) {
        alert('Please complete your profile first');
        router.push('/Profile');
        return;
      }

      setSelectedListing(listing);
      setShowApplicationForm(true);
    } catch (err) {
      console.error('Profile check error:', err);
      alert('Error checking profile');
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await fetch('/api/auth/scholarship-apply', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: selectedListing._id
        })
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to submit application');
        return;
      }

      alert('Application submitted successfully!');
      setShowApplicationForm(false);
      // Refresh listings
      const updatedRes = await fetch('/api/scholarships/listings', {
        credentials: 'include'
      });
      const updatedData = await updatedRes.json();
      if (updatedRes.ok) {
        setListings(updatedData.listings || []);
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Error submitting application');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="px-6 py-10 text-[var(--brand-700)]">Loading scholarships...</div>;
  }

  if (showApplicationForm) {
    return (
      <div className="px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
        <div className="mx-auto w-full max-w-3xl">
          <button
            onClick={() => setShowApplicationForm(false)}
            className="btn-outline mb-4"
          >
            Back to listing
          </button>

          <section className="glass-panel rounded-[28px] p-6 sm:p-8">
            <h1 className="text-3xl font-extrabold text-[var(--brand-700)]">
              Apply for {selectedListing.title}
            </h1>
            <p className="mt-2 text-sm text-[rgba(15,31,61,0.72)]">
              Your profile information will be automatically submitted with your application.
            </p>

            <form onSubmit={handleSubmitApplication} className="mt-8 space-y-4">
              <div className="rounded-[20px] border border-[rgba(30,111,208,0.16)] bg-[rgba(30,111,208,0.04)] p-4">
                <p className="text-sm text-[rgba(15,31,61,0.72)]">
                  ✓ Your complete profile will be sent to the scholarship board
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </section>
        </div>
      </div>
    );
  }

  if (selectedListing) {
    return (
      <div className="px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
        <div className="mx-auto grid w-full max-w-6xl gap-6">
          <button
            onClick={() => setSelectedListing(null)}
            className="btn-outline w-fit"
          >
            Back to all scholarships
          </button>

          <section className="glass-panel rounded-[28px] px-6 py-10 sm:px-10 sm:py-12">
            <h1 className="text-4xl font-extrabold text-[var(--foreground)]">
              {selectedListing.title}
            </h1>
            <p className="mt-2 text-sm font-medium text-[rgba(15,31,61,0.65)]">
              {selectedListing.organization}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[rgba(15,31,61,0.78)]">
              {selectedListing.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-full bg-[rgba(30,111,208,0.12)] px-4 py-2">
                <p className="text-sm font-semibold text-[var(--brand-700)]">
                  Deadline: {new Date(selectedListing.deadline).toLocaleDateString()}
                </p>
              </div>
              <div className="rounded-full bg-[rgba(30,111,208,0.12)] px-4 py-2">
                <p className="text-sm font-semibold text-[var(--brand-700)]">
                  Applicants: {selectedListing.applicantCount || 0}
                </p>
              </div>
            </div>
          </section>

          <section className="glass-card rounded-[28px] p-6 text-center sm:p-8">
            {selectedListing.applied ? (
              <div>
                <p className="text-lg font-bold text-[#0f7e5d]">✓ Already Applied</p>
                <p className="mt-2 text-sm text-[rgba(15,31,61,0.72)]">
                  You have already applied for this scholarship.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-extrabold text-[var(--brand-700)]">Ready to apply?</h3>
                <p className="mt-2 text-sm text-[rgba(15,31,61,0.7)]">
                  Click below to submit your application with your complete profile.
                </p>
                <button
                  onClick={() => handleApplyNow(selectedListing)}
                  className="btn-primary mt-5"
                >
                  Apply Now
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <div className="mx-auto grid w-full max-w-7xl gap-8">
        <section className="glass-panel fade-rise rounded-[28px] px-6 py-10 sm:px-10 sm:py-12">
          <h1 className="text-4xl font-extrabold text-[var(--foreground)] sm:text-5xl">
            Scholarship Opportunities
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[rgba(15,31,61,0.78)] sm:text-lg">
            Find the financial support you need to pursue your education and career goals through our curated scholarship listings.
          </p>
        </section>

        {listings.length === 0 ? (
          <section className="glass-card rounded-[28px] p-8 text-center">
            <p className="text-lg text-[rgba(15,31,61,0.72)]">No scholarship listings available at the moment.</p>
          </section>
        ) : (
          <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <article
                key={listing._id}
                className="glass-card rounded-[24px] p-6 transition-transform duration-200 hover:-translate-y-1"
              >
                {listing.applied && (
                  <div className="mb-3 inline-block rounded-full bg-[rgba(18,184,134,0.12)] px-3 py-1 text-xs font-bold text-[#0f7e5d]">
                    Applied ✓
                  </div>
                )}
                <h3 className="text-xl font-extrabold text-[var(--brand-700)]">
                  {listing.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-[rgba(15,31,61,0.65)]">
                  {listing.organization}
                </p>
                <p className="mt-3 line-clamp-2 text-sm text-[rgba(15,31,61,0.78)]">
                  {listing.description}
                </p>
                <p className="mt-3 text-xs text-[rgba(15,31,61,0.65)]">
                  Deadline: {new Date(listing.deadline).toLocaleDateString()}
                </p>

                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => setSelectedListing(listing)}
                    className="btn-outline flex-1 text-sm"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleApplyNow(listing)}
                    disabled={listing.applied}
                    className={`btn-primary flex-1 text-sm ${listing.applied ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {listing.applied ? 'Applied' : 'Apply'}
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
