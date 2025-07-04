import HeroSection from '@/app/components/HeroSection';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      title: 'Financial Aid',
      description: 'Access resources to help fund your education through grants, scholarships, and low-interest loans.',
      icon: '💰'
    },
    {
      title: 'Skill-Based Scholarships',
      description: 'Discover opportunities based on your unique talents, not just academic achievements.',
      icon: '🏆'
    },
    {
      title: 'Micro-Internships',
      description: 'Gain valuable experience through short-term projects with industry-leading companies.',
      icon: '💼'
    }
  ];

  const testimonials = [
    {
      quote: "EduLift helped me discover a scholarship I didn't know I qualified for. I'm now pursuing my dream degree!",
      name: "Alex Johnson",
      program: "Computer Science Major"
    },
    {
      quote: "The micro-internship I found through EduLift gave me real-world experience that helped me land my first job.",
      name: "Maya Patel",
      program: "Business Administration"
    },
    {
      quote: "As a first-generation college student, I was lost until I found EduLift. The resources here made higher education possible for me.",
      name: "Carlos Rodriguez",
      program: "Engineering Student"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-violet-700 to-orange-500 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <p className="text-4xl font-bold mb-2">$1M+</p>
              <p className="text-lg">Scholarship Funds Awarded</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold mb-2">12,000+</p>
              <p className="text-lg">Students Supported</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold mb-2">850+</p>
              <p className="text-lg">Partner Organizations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How EduLift Helps You Succeed</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-300 border-t-4 border-orange-500">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="mb-6">Join thousands of students who've found educational opportunities through EduLift.</p>
              <Link href="/SignUp" className="inline-block bg-white text-orange-600 font-bold py-3 px-6 rounded-lg hover:bg-orange-100 transition-colors duration-300 shadow-md">
                Sign Up Free
              </Link>
            </div>
            <div className="md:w-1/2 p-12">
              <h3 className="text-xl font-bold mb-4 text-gray-800">What You'll Get:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Personalized scholarship recommendations</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Application deadline reminders</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Direct connections with internship providers</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Community support from peers and mentors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Students Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="text-orange-500 text-4xl mb-4">"</div>
                <p className="italic text-gray-700 mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-600 font-bold mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.program}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">Trusted By Leading Institutions</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-70">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-center">
                <div className="w-32 h-12 bg-gray-300 rounded flex items-center justify-center text-gray-500 font-semibold">
                  Partner {i+1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
