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
    console.log("Application submitted:", applicationData);
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
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setShowApplication(false)} className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Job Details
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Apply for {applicationData.position}</h1>
            <p className="text-gray-600 mb-8">Fill out the form below to submit your application</p>

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
                    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                    <input
                      type="text"
                      name={name}
                      value={applicationData[name]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required={label.includes("*")}
                    />
                  </div>
                ))}
              </div>

              <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
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
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <button onClick={handleBackToRoles} className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Positions
          </button>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12 text-white">
              <h1 className="text-4xl font-bold mb-4">{selectedRole.title} Internship</h1>
              <p className="text-xl opacity-90 mb-6">{selectedRole.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedRole.skills.map((skill, i) => (
                  <span key={i} className="bg-blue-500 bg-opacity-50 px-3 py-1 rounded-full text-sm">{skill}</span>
                ))}
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Key Details</h3>
                  <ul className="space-y-3">
                    {selectedRole.items.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <span className="bg-green-100 rounded-full p-1 mr-3">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-800 mb-3">What You'll Gain</h4>
                  <ul className="text-blue-700 space-y-2">
                    <li>• Hands-on experience with industry tools</li>
                    <li>• Mentorship from experienced professionals</li>
                    <li>• Certificate of completion</li>
                    <li>• Networking opportunities</li>
                    <li>• Potential for full-time offer</li>
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Responsibilities</h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {selectedRole.responsibilities.map((res, i) => (
                    <li key={i} className="text-gray-700 text-sm">- {res}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Requirements</h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {selectedRole.requirements.map((req, i) => (
                    <li key={i} className="text-gray-700 text-sm">- {req}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg text-center">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Ready to Get Started?</h4>
                <p className="text-gray-600 mb-4">Join our team and make a real impact in education technology!</p>
                <button onClick={() => handleApplyNow(selectedRole.title)} className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition duration-300 transform hover:scale-105">
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
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg rounded-lg p-8 mb-10 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Join Our Internship Program
        </h1>
        <p className="text-white mb-6">
          Gain real-world experience and kickstart your career in education technology
        </p>
        <button
          onClick={() => handleApplyNow('General')}
          className="px-6 py-3 text-white font-bold bg-green-500 hover:bg-green-600 transition duration-300 rounded-full"
        >
          Apply Now
        </button>
      </div>

      {/* Available Positions */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Available Positions
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-4">
                {role.title}
              </h3>
              <ul className="mb-6 space-y-2">
                {role.items.map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span className="bg-blue-100 rounded-full p-1 mr-2">
                      <svg
                        className="w-4 h-4 text-blue-600"
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
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleViewDetails(role)}
                className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition duration-300"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Why Join Section */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Why Join EduLift?
        </h2>
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
              className="bg-white p-6 rounded-lg shadow-md border border-slate-100 flex"
            >
              <div className="flex-shrink-0 mr-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl text-blue-500">
                  {point.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2 pb-2 border-b border-slate-200">
                  {point.title}
                </h3>
                <p className="text-slate-600">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto m-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-100">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            How do I apply for an internship?
          </h3>
          <p className="text-slate-600 mb-4">
            You can apply through our website by filling out the application form.
          </p>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            What is the duration of the internship?
          </h3>
          <p className="text-slate-600 mb-4">
            The duration of the internship is typically 3 months and can vary based on type of internship.
          </p>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            Is the internship paid?
          </h3>
          <p className="text-slate-600 mb-4">
            Yes, we offer a stipend for our internships.
          </p>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            What are the eligibility criteria for applying?
          </h3>
          <p className="text-slate-600 mb-4">
            Candidates should be currently enrolled in a relevant degree program or have recently graduated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InternshipPage;