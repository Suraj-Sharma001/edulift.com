import { getInternshipListingDetail, getInternshipApplicants } from '../../controllers/internshipListingController';

export async function GET(req, { params }) {
  const { id } = await params;
  const url = new URL(req.url);
  
  // Check if requesting applicants
  if (url.searchParams.get('applicants') === 'true') {
    return getInternshipApplicants(req, id);
  }
  
  return getInternshipListingDetail(req, id);
}
