import { NextResponse } from "next/server";
import { registerUser } from "../../controllers/userController"

export async function POST(req) {
    return registerUser(req)
}
