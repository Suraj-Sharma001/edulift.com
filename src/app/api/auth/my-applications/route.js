import { getMyApplications } from '../../controllers/internshipController';

export async function GET(req) {
  return getMyApplications(req);
}
