import { logoutUser } from "../../controllers/userController.js";

export async function POST(req) {
    return logoutUser()
}