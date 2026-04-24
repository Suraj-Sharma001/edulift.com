import { getScholarshipListings } from '../../controllers/scholarshipListingController';

export async function GET(req) {
  return getScholarshipListings(req);
}
