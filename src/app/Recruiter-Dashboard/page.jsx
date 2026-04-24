'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RecruiterDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('post'); // 'post', 'listings', 'applicants'
  const [isLoading, setIsLoading] = useState(false);
  const [recruiterInfo, setRecruiterInfo] = useState(null);
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [applicants, setApplicants] = useState([]);

  // Form state for posting internships
  const [internshipForm, setInternshipForm] = useState({
    type: 'internship', // 'internship' or 'scholarship'
    title: '',
    company: '',
    organization: '',
    description: '',
    deadline: '',
    amount: '', // for scholarships
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check authentication
    const isAuth = typeof window !== 'undefined' && localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuth) {
      router.push('/Login');
      return;
    }

    // Fetch recruiter info and listings
    fetchRecruiterData();
  }, [router]);

  const fetchRecruiterData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/recruiter/listings', {
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        setListings(data.listings || []);
      } else {
        console.error('Error fetching listings:', data.error);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setInternshipForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePostListing = async (e) => {
    e.preventDefault();
    
    if (!internshipForm.title || !internshipForm.deadline) {
      alert('Please fill in required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      const endpoint = internshipForm.type === 'internship' 
        ? '/api/recruiter/internships' 
        : '/api/recruiter/scholarships';

      const res = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(internshipForm)
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to post listing');
        return;
      }

      alert(`${internshipForm.type === 'internship' ? 'Internship' : 'Scholarship'} posted successfully!`);
      
      // Reset form and refresh listings
      setInternshipForm({
        type: 'internship',
        title: '',
        company: '',
        organization: '',
        description: '',
        deadline: '',
        amount: '',
      });
      
      setActiveTab('listings');
      fetchRecruiterData();
    } catch (err) {
      console.error('Submit error:', err);
      alert('Error posting listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewApplicants = async (listing) => {
    try {
      setSelectedListing(listing);
      const res = await fetch(`/api/internships/${listing._id}?applicants=true`, {
        credentials: 'include'
      });
      const data = await res.json();
      
      // Try alternate endpoint for scholarships
      if (!res.ok && listing.type === 'Scholarship') {
        const scholarRes = await fetch(`/api/scholarships/${listing._id}?applicants=true`, {
          credentials: 'include'
        });
        const scholarData = await scholarRes.json();
        if (scholarRes.ok) {
          setApplicants(scholarData.applicants || []);
          setActiveTab('applicants');
          return;
        }
      }
      
      if (res.ok) {
        setApplicants(data.applicants || []);
        setActiveTab('applicants');
      } else {
        alert(data.error || 'Failed to fetch applicants');
      }
    } catch (err) {
      console.error('Fetch applicants error:', err);
      alert('Error fetching applicants');
    }
  };

  const handleUpdateStatus = async (applicantId, newStatus) => {
    try {
      const res = await fetch('/api/auth/update-application-status', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: applicantId,
          status: newStatus
        })
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to update status');
        return;
      }

      alert('Status updated successfully!');
      
      // Update applicants list
      setApplicants(prev => prev.map(app => 
        app._id === applicantId ? { ...app, status: newStatus } : app
      ));
    } catch (err) {
      console.error('Update status error:', err);
      alert('Error updating status');
    }
  };

  // Render post listing form
  const renderPostForm = () => (
    <div className="px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <div className="mx-auto w-full max-w-2xl">
        <section className="glass-panel rounded-[28px] p-6 sm:p-8">
          <h2 className="text-3xl font-extrabold text-[var(--brand-700)] mb-6">Post New Opportunity</h2>
          
          <form onSubmit={handlePostListing} className="space-y-5">
            {/* Type selector */}
            <div>
              <label className="block text-sm font-medium text-[var(--brand-700)] mb-2">
                Type
              </label>
              <select
                name="type"
                value={internshipForm.type}
                onChange={handleFormChange}
                className="input-field w-full"
              >
                <option value="internship">Internship</option>
                <option value="scholarship">Scholarship</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-[var(--brand-700)] mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={internshipForm.title}
                onChange={handleFormChange}
                placeholder="e.g., Frontend Developer Internship"
                className="input-field w-full"
              />
            </div>

            {/* Company or Organization */}
            {internshipForm.type === 'internship' ? (
              <div>
                <label className="block text-sm font-medium text-[var(--brand-700)] mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={internshipForm.company}
                  onChange={handleFormChange}
                  placeholder="e.g., Tech Startup Inc."
                  className="input-field w-full"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-[var(--brand-700)] mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  name="organization"
                  value={internshipForm.organization}
                  onChange={handleFormChange}
                  placeholder="e.g., Education Foundation"
                  className="input-field w-full"
                />
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[var(--brand-700)] mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={internshipForm.description}
                onChange={handleFormChange}
                placeholder="Describe the opportunity, requirements, responsibilities..."
                className="input-field w-full min-h-[120px] resize-none"
              />
            </div>

            {/* Amount for scholarships */}
            {internshipForm.type === 'scholarship' && (
              <div>
                <label className="block text-sm font-medium text-[var(--brand-700)] mb-2">
                  Scholarship Amount
                </label>
                <input
                  type="text"
                  name="amount"
                  value={internshipForm.amount}
                  onChange={handleFormChange}
                  placeholder="e.g., $5,000"
                  className="input-field w-full"
                />
              </div>
            )}

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-[var(--brand-700)] mb-2">
                Deadline *
              </label>
              <input
                type="date"
                name="deadline"
                value={internshipForm.deadline}
                onChange={handleFormChange}
                className="input-field w-full"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full"
            >
              {isSubmitting ? 'Posting...' : 'Post Opportunity'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );

  // Render listings view
  const renderListings = () => (
    <div className="px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <div className="mx-auto w-full max-w-6xl">
        <section className="glass-panel rounded-[28px] p-6 sm:p-8 mb-8">
          <h2 className="text-3xl font-extrabold text-[var(--brand-700)]">
            My Posted Opportunities
          </h2>
          <p className="mt-2 text-sm text-[rgba(15,31,61,0.72)]">
            View and manage all internships and scholarships you&apos;ve posted
          </p>
        </section>

        {isLoading ? (
          <div className="glass-card rounded-[28px] p-8 text-center">
            <p className="text-[rgba(15,31,61,0.72)]">Loading listings...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="glass-card rounded-[28px] p-8 text-center">
            <p className="text-lg text-[rgba(15,31,61,0.72)] mb-4">No listings posted yet</p>
            <button
              onClick={() => setActiveTab('post')}
              className="btn-primary"
            >
              Post Your First Opportunity
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map(listing => (
              <div
                key={listing._id}
                className="glass-card rounded-[24px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block rounded-full bg-[rgba(30,111,208,0.12)] px-3 py-1 text-xs font-bold text-[var(--brand-700)]">
                      {listing.type || 'Opportunity'}
                    </span>
                    <span className="text-xs text-[rgba(15,31,61,0.65)]">
                      {listing.applicantCount || 0} applicant{listing.applicantCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-[var(--brand-700)]">
                    {listing.title}
                  </h3>
                  <p className="text-sm text-[rgba(15,31,61,0.65)] mt-1">
                    {listing.company || listing.organization}
                  </p>
                  <p className="text-xs text-[rgba(15,31,61,0.65)] mt-2">
                    Deadline: {new Date(listing.deadline).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleViewApplicants(listing)}
                  className="btn-primary whitespace-nowrap"
                >
                  View Applicants ({listing.applicantCount || 0})
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Render applicants view
  const renderApplicants = () => (
    <div className="px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <div className="mx-auto w-full max-w-6xl">
        <button
          onClick={() => setActiveTab('listings')}
          className="btn-outline mb-6"
        >
          Back to Listings
        </button>

        <section className="glass-panel rounded-[28px] p-6 sm:p-8 mb-8">
          <h2 className="text-3xl font-extrabold text-[var(--brand-700)]">
            {selectedListing?.title}
          </h2>
          <p className="mt-2 text-sm text-[rgba(15,31,61,0.72)]">
            {selectedListing?.company || selectedListing?.organization}
          </p>
        </section>

        {applicants.length === 0 ? (
          <div className="glass-card rounded-[28px] p-8 text-center">
            <p className="text-lg text-[rgba(15,31,61,0.72)]">No applicants yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applicants.map(applicant => (
              <div
                key={applicant._id}
                className="glass-card rounded-[24px] p-6"
              >
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-extrabold text-[var(--brand-700)]">
                      {applicant.name}
                    </h3>
                    <p className="text-sm text-[rgba(15,31,61,0.72)] mt-1">
                      📧 {applicant.email}
                    </p>
                    <p className="text-sm text-[rgba(15,31,61,0.72)] mt-1">
                      📱 {applicant.phone}
                    </p>
                    <p className="text-sm text-[rgba(15,31,61,0.72)] mt-1">
                      🎓 {applicant.college} - {applicant.degree}
                    </p>
                    {applicant.resume && (
                      <div className="mt-3 p-3 rounded-[12px] bg-[rgba(30,111,208,0.05)] border border-[rgba(30,111,208,0.16)]">
                        <p className="text-xs font-medium text-[var(--brand-700)] mb-1">Resume:</p>
                        <p className="text-xs text-[rgba(15,31,61,0.72)] line-clamp-2">
                          {applicant.resume}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-1 flex flex-col gap-2">
                    <div>
                      <p className="text-xs font-medium text-[rgba(15,31,61,0.65)] mb-2">Status</p>
                      <select
                        value={applicant.status}
                        onChange={(e) => handleUpdateStatus(applicant._id, e.target.value)}
                        className="input-field w-full text-sm"
                      >
                        <option value="Applied">📝 Applied</option>
                        <option value="Under Review">👀 Under Review</option>
                        <option value="Shortlisted">⭐ Shortlisted</option>
                        <option value="Selected">✅ Selected</option>
                        <option value="Rejected">❌ Rejected</option>
                      </select>
                    </div>
                    
                    {applicant.status && (
                      <div className="text-xs text-center mt-2 p-2 rounded-[8px] bg-[rgba(30,111,208,0.08)]">
                        <p className="font-semibold text-[var(--brand-700)]">
                          {applicant.status === 'Applied' && '📝 Pending'}
                          {applicant.status === 'Under Review' && '👀 Reviewing'}
                          {applicant.status === 'Shortlisted' && '⭐ Advanced'}
                          {applicant.status === 'Selected' && '✅ Hired'}
                          {applicant.status === 'Rejected' && '❌ Not Selected'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="sticky top-0 z-40 border-b border-[rgba(30,111,208,0.16)] bg-[rgba(255,255,255,0.8)] backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab('post')}
              className={`px-4 py-4 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'post'
                  ? 'border-[var(--brand-700)] text-[var(--brand-700)]'
                  : 'border-transparent text-[rgba(15,31,61,0.65)] hover:text-[var(--brand-700)]'
              }`}
            >
              Post Opportunity
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-4 py-4 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'listings'
                  ? 'border-[var(--brand-700)] text-[var(--brand-700)]'
                  : 'border-transparent text-[rgba(15,31,61,0.65)] hover:text-[var(--brand-700)]'
              }`}
            >
              My Listings
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'post' && renderPostForm()}
      {activeTab === 'listings' && renderListings()}
      {activeTab === 'applicants' && renderApplicants()}
    </div>
  );
}
