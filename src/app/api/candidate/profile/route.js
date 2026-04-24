import { getCandidateProfile, updateCandidateProfile } from '../../controllers/profileController';

export async function GET(req) {
  return getCandidateProfile(req);
}

export async function POST(req) {
  return updateCandidateProfile(req);
}
