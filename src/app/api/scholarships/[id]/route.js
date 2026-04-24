import { getScholarshipListingDetail, getScholarshipApplicants } from '../../controllers/scholarshipListingController';

export async function GET(req, { params }) {
  const { id } = await params;
  const url = new URL(req.url);
  
  // Check if requesting applicants
  if (url.searchParams.get('applicants') === 'true') {
    return getScholarshipApplicants(req, id);
  }
  
  return getScholarshipListingDetail(req, id);
}
