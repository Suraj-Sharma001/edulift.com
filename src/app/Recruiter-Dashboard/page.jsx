import React from "react";
import Link from "next/link";

const RecruiterDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">Recruiter Dashboard</h1>
        <p className="text-lg text-gray-700 mb-8">Welcome, Recruiter! Here you can manage internships, view candidates, and update your profile.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/Internships">
            <div className="bg-blue-100 rounded-xl p-6 shadow hover:scale-105 transition cursor-pointer">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Manage Internships</h2>
              <p className="text-gray-600">Create, edit, and view internship postings.</p>
            </div>
          </Link>
          <Link href="/Profile">
            <div className="bg-blue-100 rounded-xl p-6 shadow hover:scale-105 transition cursor-pointer">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Profile</h2>
              <p className="text-gray-600">Update your recruiter profile and settings.</p>
            </div>
          </Link>
          <Link href="/Community">
            <div className="bg-blue-100 rounded-xl p-6 shadow hover:scale-105 transition cursor-pointer">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Community</h2>
              <p className="text-gray-600">Connect with other recruiters and candidates.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
