import { getInternshipListings } from '../../controllers/internshipListingController';

export async function GET(req) {
  return getInternshipListings(req);
}
