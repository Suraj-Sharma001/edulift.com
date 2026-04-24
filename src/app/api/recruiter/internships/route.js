import { createInternshipListing } from '../../controllers/internshipListingController';

export async function POST(req) {
  return createInternshipListing(req);
}
