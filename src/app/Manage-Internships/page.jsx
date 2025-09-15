import React from "react";
import Link from "next/link";

const ManageInternships = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">Manage Internships</h1>
        <p className="text-lg text-gray-700 mb-8">Here you can create, edit, and view all internship postings.</p>
        <div className="flex flex-col gap-6">
          <Link href="/Manage-Internships/create" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition">Create New Internship</Link>
          <div className="bg-blue-100 rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Your Internship Listings</h2>
            <p className="text-gray-600">(List of internships will appear here)</p>
            {/* TODO: Map over internships and display them here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageInternships;
