import { Candidate } from '../models/CandidateModel';
import { NextResponse } from 'next/server';
import { connectDB } from '../config/db';
import { verifyTokenFromHeader, unauthorizedResponse } from '../utils/auth';

export async function getCandidateProfile(req) {
  try {
    await connectDB();

    // Verify authentication
    const { decoded, error } = verifyTokenFromHeader(req);
    if (error) return unauthorizedResponse('Authentication required');
    if (!decoded || decoded.role !== 'candidate') return unauthorizedResponse('Only candidates can access profile');

    const candidate = await Candidate.findById(decoded._id).select('-password');
    if (!candidate) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }

    // Check if profile is complete
    const isComplete = !!(
      candidate.name && 
      candidate.email && 
      candidate.phone && 
      candidate.college && 
      candidate.degree && 
      candidate.graduationYear && 
      candidate.resume
    );

    return NextResponse.json({
      profile: {
        _id: candidate._id,
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        college: candidate.college,
        degree: candidate.degree,
        graduationYear: candidate.graduationYear,
        resume: candidate.resume,
        profileComplete: isComplete
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}

export async function updateCandidateProfile(req) {
  try {
    await connectDB();

    // Verify authentication
    const { decoded, error } = verifyTokenFromHeader(req);
    if (error) return unauthorizedResponse('Authentication required');
    if (!decoded || decoded.role !== 'candidate') return unauthorizedResponse('Only candidates can update profile');

    const body = await req.json();
    const { phone, college, degree, graduationYear, resume } = body;

    // Update profile
    const candidate = await Candidate.findByIdAndUpdate(
      decoded._id,
      {
        phone: phone || '',
        college: college || '',
        degree: degree || '',
        graduationYear: graduationYear || '',
        resume: resume || ''
      },
      { new: true }
    ).select('-password');

    // Check if profile is complete
    const isComplete = !!(
      candidate.name && 
      candidate.email && 
      candidate.phone && 
      candidate.college && 
      candidate.degree && 
      candidate.graduationYear && 
      candidate.resume
    );

    return NextResponse.json({
      message: 'Profile updated successfully',
      profile: {
        _id: candidate._id,
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        college: candidate.college,
        degree: candidate.degree,
        graduationYear: candidate.graduationYear,
        resume: candidate.resume,
        profileComplete: isComplete
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
