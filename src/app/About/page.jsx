import React from 'react'

const page = () => {
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
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] bg-clip-text text-transparent">
              About EduLift
            </h1>
            <p className="text-xl text-[#b8c1ec] max-w-3xl mx-auto leading-relaxed">
              Empowering students worldwide to access quality education through innovative technology and comprehensive support systems.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 bg-[#232946] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#eebbc3]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#b8c1ec]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-[#fffffe]">
                Our <span className="bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] bg-clip-text text-transparent">Mission</span>
              </h2>
              <p className="text-lg text-[#b8c1ec] mb-6 leading-relaxed">
                To democratize access to education by connecting students with scholarships, internships, and opportunities that match their unique talents and aspirations.
              </p>
              <p className="text-lg text-[#b8c1ec] leading-relaxed">
                We believe that every student deserves the chance to pursue their dreams, regardless of their background or financial circumstances.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#121629] to-[#232946] p-8 rounded-2xl shadow-xl border border-[#b8c1ec]/10">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#eebbc3]/20 to-[#b8c1ec]/20 mb-6">
                  <span className="text-4xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#fffffe]">Vision</h3>
                <p className="text-[#b8c1ec] leading-relaxed">
                  A world where education is accessible to all, and every student can unlock their full potential through personalized opportunities and support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 bg-[#121629] relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#fffffe]">
              Our <span className="bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-[#b8c1ec] max-w-3xl mx-auto">
              The principles that guide everything we do at EduLift
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤝",
                title: "Accessibility",
                description: "Making education opportunities available to students from all backgrounds and circumstances."
              },
              {
                icon: "💡",
                title: "Innovation",
                description: "Continuously improving our platform with cutting-edge technology and user-centered design."
              },
              {
                icon: "❤️",
                title: "Empathy",
                description: "Understanding and supporting the unique challenges and aspirations of each student."
              }
            ].map((value, index) => (
              <div key={index} className="group relative">
                <div className="bg-gradient-to-br from-[#232946] to-[#121629] p-8 rounded-2xl shadow-xl hover:shadow-2xl border border-[#b8c1ec]/10 hover:border-[#eebbc3]/30 transition-all duration-500 hover:transform hover:-translate-y-2">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#eebbc3]/20 to-[#b8c1ec]/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">{value.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-[#fffffe] group-hover:text-[#eebbc3] transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-[#b8c1ec] leading-relaxed group-hover:text-[#fffffe] transition-colors duration-300">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-[#b8c1ec] to-[#eebbc3] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-4 h-4 bg-[#232946]/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-6 h-6 bg-[#232946]/20 rounded-full animate-pulse delay-300"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#232946] to-[#121629] rounded-3xl shadow-2xl overflow-hidden border border-[#fffffe]/10">
            <div className="p-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 text-[#fffffe]">
                  Meet Our <span className="bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] bg-clip-text text-transparent">Team</span>
                </h2>
                <p className="text-xl text-[#b8c1ec] max-w-3xl mx-auto">
                  The passionate individuals behind EduLift&apos;s mission to transform education
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#eebbc3] to-[#b8c1ec] flex items-center justify-center text-[#232946] text-2xl font-bold">
                      SS
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#fffffe] mb-2">Suraj Sharma</h3>
                    <p className="text-[#b8c1ec] mb-3">Founder & Lead Developer</p>
                    <p className="text-[#b8c1ec] leading-relaxed">
                      A passionate web developer with 2 years of experience in creating interactive platforms. 
                      EduLift is his latest project aimed at making internships and scholarships accessible and engaging for everyone.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#121629] to-[#232946] p-6 rounded-2xl border border-[#b8c1ec]/20">
                  <h4 className="text-lg font-semibold text-[#eebbc3] mb-4">Our Commitment</h4>
                  <p className="text-[#b8c1ec] leading-relaxed">
                    We&apos;re committed to continuously improving our platform and expanding our network of partners 
                    to provide even more opportunities for students worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default page
