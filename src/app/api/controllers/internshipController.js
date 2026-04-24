import { InternshipApplication } from '../models/InternshipApplicationModel';
import { ScholarshipApplication } from '../models/ScholarshipApplicationModel';
import { Candidate } from '../models/CandidateModel';
import { InternshipListing } from '../models/InternshipListingModel';
import { NextResponse } from 'next/server';
import { connectDB } from '../config/db';
import { verifyTokenFromHeader, unauthorizedResponse } from '../utils/auth';

export async function applyForInternship(req) {
  try {
    await connectDB();

    // Verify authentication - candidate only
    const { decoded, error } = verifyTokenFromHeader(req);
    if (error) return unauthorizedResponse('Authentication required to apply for internship');
    if (!decoded || decoded.role !== 'candidate') return unauthorizedResponse('Only candidates can apply for internships');

    let body;
    try {
      body = await req.json();
    } catch (err) {
      return NextResponse.json({ error: 'Invalid JSON body', details: err.message }, { status: 400 });
    }

    const { listingId, name, email, phone, college, degree, graduationYear, resume, position } = body;

    // Get candidate profile
    const candidate = await Candidate.findById(decoded._id);
    if (!candidate) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }

    // Check if profile is complete
    const isProfileComplete = !!(
      candidate.name && 
      candidate.email && 
      candidate.phone && 
      candidate.college && 
      candidate.degree && 
      candidate.graduationYear && 
      candidate.resume
    );

    if (!isProfileComplete) {
      return NextResponse.json({ 
        error: 'Profile incomplete. Please complete your profile before applying.',
        missingFields: {
          name: !candidate.name,
          email: !candidate.email,
          phone: !candidate.phone,
          college: !candidate.college,
          degree: !candidate.degree,
          graduationYear: !candidate.graduationYear,
          resume: !candidate.resume
        }
      }, { status: 400 });
    }

    // If listingId provided, use listing-based application
    if (listingId) {
      const listing = await InternshipListing.findById(listingId);
      if (!listing) {
        return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
      }

      // Check duplicate application by listing
      const existing = await InternshipApplication.findOne({ 
        candidateId: decoded._id, 
        listingId 
      });
      if (existing) {
        return NextResponse.json({ error: 'You have already applied for this position' }, { status: 400 });
      }

      const app = new InternshipApplication({
        listingId,
        candidateId: decoded._id,
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        college: candidate.college,
        degree: candidate.degree,
        graduationYear: candidate.graduationYear,
        resume: candidate.resume,
        position: listing.title,
        status: 'Applied'
      });

      try {
        await app.save();
        // Increment applicant count
        await InternshipListing.findByIdAndUpdate(listingId, { $inc: { applicantCount: 1 } });
      } catch (err) {
        if (err.code === 11000) {
          return NextResponse.json({ error: 'You have already applied for this position' }, { status: 400 });
        }
        throw err;
      }

      return NextResponse.json({ message: 'Application submitted', ok: true, applicationId: app._id }, { status: 201 });
    }

    // Fallback: position-based application (legacy)
    if (!position) {
      return NextResponse.json({ error: 'Position or listing ID is required' }, { status: 400 });
    }

    const existing = await InternshipApplication.findOne({ candidateId: decoded._id, position });
    if (existing) {
      return NextResponse.json({ error: 'You have already applied for this position' }, { status: 400 });
    }

    const app = new InternshipApplication({
      candidateId: decoded._id,
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      college: candidate.college,
      degree: candidate.degree,
      graduationYear: candidate.graduationYear,
      resume: candidate.resume,
      position,
      status: 'Applied'
    });

    try {
      await app.save();
    } catch (err) {
      if (err.code === 11000) {
        return NextResponse.json({ error: 'You have already applied for this position' }, { status: 400 });
      }
      throw err;
    }

    return NextResponse.json({ message: 'Application submitted', ok: true, applicationId: app._id }, { status: 201 });
  } catch (err) {
    console.error('Internship apply error:', err);
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 });
  }
}

export async function updateApplicationStatus(req) {
  try {
    await connectDB();
    const { decoded, error } = verifyTokenFromHeader(req);
    if (error) return unauthorizedResponse('Authentication required');
    if (!decoded || decoded.role !== 'recruiter') return unauthorizedResponse('Only recruiters can update application status');

    let body;
    try {
      body = await req.json();
    } catch (err) {
      return NextResponse.json({ error: 'Invalid JSON body', details: err.message }, { status: 400 });
    }

    const { applicationId, status } = body;
    if (!applicationId || !status) return NextResponse.json({ error: 'applicationId and status are required' }, { status: 400 });

    const allowed = ['Applied', 'Under Review', 'Shortlisted', 'Selected', 'Rejected'];
    if (!allowed.includes(status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 });

    const app = await InternshipApplication.findById(applicationId);
    if (!app) return NextResponse.json({ error: 'Application not found' }, { status: 404 });

    app.status = status;
    await app.save();

    return NextResponse.json({ ok: true, application: app }, { status: 200 });
  } catch (err) {
    console.error('Update application status error:', err);
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 });
  }
}

export async function getMyApplications(req) {
  try {
    await connectDB();
    const { decoded, error } = verifyTokenFromHeader(req);
    if (error) return unauthorizedResponse('Authentication required');

    // Fetch both internship and scholarship applications
    const internshipApps = await InternshipApplication.find({ candidateId: decoded._id })
      .populate('listingId')
      .sort({ createdAt: -1 });
    
    const scholarshipApps = await ScholarshipApplication.find({ candidateId: decoded._id })
      .populate('listingId')
      .sort({ createdAt: -1 });

    // Combine and sort by date
    const allApplications = [
      ...internshipApps.map(app => ({ ...app.toObject(), type: 'Internship' })),
      ...scholarshipApps.map(app => ({ ...app.toObject(), type: 'Scholarship' }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return NextResponse.json({ ok: true, applications: allApplications }, { status: 200 });
  } catch (err) {
    console.error('Get my applications error:', err);
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 });
  }
}
