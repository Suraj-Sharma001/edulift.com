import { logoutUser } from '../../controllers/userController';

export async function POST() {
  return logoutUser();
}
