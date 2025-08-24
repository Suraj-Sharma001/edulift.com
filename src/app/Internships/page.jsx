"use client";
import React, { useState } from "react";

const InternshipPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showApplication, setShowApplication] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    degree: "",
    graduationYear: "",
    linkdin: "",
    position: "",
    resume: "",
  });

  const roles = [
    {
      title: "Software Development",
      items: [
        "Web & Mobile Development",
        "3 Month Duration",
        "Remote / Hybrid",
        "Stipend Available",
      ],
      description:
        "Join our development team to build cutting-edge educational technology solutions. You'll work with modern frameworks like React, Node.js, and mobile technologies to create impactful learning platforms.",
      responsibilities: [
        "Develop responsive web applications using React and modern JavaScript",
        "Build mobile applications for iOS and Android platforms",
        "Collaborate with designers to implement user-friendly interfaces",
        "Write clean, maintainable, and well-documented code",
        "Participate in code reviews and testing processes",
        "Work with APIs and database systems",
      ],
      requirements: [
        "Currently pursuing or recently completed Computer Science/IT degree",
        "Strong knowledge of JavaScript, HTML, and CSS",
        "Experience with React, Vue.js, or Angular",
        "Familiarity with version control systems (Git)",
        "Basic understanding of backend technologies",
        "Problem-solving mindset and attention to detail",
      ],
      skills: ["JavaScript", "React", "Node.js", "Mobile Development", "Git", "API Integration"],
    },
    {
      title: "Data Science",
      items: [
        "Machine Learning & Analytics",
        "3 Month Duration",
        "Remote / Hybrid",
        "Stipend Available",
      ],
      description:
        "Work on exciting data science projects that help improve educational outcomes. You'll analyze student data, build predictive models, and create insights that drive decision-making.",
      responsibilities: [
        "Analyze large datasets to extract meaningful insights",
        "Build and deploy machine learning models",
        "Create data visualizations and dashboards",
        "Collaborate with cross-functional teams",
        "Present findings to stakeholders",
        "Contribute to research and development initiatives",
      ],
      requirements: [
        "Currently pursuing or recently completed Data Science/Statistics degree",
        "Strong knowledge of Python, R, or similar programming languages",
        "Experience with machine learning libraries and frameworks",
        "Familiarity with data visualization tools",
        "Understanding of statistical concepts",
        "Strong analytical and problem-solving skills",
      ],
      skills: ["Python", "Machine Learning", "Data Analysis", "SQL", "Statistics", "Visualization"],
    },
    {
      title: "UI/UX Design",
      items: [
        "User Experience Design",
        "3 Month Duration",
        "Remote / Hybrid",
        "Stipend Available",
      ],
      description:
        "Create beautiful and intuitive user experiences for our educational platform. You'll work on user research, wireframing, prototyping, and visual design to enhance student engagement.",
      responsibilities: [
        "Conduct user research and usability testing",
        "Create wireframes, prototypes, and high-fidelity designs",
        "Collaborate with developers to implement designs",
        "Ensure consistency across all design elements",
        "Gather and incorporate user feedback",
        "Stay updated with design trends and best practices",
      ],
      requirements: [
        "Currently pursuing or recently completed Design/UX degree",
        "Proficiency in design tools like Figma, Sketch, or Adobe Creative Suite",
        "Understanding of user-centered design principles",
        "Experience with prototyping and user testing",
        "Strong visual design and typography skills",
        "Excellent communication and collaboration abilities",
      ],
      skills: ["Figma", "User Research", "Prototyping", "Visual Design", "Wireframing", "Usability Testing"],
    },
  ];

  const handleViewDetails = (role) => setSelectedRole(role);

  const handleBackToRoles = () => {
    setSelectedRole(null);
    setShowApplication(false);
  };

  const handleApplyNow = (position) => {
    setApplicationData({ ...applicationData, position });
    setShowApplication(true);
  };

  const handleInputChange = (e) => {
    setApplicationData({ ...applicationData, [e.target.name]: e.target.value });
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    // Application submitted successfully
    setShowApplication(false);
    setApplicationData({
      name: "",
      email: "",
      phone: "",
      university: "",
      degree: "",
      graduationYear: "",
      linkdin: "",
      position: "",
      resume: "",
    });
  };

  if (showApplication) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#232946] via-[#121629] to-[#232946] text-[#fffffe] py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <button onClick={() => setShowApplication(false)} className="mb-6 flex items-center text-[#b8c1ec] hover:text-[#eebbc3] transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Job Details
          </button>

          <div className="bg-gradient-to-br from-[#121629] to-[#232946] rounded-2xl shadow-2xl p-8 border border-[#b8c1ec]/20">
            <h1 className="text-3xl font-bold text-[#fffffe] mb-2">Apply for {applicationData.position}</h1>
            <p className="text-[#b8c1ec] mb-8">Fill out the form below to submit your application</p>

            <form className="space-y-6" onSubmit={handleSubmitApplication}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Full Name *", name: "name" },
                  { label: "Email *", name: "email" },
                  { label: "Phone", name: "phone" },
                  { label: "University", name: "university" },
                  { label: "Degree", name: "degree" },
                  { label: "Graduation Year", name: "graduationYear" },
                  { label: "LinkedIn", name: "linkdin" },
                  { label: "Resume Link", name: "resume" },
                ].map(({ label, name }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-[#b8c1ec] mb-2">{label}</label>
                    <input
                      type="text"
                      name={name}
                      value={applicationData[name]}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#232946] border border-[#b8c1ec]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#eebbc3] focus:border-transparent text-[#fffffe] placeholder-[#b8c1ec]/50"
                      required={label.includes("*")}
                    />
                  </div>
                ))}
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] text-[#232946] font-bold py-4 px-8 rounded-xl hover:from-[#b8c1ec] hover:to-[#eebbc3] transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:scale-105">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#232946] via-[#121629] to-[#232946] text-[#fffffe] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <button onClick={handleBackToRoles} className="mb-6 flex items-center text-[#b8c1ec] hover:text-[#eebbc3] transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Positions
          </button>

          <div className="bg-gradient-to-br from-[#121629] to-[#232946] rounded-2xl shadow-2xl overflow-hidden border border-[#b8c1ec]/20">
            <div className="bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] px-8 py-12 text-[#232946]">
              <h1 className="text-4xl font-bold mb-4">{selectedRole.title} Internship</h1>
              <p className="text-xl opacity-90 mb-6">{selectedRole.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedRole.skills.map((skill, i) => (
                  <span key={i} className="bg-[#232946]/20 px-4 py-2 rounded-full text-sm font-medium">{skill}</span>
                ))}
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#fffffe] mb-4">Key Details</h3>
                  <ul className="space-y-3">
                    {selectedRole.items.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <span className="bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] rounded-full p-1 mr-3">
                          <svg className="w-4 h-4 text-[#232946]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-[#b8c1ec]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-[#232946] to-[#121629] p-6 rounded-xl border border-[#b8c1ec]/20">
                  <h4 className="text-lg font-semibold text-[#eebbc3] mb-3">What You'll Gain</h4>
                  <ul className="text-[#b8c1ec] space-y-2">
                    <li>• Hands-on experience with industry tools</li>
                    <li>• Mentorship from experienced professionals</li>
                    <li>• Certificate of completion</li>
                    <li>• Networking opportunities</li>
                    <li>• Potential for full-time offer</li>
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#fffffe] mb-4">Responsibilities</h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {selectedRole.responsibilities.map((res, i) => (
                    <li key={i} className="text-[#b8c1ec] text-sm">- {res}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#fffffe] mb-4">Requirements</h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {selectedRole.requirements.map((req, i) => (
                    <li key={i} className="text-[#b8c1ec] text-sm">- {req}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-[#eebbc3]/10 to-[#b8c1ec]/10 p-6 rounded-xl text-center border border-[#b8c1ec]/20">
                <h4 className="text-xl font-semibold text-[#fffffe] mb-3">Ready to Get Started?</h4>
                <p className="text-[#b8c1ec] mb-4">Join our team and make a real impact in education technology!</p>
                <button onClick={() => handleApplyNow(selectedRole.title)} className="px-8 py-3 bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] text-[#232946] font-bold rounded-xl hover:from-[#b8c1ec] hover:to-[#eebbc3] transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
                Join Our Internship Program
              </h1>
              <p className="text-xl text-[#b8c1ec] mb-8 max-w-3xl mx-auto">
                Gain real-world experience and kickstart your career in education technology
              </p>
              <button
                onClick={() => handleApplyNow('General')}
                className="px-8 py-4 bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] text-[#232946] font-bold rounded-xl hover:from-[#b8c1ec] hover:to-[#eebbc3] transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Available Positions */}
      <section className="py-20 px-4 sm:px-6 bg-[#232946] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#eebbc3]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#b8c1ec]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#fffffe]">
              Available <span className="bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] bg-clip-text text-transparent">Positions</span>
            </h2>
            <p className="text-xl text-[#b8c1ec] max-w-3xl mx-auto">
              Explore exciting internship opportunities that match your skills and interests
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((role, idx) => (
              <div
                key={idx}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-[#121629] to-[#232946] p-8 rounded-2xl shadow-xl hover:shadow-2xl border border-[#b8c1ec]/10 hover:border-[#eebbc3]/30 transition-all duration-500 hover:transform hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-[#fffffe] mb-4 group-hover:text-[#eebbc3] transition-colors duration-300">
                    {role.title}
                  </h3>
                  <ul className="mb-6 space-y-2">
                    {role.items.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <span className="bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] rounded-full p-1 mr-3">
                          <svg
                            className="w-4 h-4 text-[#232946]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span className="text-[#b8c1ec] group-hover:text-[#fffffe] transition-colors duration-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleViewDetails(role)}
                    className="w-full py-3 px-6 bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] text-[#232946] font-bold rounded-xl hover:from-[#b8c1ec] hover:to-[#eebbc3] transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 px-4 sm:px-6 bg-[#121629] relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#fffffe]">
              Why Join <span className="bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] bg-clip-text text-transparent">EduLift?</span>
            </h2>
            <p className="text-xl text-[#b8c1ec] max-w-3xl mx-auto">
              Discover the benefits of being part of our innovative team
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: "🎓",
                title: "Meaningful Learning",
                desc: "Work on real-life projects that impact education",
              },
              {
                icon: "🌍",
                title: "Flexible Environment",
                desc: "Enjoy remote or hybrid opportunities tailored to your schedule",
              },
              {
                icon: "💼",
                title: "Career Growth",
                desc: "Gain mentorship, networking, and certification on completion",
              },
              {
                icon: "💰",
                title: "Stipend Support",
                desc: "Get rewarded for your contributions during the internship",
              },
            ].map((point, i) => (
              <div
                key={i}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-[#232946] to-[#121629] p-8 rounded-2xl shadow-xl hover:shadow-2xl border border-[#b8c1ec]/10 hover:border-[#eebbc3]/30 transition-all duration-500 hover:transform hover:-translate-y-2">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#eebbc3]/20 to-[#b8c1ec]/20 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                        {point.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#fffffe] mb-3 group-hover:text-[#eebbc3] transition-colors duration-300">
                        {point.title}
                      </h3>
                      <p className="text-[#b8c1ec] group-hover:text-[#fffffe] transition-colors duration-300">{point.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-[#b8c1ec] to-[#eebbc3] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-4 h-4 bg-[#232946]/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-6 h-6 bg-[#232946]/20 rounded-full animate-pulse delay-300"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#232946] to-[#121629] rounded-3xl shadow-2xl p-12 border border-[#fffffe]/10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-[#fffffe]">
                Frequently Asked <span className="bg-gradient-to-r from-[#eebbc3] to-[#b8c1ec] bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="text-xl text-[#b8c1ec] max-w-3xl mx-auto">
                Everything you need to know about our internship program
              </p>
            </div>
            
            <div className="space-y-8">
              {[
                {
                  question: "How do I apply for an internship?",
                  answer: "You can apply through our website by filling out the application form for your desired position."
                },
                {
                  question: "What is the duration of the internship?",
                  answer: "The duration of the internship is typically 3 months and can vary based on the type of internship."
                },
                {
                  question: "Is the internship paid?",
                  answer: "Yes, we offer a competitive stipend for our internships to support our interns."
                },
                {
                  question: "What are the eligibility criteria for applying?",
                  answer: "Candidates should be currently enrolled in a relevant degree program or have recently graduated."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-[#b8c1ec]/20 pb-6 last:border-b-0">
                  <h3 className="text-xl font-bold text-[#fffffe] mb-3">{faq.question}</h3>
                  <p className="text-[#b8c1ec] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InternshipPage;