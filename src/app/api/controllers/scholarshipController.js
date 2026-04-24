import { ScholarshipApplication } from '../models/ScholarshipApplicationModel';
import { Candidate } from '../models/CandidateModel';
import { ScholarshipListing } from '../models/ScholarshipListingModel';
import { NextResponse } from 'next/server';
import { connectDB } from '../config/db';
import { verifyTokenFromHeader, unauthorizedResponse } from '../utils/auth';

export async function applyForScholarship(req) {
    try {
        // Ensure database connection
        await connectDB();
        
        // Verify authentication - only candidates can apply
        const { decoded, error } = verifyTokenFromHeader(req);
        if (error) {
            return unauthorizedResponse('Authentication required to apply for scholarship');
        }
        if (!decoded || decoded.role !== 'candidate') {
            return unauthorizedResponse('Only candidates can apply for scholarships');
        }

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

        // Parse JSON with error handling
        let body;
        try {
            body = await req.json();
        } catch (parseError) {
            console.error('JSON Parsing Error:', parseError);
            return NextResponse.json(
                { error: 'Invalid request body', details: parseError.message },
                { status: 400 }
            );
        }

        const { listingId } = body;

        // Validate listingId
        if (!listingId) {
            return NextResponse.json({ error: 'Listing ID is required' }, { status: 400 });
        }

        const listing = await ScholarshipListing.findById(listingId);
        if (!listing) {
            return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
        }

        // Check for duplicate application using the new model
        const applicationAlreadyExists = await ScholarshipApplication.findOne({
            candidateId: decoded._id,
            listingId: listingId
        });
        
        if (applicationAlreadyExists) {
            return NextResponse.json(
                { error: 'You already applied for this scholarship' },
                { status: 400 }
            );
        }

        // Create new scholarship application
        const newApplication = new ScholarshipApplication({
            listingId: listingId,
            candidateId: decoded._id,
            name: candidate.name,
            email: candidate.email,
            phone: candidate.phone || '',
            college: candidate.college,
            degree: candidate.degree,
            graduationYear: candidate.graduationYear,
            resume: candidate.resume,
            status: 'Applied'
        });

        await newApplication.save();
        
        // Increment applicant count
        await ScholarshipListing.findByIdAndUpdate(listingId, { $inc: { applicantCount: 1 } });

            return NextResponse.json(
                { message: 'Scholarship application submitted successfully', ok: true },
                { status: 201 }
            );

    } catch (error) {
        console.error('Error applying for scholarship:', error);
        return NextResponse.json(
            { error: 'Server error', details: error.message },
            { status: 500 }
        );
    }
}