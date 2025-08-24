'use client'

import React, { useState, useEffect } from 'react'

const ScholarshipsPage = () => {
  // State variables
  const [scholarships, setScholarships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredScholarships, setFilteredScholarships] = useState([])
  const [displayedScholarships, setDisplayedScholarships] = useState([])
  const [featuredScholarship, setFeaturedScholarship] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedScholarship, setSelectedScholarship] = useState(null)
  
  const itemsPerPage = 4
  
  // Component mounted effect
  useEffect(() => {
    // Component initialization logic can go here if needed
  }, [])
  
  // Load mock data instead of API call to avoid mobile issues
  useEffect(() => {
    const loadMockData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Option 1: Scholarships.com API (you'll need to register for an API key)
        // const response = await fetch('https://api.scholarships.com/v1/scholarships', {
        //   headers: {
        //     'Authorization': 'Bearer YOUR_API_KEY'
        //   }
        // })
        
        // Option 2: Mock API using JSON Placeholder (for testing purposes)
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal
        })
        
        clearTimeout(timeoutId)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        let data = await response.json()
        
        // Transform JSON Placeholder data to match our scholarship structure
        // Remove this transformation when using a real scholarships API
        if (response.url.includes('jsonplaceholder')) {
          data = data.slice(0, 12).map((item, index) => ({
            id: item.id,
            featured: index % 3 === 0, // Make every third scholarship featured
            title: `${item.title.slice(0, 30)}...`,
            description: item.body.slice(0, 100),
            amount: `$${Math.floor(Math.random() * 10000) + 1000}`,
            deadline: new Date(Date.now() + (Math.random() * 10000000000)).toISOString().split('T')[0],
            category: ['merit-based', 'need-based', 'athletic', 'academic', 'community-service'][Math.floor(Math.random() * 5)]
          }))
        }
        
        setScholarships(data)
        setLoading(false)
              } catch (error) {
          console.error('Error loading scholarships:', error)
          setError('Failed to load scholarships. Please try again.')
          setLoading(false)
        }
    }

    // Simulate loading delay
    setTimeout(loadMockData, 1000)
  }, [])

  // Filter and sort scholarships based on search, category, and sort criteria
  useEffect(() => {
    if (scholarships.length === 0) return
    
    // Filter scholarships
    let filtered = scholarships.filter(scholarship => {
      const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === '' || scholarship.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })

    // Sort scholarships
    if (sortBy) {
      switch (sortBy) {
        case 'recent':
          // Sort by ID (newest first)
          filtered = [...filtered].sort((a, b) => b.id - a.id)
          break
        case 'popular':
          // Sort by amount (highest first)
          filtered = [...filtered].sort((a, b) => parseInt(b.amount.replace(/[^0-9]/g, '')) - parseInt(a.amount.replace(/[^0-9]/g, '')))
          break
        case 'ending-soon':
          filtered = [...filtered].sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
          break
        case 'highest-value':
          filtered = [...filtered].sort((a, b) => parseInt(b.amount.replace(/[^0-9]/g, '')) - parseInt(a.amount.replace(/[^0-9]/g, '')))
          break
        case 'lowest-value':
          filtered = [...filtered].sort((a, b) => parseInt(a.amount.replace(/[^0-9]/g, '')) - parseInt(b.amount.replace(/[^0-9]/g, '')))
          break
        default:
          break
      }
    }

    setFilteredScholarships(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [scholarships, searchTerm, selectedCategory, sortBy])

  // Get featured scholarship and paginate remaining scholarships
  useEffect(() => {
    if (filteredScholarships.length === 0) return
    
    // Find featured scholarship - select the first featured one in filtered results or the first result if none are featured
    const featured = filteredScholarships.find(s => s.featured) || filteredScholarships[0]
    setFeaturedScholarship(featured)

    // Paginate non-featured scholarships
    const nonFeatured = filteredScholarships.filter(s => s !== featured)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setDisplayedScholarships(nonFeatured.slice(startIndex, endIndex))
  }, [filteredScholarships, currentPage])

  // Calculate total pages
  const totalPages = Math.ceil((filteredScholarships.length - (featuredScholarship ? 1 : 0)) / itemsPerPage)

  // Handle page change
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum)
  }

  // Handle modal close with escape key and prevent background scroll
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false)
      }
    }

    if (showModal) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [showModal])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#232946] via-[#121629] to-[#232946] text-[#fffffe] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#eebbc3] mx-auto mb-6"></div>
          <p className="text-[#b8c1ec] text-lg">Loading scholarships...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#232946] via-[#121629] to-[#232946] text-[#fffffe] flex items-center justify-center px-4">
        <div className="bg-gradient-to-br from-[#121629] to-[#232946] border border-[#eebbc3]/30 text-[#eebbc3] px-8 py-6 rounded-2xl max-w-2xl mx-auto shadow-2xl" role="alert">
          <div className="text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <strong className="font-bold text-xl block mb-2">Error: </strong>
            <span className="block sm:inline text-[#b8c1ec] mb-4">{error}</span>
            <p className="text-[#b8c1ec]">Please try refreshing the page or come back later.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-3 bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] text-[#232946] font-bold rounded-xl hover:from-[#b8c1ec] hover:to-[#eebbc3] transition-all duration-300"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#232946] via-[#121629] to-[#232946] text-[#fffffe]">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-[#eebbc3] rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#b8c1ec] rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#eebbc3] rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#121629] to-[#232946] rounded-3xl shadow-2xl p-12 border border-[#b8c1ec]/20">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] bg-clip-text text-transparent">
                Scholarships that Change Lives
              </h1>
                             <p className="text-xl text-[#b8c1ec] mb-8 max-w-3xl mx-auto">
                 Discover opportunities to fund your education and achieve your academic dreams with EduLift&apos;s scholarship program.
               </p>
              <button className="px-8 py-4 bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] text-[#232946] font-bold rounded-xl hover:from-[#b8c1ec] hover:to-[#eebbc3] transition-all duration-300 transform hover:scale-105 shadow-lg">
                Find Scholarships
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-12 px-4 sm:px-6 bg-[#232946] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#eebbc3]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#b8c1ec]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#121629] to-[#232946] rounded-2xl shadow-2xl p-8 border border-[#b8c1ec]/20">
            <h2 className="text-2xl font-bold text-[#fffffe] mb-6">Find the Right Scholarship</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search for scholarships"
                className="flex-grow bg-[#232946] border border-[#b8c1ec]/30 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#eebbc3] focus:border-transparent text-[#fffffe] placeholder-[#b8c1ec]/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                name="Category"
                className="bg-[#232946] border border-[#b8c1ec]/30 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#eebbc3] focus:border-transparent text-[#fffffe]"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="merit-based">Merit-Based</option>
                <option value="need-based">Need-Based</option>
                <option value="athletic">Athletic</option>
                <option value="academic">Academic</option>
                <option value="community-service">Community Service</option>
              </select>
              <select
                name="Sort By"
                className="bg-[#232946] border border-[#b8c1ec]/30 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#eebbc3] focus:border-transparent text-[#fffffe]"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="recent">Recent</option>
                <option value="popular">Most Popular</option>
                <option value="ending-soon">Ending Soon</option>
                <option value="highest-value">Highest Value</option>
                <option value="lowest-value">Lowest Value</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Scholarship */}
      {featuredScholarship && (
        <section className="py-12 px-4 sm:px-6 bg-[#121629] relative overflow-hidden">
          <div className="relative max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-[#232946] to-[#121629] rounded-2xl shadow-2xl overflow-hidden border-l-4 border-[#eebbc3]">
              <div className="p-8">
                <div className="text-sm font-bold text-[#eebbc3] mb-3">FEATURED</div>
                <h3 className="text-3xl font-bold text-[#fffffe] mb-4">{featuredScholarship.title}</h3>
                <p className="text-[#b8c1ec] mb-6 text-lg">{featuredScholarship.description}</p>
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <span className="font-bold text-[#eebbc3] text-2xl">{featuredScholarship.amount}</span>
                  <span className="text-[#b8c1ec]">Deadline: {featuredScholarship.deadline}</span>
                </div>
                <button 
                  className="px-8 py-4 bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] text-[#232946] font-bold rounded-xl hover:from-[#b8c1ec] hover:to-[#eebbc3] transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={() => {
                    setSelectedScholarship(featuredScholarship)
                    setShowModal(true)
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Scholarships Grid */}
      <section className="py-12 px-4 sm:px-6 bg-[#232946] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#eebbc3]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#b8c1ec]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {displayedScholarships.length > 0 ? (
              displayedScholarships.map(scholarship => (
                <div key={scholarship.id} className="group relative">
                  <div className="bg-gradient-to-br from-[#121629] to-[#232946] p-8 rounded-2xl shadow-xl hover:shadow-2xl border border-[#b8c1ec]/10 hover:border-[#eebbc3]/30 transition-all duration-500 hover:transform hover:-translate-y-2">
                    <h3 className="text-2xl font-bold text-[#fffffe] mb-4 group-hover:text-[#eebbc3] transition-colors duration-300">{scholarship.title}</h3>
                    <p className="text-[#b8c1ec] mb-6 group-hover:text-[#fffffe] transition-colors duration-300">{scholarship.description}</p>
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <span className="font-bold text-[#eebbc3] text-xl">{scholarship.amount}</span>
                      <span className="text-[#b8c1ec] text-sm">Deadline: {scholarship.deadline}</span>
                    </div>
                    <button 
                      className="px-6 py-3 bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] text-[#232946] font-bold rounded-xl hover:from-[#b8c1ec] hover:to-[#eebbc3] transition-all duration-300 transform hover:scale-105 shadow-lg"
                      onClick={() => {
                        setSelectedScholarship(scholarship)
                        setShowModal(true)
                      }}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-[#b8c1ec]">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl">No scholarships found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 0 && (
        <section className="py-12 px-4 sm:px-6 bg-[#121629] relative overflow-hidden">
          <div className="relative max-w-6xl mx-auto">
            <div className="flex justify-center">
              <div className="inline-flex bg-gradient-to-br from-[#232946] to-[#121629] rounded-2xl shadow-2xl overflow-hidden border border-[#b8c1ec]/20">
                <button 
                  className="px-4 py-3 border-r border-[#b8c1ec]/20 text-[#b8c1ec] hover:text-[#eebbc3] hover:bg-[#232946] disabled:opacity-50 transition-colors duration-300"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ◀
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    className={`px-4 py-3 border-r border-[#b8c1ec]/20 transition-colors duration-300 ${
                      currentPage === pageNum ? 'bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] text-[#232946] font-bold' : 'text-[#b8c1ec] hover:text-[#eebbc3] hover:bg-[#232946]'
                    }`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}
                
                <button 
                  className="px-4 py-3 text-[#b8c1ec] hover:text-[#eebbc3] hover:bg-[#232946] disabled:opacity-50 transition-colors duration-300"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Application Modal */}
      {showModal && selectedScholarship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-[#121629] to-[#232946] rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-[#b8c1ec]/20 transform transition-all duration-300 modal-content">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-[#fffffe]">Apply for Scholarship</h3>
                <button 
                  className="text-[#b8c1ec] hover:text-[#eebbc3] transition-colors duration-300 p-2 rounded-lg hover:bg-[#232946] touch-manipulation"
                  onClick={() => setShowModal(false)}
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6 p-4 bg-gradient-to-br from-[#232946] to-[#121629] rounded-xl border border-[#b8c1ec]/20">
                <h4 className="font-bold text-[#eebbc3] mb-2">{selectedScholarship.title}</h4>
                <p className="text-sm text-[#b8c1ec]">Deadline: {selectedScholarship.deadline}</p>
                <p className="text-xl font-bold text-[#eebbc3] mt-2">{selectedScholarship.amount}</p>
              </div>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-[#b8c1ec] text-sm font-bold mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    className="bg-[#232946] border border-[#b8c1ec]/30 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#eebbc3] focus:border-transparent text-[#fffffe] placeholder-[#b8c1ec]/50"
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-[#b8c1ec] text-sm font-bold mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className="bg-[#232946] border border-[#b8c1ec]/30 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#eebbc3] focus:border-transparent text-[#fffffe] placeholder-[#b8c1ec]/50"
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label className="block text-[#b8c1ec] text-sm font-bold mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    className="bg-[#232946] border border-[#b8c1ec]/30 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#eebbc3] focus:border-transparent text-[#fffffe] placeholder-[#b8c1ec]/50"
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-[#b8c1ec] text-sm font-bold mb-2" htmlFor="institution">
                    Educational Institution
                  </label>
                  <input
                    className="bg-[#232946] border border-[#b8c1ec]/30 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#eebbc3] focus:border-transparent text-[#fffffe] placeholder-[#b8c1ec]/50"
                    id="institution"
                    type="text"
                    placeholder="Enter your school/college name"
                  />
                </div>
                
                <div>
                  <label className="block text-[#b8c1ec] text-sm font-bold mb-2" htmlFor="resume">
                    Upload Resume
                  </label>
                  <div className="border border-dashed border-[#b8c1ec]/30 rounded-xl px-6 py-6 bg-[#232946]">
                    <input
                      type="file"
                      id="resume"
                      className="hidden"
                    />
                    <label htmlFor="resume" className="flex flex-col items-center cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#b8c1ec] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-sm text-[#b8c1ec] text-center">Click to upload your resume (PDF, DOC, DOCX)</span>
                    </label>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="button"
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] text-[#232946] font-bold rounded-xl hover:from-[#b8c1ec] hover:to-[#eebbc3] transition-all duration-300 transform hover:scale-105 shadow-lg"
                    onClick={() => {
                      alert('Application submitted successfully! We will contact you soon.')
                      setShowModal(false)
                    }}
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScholarshipsPage