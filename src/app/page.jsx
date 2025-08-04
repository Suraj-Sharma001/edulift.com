import HeroSection from '@/app/components/HeroSection';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      title: 'Financial Aid',
      description: 'Access resources to help fund your education through grants, scholarships, and low-interest loans.',
      icon: '💰',
      gradient: 'from-[#eebbc3] to-[#b8c1ec]'
    },
    {
      title: 'Skill-Based Scholarships',
      description: 'Discover opportunities based on your unique talents, not just academic achievements.',
      icon: '🏆',
      gradient: 'from-[#b8c1ec] to-[#eebbc3]'
    },
    {
      title: 'Micro-Internships',
      description: 'Gain valuable experience through short-term projects with industry-leading companies.',
      icon: '💼',
      gradient: 'from-[#eebbc3] to-[#232946]'
    }
  ];

  const testimonials = [
    {
      quote: "EduLift helped me discover a scholarship I didn't know I qualified for. I'm now pursuing my dream degree!",
      name: "Alex Johnson",
      program: "Computer Science Major",
      avatar: "AJ"
    },
    {
      quote: "The micro-internship I found through EduLift gave me real-world experience that helped me land my first job.",
      name: "Maya Patel",
      program: "Business Administration",
      avatar: "MP"
    },
    {
      quote: "As a first-generation college student, I was lost until I found EduLift. The resources here made higher education possible for me.",
      name: "Carlos Rodriguez",
      program: "Engineering Student",
      avatar: "CR"
    }
  ];

  const stats = [
    { value: '$2.5M+', label: 'Scholarship Funds Awarded', icon: '💎' },
    { value: '15,000+', label: 'Students Supported', icon: '🎓' },
    { value: '1,200+', label: 'Partner Organizations', icon: '🤝' }
  ];

  const benefits = [
    'Personalized scholarship recommendations',
    'Application deadline reminders',
    'Direct connections with internship providers',
    'Community support from peers and mentors',
    '24/7 application assistance',
    'Career guidance and mentorship'
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Enhanced Stats Section */}
      <section className="relative bg-gradient-to-br from-[#232946] via-[#121629] to-[#232946] text-[#fffffe] py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-[#eebbc3] rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#b8c1ec] rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#eebbc3] rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] bg-clip-text text-transparent">
              Making Education Accessible
            </h2>
            <p className="text-lg text-[#b8c1ec] max-w-2xl mx-auto">
              Join thousands of students who have transformed their educational journey with EduLift
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group relative">
                <div className="bg-gradient-to-br from-[#232946] to-[#121629] border border-[#b8c1ec]/20 backdrop-blur-sm p-8 rounded-2xl text-center hover:border-[#eebbc3]/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl shadow-lg">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <p className="text-5xl font-bold mb-3 bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-lg text-[#b8c1ec] group-hover:text-[#fffffe] transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 px-4 sm:px-6 bg-[#232946] relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#121629]/50 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#eebbc3]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#b8c1ec]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#fffffe]">
              How EduLift <span className="bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] bg-clip-text text-transparent">Transforms</span> Your Future
            </h2>
            <p className="text-xl text-[#b8c1ec] max-w-3xl mx-auto">
              Discover the tools and resources that have helped thousands of students achieve their educational dreams
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-gradient-to-br from-[#121629] to-[#232946] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 border border-[#b8c1ec]/10 hover:border-[#eebbc3]/30 overflow-hidden">
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#eebbc3]/20 to-[#b8c1ec]/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl">{feature.icon}</span>
                      </div>
                      <h3 className="font-bold text-2xl mb-4 text-[#fffffe] group-hover:text-[#eebbc3] transition-colors duration-300">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-[#b8c1ec] leading-relaxed group-hover:text-[#fffffe] transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-[#b8c1ec] to-[#eebbc3] relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-4 h-4 bg-[#232946]/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-6 h-6 bg-[#232946]/20 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-1/3 right-20 w-3 h-3 bg-[#232946]/20 rounded-full animate-pulse delay-700"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#232946] to-[#121629] rounded-3xl shadow-2xl overflow-hidden border border-[#fffffe]/10">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-[#eebbc3] to-[#b8c1ec] p-12 text-[#232946] relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#232946]/10 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#232946]/10 rounded-full"></div>
                
                <div className="relative z-10">
                  <h2 className="text-4xl font-bold mb-6 leading-tight">
                    Ready to Start Your 
                    <span className="block text-[#232946]">Educational Journey?</span>
                  </h2>
                  <p className="mb-8 text-lg leading-relaxed">
                    Join thousands of students who've unlocked their potential and found amazing educational opportunities through EduLift.
                  </p>
                  <Link href="/SignUp" className="group inline-flex items-center bg-[#232946] text-[#fffffe] font-bold py-4 px-8 rounded-xl hover:bg-[#121629] transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:scale-105">
                    <span>Start Your Journey</span>
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="md:w-1/2 p-12 bg-gradient-to-br from-[#232946] to-[#121629]">
                <h3 className="text-2xl font-bold mb-8 text-[#eebbc3]">What You'll Get:</h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start group">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] flex items-center justify-center mr-4 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-3 h-3 text-[#232946]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-[#b8c1ec] group-hover:text-[#fffffe] transition-colors duration-300">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 bg-[#121629] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#232946]/30 to-transparent"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#fffffe]">
              Success Stories from Our <span className="bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] bg-clip-text text-transparent">Community</span>
            </h2>
            <p className="text-xl text-[#b8c1ec] max-w-3xl mx-auto">
              Real students, real results. See how EduLift has transformed educational journeys
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group relative">
                <div className="bg-gradient-to-br from-[#232946] to-[#121629] p-8 rounded-2xl shadow-xl hover:shadow-2xl border border-[#b8c1ec]/20 hover:border-[#eebbc3]/40 transition-all duration-500 hover:transform hover:-translate-y-1 h-full flex flex-col">
                  {/* Quote decoration */}
                  <div className="text-[#eebbc3] text-6xl mb-4 opacity-50 group-hover:opacity-70 transition-opacity duration-300 leading-none">
                    "
                  </div>
                  
                  <p className="italic text-[#b8c1ec] mb-8 text-lg leading-relaxed flex-grow group-hover:text-[#fffffe] transition-colors duration-300">
                    {testimonial.quote}
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#eebbc3] to-[#b8c1ec] flex items-center justify-center text-[#232946] font-bold mr-4 group-hover:scale-110 transition-transform duration-300">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-[#fffffe] text-lg">{testimonial.name}</p>
                      <p className="text-[#b8c1ec] group-hover:text-[#eebbc3] transition-colors duration-300">{testimonial.program}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Partnership Section */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-[#232946] to-[#121629] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#b8c1ec]/20 to-transparent"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#eebbc3]/20 to-transparent"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#fffffe]">
            Trusted By <span className="bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] bg-clip-text text-transparent">Leading Institutions</span>
          </h2>
          <p className="text-[#b8c1ec] mb-12 text-lg">
            Partnering with top universities and organizations worldwide
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="group flex justify-center">
                <div className="w-36 h-16 bg-gradient-to-br from-[#b8c1ec]/10 to-[#eebbc3]/10 backdrop-blur-sm border border-[#b8c1ec]/20 rounded-xl flex items-center justify-center text-[#b8c1ec] font-semibold hover:border-[#eebbc3]/40 hover:bg-gradient-to-br hover:from-[#eebbc3]/20 hover:to-[#b8c1ec]/20 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <span className="group-hover:text-[#fffffe] transition-colors duration-300">
                    Partner {i + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}