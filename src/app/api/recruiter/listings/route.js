import { verifyTokenFromHeader } from '../../utils/auth';
import { InternshipListing } from '../../models/InternshipListingModel';
import { ScholarShip } from '../../models/ScholarShipModel';
import { connectDB } from '../../config/db';

export async function GET(req) {
  try {
    await connectDB();
    const { decoded, error } = verifyTokenFromHeader(req);
    
    if (error || !decoded) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const recruiterId = decoded._id;

    // Fetch both internship and scholarship listings for this recruiter
    const internships = await InternshipListing.find({ recruiterId });
    const scholarships = await ScholarShip.find({ recruiterId });

    // Combine and sort by creation date (newest first)
    const allListings = [
      ...internships.map(l => ({ ...l.toObject(), type: 'Internship' })),
      ...scholarships.map(l => ({ ...l.toObject(), type: 'Scholarship' }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return new Response(JSON.stringify({ listings: allListings }), { status: 200 });
  } catch (err) {
    console.error('Get recruiter listings error:', err);
    return new Response(JSON.stringify({ error: 'Server error', details: err.message }), { status: 500 });
  }
}
