import { applyForInternship } from '../../controllers/internshipController';

export async function POST(req) {
  return applyForInternship(req);
}
