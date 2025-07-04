import { loginUser } from "../../controllers/userController";

export async function POST(req) {
    return loginUser(req)
}
