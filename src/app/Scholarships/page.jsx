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
  
  // Fetch scholarships from the API
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true)
        
        // Option 1: Scholarships.com API (you'll need to register for an API key)
        // const response = await fetch('https://api.scholarships.com/v1/scholarships', {
        //   headers: {
        //     'Authorization': 'Bearer YOUR_API_KEY'
        //   }
        // })
        
        // Option 2: Mock API using JSON Placeholder (for testing purposes)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        
        if (!response.ok) {
          throw new Error('Network response was not ok')
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
        setError(error.message)
        setLoading(false)
      }
    }

    fetchScholarships()
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
          // No sorting needed as we assume the array is already in chronological order
          break
        case 'popular':
          // In a real application, this would use a popularity metric
          filtered = [...filtered].sort((a, b) => b.id - a.id)
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading scholarships...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-4xl mx-auto" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <p className="mt-2">Please try refreshing the page or come back later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 shadow-lg rounded-lg p-8 mb-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Scholarships that Change Lives</h1>
        <p className="text-gray-700 mb-6">Discover opportunities to fund your education and achieve your academic dreams with EduLift's scholarship program.</p>
        <button className="px-6 py-3 text-white bg-blue-600 rounded-full font-medium hover:bg-blue-800 transition duration-300">Find Scholarships</button>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-10 max-w-4xl mx-auto border border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Find the Right Scholarship</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search for scholarships"
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            name="Category"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Featured Scholarship */}
      {featuredScholarship && (
        <div className="max-w-4xl mx-auto mb-10">
          <div className="relative bg-white shadow-lg rounded-lg overflow-hidden border-l-4 border-yellow-400">
            <div className="p-6">
              <div className="text-xs font-bold text-yellow-500 mb-2">FEATURED</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{featuredScholarship.title}</h3>
              <p className="text-gray-600 mb-4">{featuredScholarship.description}</p>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="font-bold text-blue-800 text-lg">{featuredScholarship.amount}</span>
                <span className="text-gray-600">Deadline: {featuredScholarship.deadline}</span>
              </div>
              <button 
                className="px-6 py-3 text-white bg-blue-600 rounded-full font-medium hover:bg-blue-800 transition duration-300"
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
      )}

      {/* Scholarships Grid */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-10">
        {displayedScholarships.length > 0 ? (
          displayedScholarships.map(scholarship => (
            <div key={scholarship.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6 border border-gray-300">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{scholarship.title}</h3>
                <p className="text-gray-600 mb-4">{scholarship.description}</p>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="font-bold text-blue-800">{scholarship.amount}</span>
                  <span className="text-gray-600 text-sm">Deadline: {scholarship.deadline}</span>
                </div>
                <button 
                  className="px-4 py-2 bg-blue-700 text-white rounded-full text-sm font-medium hover:bg-blue-800 transition duration-300"
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
          <div className="col-span-2 text-center py-8 text-gray-500">
            No scholarships found matching your criteria.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex justify-center max-w-4xl mx-auto">
          <div className="inline-flex bg-white rounded shadow overflow-hidden">
            <button 
              className="px-3 py-2 border-r border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ◀
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                className={`px-3 py-2 border-r border-gray-200 ${
                  currentPage === pageNum ? 'bg-blue-700 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            
            <button 
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              ▶
            </button>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {showModal && selectedScholarship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Apply for Scholarship</h3>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowModal(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-4">
                <h4 className="font-bold text-blue-800 mb-1">{selectedScholarship.title}</h4>
                <p className="text-sm text-gray-600">Deadline: {selectedScholarship.deadline}</p>
                <p className="text-lg font-bold text-blue-700 mt-1">{selectedScholarship.amount}</p>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="institution">
                    Educational Institution
                  </label>
                  <input
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="institution"
                    type="text"
                    placeholder="Enter your school/college name"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resume">
                    Upload Resume
                  </label>
                  <div className="border border-dashed border-gray-300 rounded-lg px-4 py-4 bg-gray-50">
                    <input
                      type="file"
                      id="resume"
                      className="hidden"
                    />
                    <label htmlFor="resume" className="flex flex-col items-center cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-sm text-gray-500">Click to upload your resume (PDF, DOC, DOCX)</span>
                    </label>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button
                    type="button"
                    className="w-full px-4 py-2 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition duration-300"
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