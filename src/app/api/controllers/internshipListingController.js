import { InternshipListing } from '../models/InternshipListingModel';
import { InternshipApplication } from '../models/InternshipApplicationModel';
import { NextResponse } from 'next/server';
import { connectDB } from '../config/db';
import { verifyTokenFromHeader, unauthorizedResponse } from '../utils/auth';

export async function createInternshipListing(req) {
  try {
    await connectDB();

    // Verify authentication - recruiter only
    const { decoded, error } = verifyTokenFromHeader(req);
    if (error) return unauthorizedResponse('Authentication required');
    if (!decoded || decoded.role !== 'recruiter') return unauthorizedResponse('Only recruiters can create listings');

    const body = await req.json();
    const { title, company, description, deadline } = body;

    if (!title || !company || !description || !deadline) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const listing = new InternshipListing({
      recruiterId: decoded._id,
      title,
      company,
      description,
      deadline: new Date(deadline)
    });

    await listing.save();

    return NextResponse.json({
      message: 'Internship listing created successfully',
      listing
    }, { status: 201 });
  } catch (error) {
    console.error('Create listing error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}

export async function getInternshipListings(req) {
  try {
    await connectDB();

    const listings = await InternshipListing.find({ status: 'active' })
      .sort({ createdAt: -1 })
      .populate('recruiterId', 'name company');

    const listingsWithAppliedStatus = [];

    // If user is authenticated, check if they applied to each listing
    const { decoded } = verifyTokenFromHeader(req);
    
    for (const listing of listings) {
      let applied = false;
      if (decoded && decoded.role === 'candidate') {
        const application = await InternshipApplication.findOne({
          listingId: listing._id,
          candidateId: decoded._id
        });
        applied = !!application;
      }

      listingsWithAppliedStatus.push({
        ...listing.toObject(),
        applied
      });
    }

    return NextResponse.json({
      listings: listingsWithAppliedStatus
    }, { status: 200 });
  } catch (error) {
    console.error('Get listings error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}

export async function getInternshipListingDetail(req, listingId) {
  try {
    await connectDB();

    const listing = await InternshipListing.findById(listingId).populate('recruiterId', 'name company');
    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    let applied = false;
    const { decoded } = verifyTokenFromHeader(req);
    if (decoded && decoded.role === 'candidate') {
      const application = await InternshipApplication.findOne({
        listingId,
        candidateId: decoded._id
      });
      applied = !!application;
    }

    return NextResponse.json({
      listing: {
        ...listing.toObject(),
        applied
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Get listing detail error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}

export async function getInternshipApplicants(req, listingId) {
  try {
    await connectDB();

    // Verify authentication - recruiter only
    const { decoded, error } = verifyTokenFromHeader(req);
    if (error) return unauthorizedResponse('Authentication required');
    if (!decoded || decoded.role !== 'recruiter') return unauthorizedResponse('Only recruiters can view applicants');

    // Verify recruiter owns this listing
    const listing = await InternshipListing.findById(listingId);
    if (!listing || listing.recruiterId.toString() !== decoded._id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const applicants = await InternshipApplication.find({ listingId }).sort({ createdAt: -1 });

    return NextResponse.json({
      applicants
    }, { status: 200 });
  } catch (error) {
    console.error('Get applicants error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
