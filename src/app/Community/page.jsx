import React from "react"
import {Github, Linkedin, Mail, Instagram} from 'lucide-react'

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
              Our Community
            </h1>
            <p className="text-xl text-[#b8c1ec] max-w-3xl mx-auto leading-relaxed">
              Connect with fellow students, mentors, and the passionate team behind EduLift
            </p>
          </div>
        </div>
      </section>

      {/* Author Section */}
      <section className="py-20 px-4 sm:px-6 bg-[#232946] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#eebbc3]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#b8c1ec]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#121629] to-[#232946] rounded-3xl shadow-2xl overflow-hidden border border-[#b8c1ec]/20">
            <div className="p-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 text-[#fffffe]">
                  Meet The <span className="bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] bg-clip-text text-transparent">Creator</span>
                </h2>
                <p className="text-xl text-[#b8c1ec] max-w-3xl mx-auto">
                  The passionate mind behind EduLift's mission to transform education
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#eebbc3] to-[#b8c1ec] flex items-center justify-center text-[#232946] text-4xl font-bold shadow-xl">
                      SS
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-[#fffffe] mb-3">Suraj Sharma</h3>
                    <p className="text-lg text-[#b8c1ec] mb-4 font-semibold">Web Developer & Influencer</p>
                    <p className="text-[#b8c1ec] leading-relaxed mb-6">
                      I am a passionate Web Developer and Influencer with 2 years of experience in creating interactive platforms. 
                      EduLift is my latest project aimed at making internships and scholarships accessible and engaging for everyone.
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-[#eebbc3] mb-4">Connect With Me</h4>
                      <div className="flex space-x-4">
                        <a
                          href="https://github.com/Suraj-Sharma001"
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#eebbc3]/20 to-[#b8c1ec]/20 flex items-center justify-center text-[#b8c1ec] hover:text-[#eebbc3] transition-all duration-300 hover:scale-110"
                          aria-label="GitHub"
                        >
                          <Github className="w-6 h-6" />
                        </a>
                        <a
                          href="https://linkedin.com/in/Suraj-sharma-99ab95270"
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#eebbc3]/20 to-[#b8c1ec]/20 flex items-center justify-center text-[#eebbc3] hover:text-[#b8c1ec] transition-all duration-300 hover:scale-110"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="w-6 h-6" />
                        </a>  
                        <a
                          href="https://instagram.com/sharma_suraj001"
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#eebbc3]/20 to-[#b8c1ec]/20 flex items-center justify-center text-[#eebbc3] hover:text-[#b8c1ec] transition-all duration-300 hover:scale-110"
                          aria-label="Instagram"
                        >
                          <Instagram className="w-6 h-6" />
                        </a>
                        <a
                          href="mailto:surajsharma60923@gmail.com"
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#eebbc3]/20 to-[#b8c1ec]/20 flex items-center justify-center text-[#eebbc3] hover:text-[#b8c1ec] transition-all duration-300 hover:scale-110"
                          aria-label="Email"
                        >
                          <Mail className="w-6 h-6" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#232946] to-[#121629] p-8 rounded-2xl border border-[#b8c1ec]/20">
                  <h4 className="text-2xl font-bold text-[#eebbc3] mb-6">Skills & Expertise</h4>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "React", "Tailwind CSS", "Node.js", "UI/UX Design", "Educational Technology",
                      "JavaScript", "Next.js", "MongoDB", "API Development", "Responsive Design"
                    ].map((skill, index) => (
                      <span key={index} className="px-4 py-2 bg-gradient-to-r from-[#eebbc3]/20 to-[#b8c1ec]/20 text-[#fffffe] rounded-full text-sm font-medium border border-[#b8c1ec]/30 hover:border-[#eebbc3]/50 transition-all duration-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Values Section */}
      <section className="py-20 px-4 sm:px-6 bg-[#121629] relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#fffffe]">
              Join Our <span className="bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] bg-clip-text text-transparent">Community</span>
            </h2>
            <p className="text-xl text-[#b8c1ec] max-w-3xl mx-auto">
              Connect with like-minded students and professionals who share your passion for education
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤝",
                title: "Network",
                description: "Connect with students, mentors, and professionals in your field of interest."
              },
              {
                icon: "💡",
                title: "Learn",
                description: "Share knowledge, experiences, and insights with our growing community."
              },
              {
                icon: "🚀",
                title: "Grow",
                description: "Find opportunities, collaborations, and support to advance your career."
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

      {/* Footer */}
      <footer className="bg-[#121629] text-[#eebbc3] py-12 border-t border-[#b8c1ec]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-[#b8c1ec]">© 2025 EduLift. All rights reserved.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex justify-center md:justify-end space-x-6">
                <a href="#" className="text-[#b8c1ec] hover:text-[#eebbc3] transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-[#b8c1ec] hover:text-[#eebbc3] transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="text-[#b8c1ec] hover:text-[#eebbc3] transition-colors duration-300">
                  FAQ
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default page;
