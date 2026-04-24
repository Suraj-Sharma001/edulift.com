import { updateApplicationStatus } from '../../controllers/internshipController';

export async function PATCH(req) {
  return updateApplicationStatus(req);
}
