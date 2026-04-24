import { createScholarshipListing } from '../../controllers/scholarshipListingController';

export async function POST(req) {
  return createScholarshipListing(req);
}
