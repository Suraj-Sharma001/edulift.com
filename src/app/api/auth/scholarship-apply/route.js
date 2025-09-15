import { applyForScholarship } from "../../controllers/scholarshipController";

export async function POST(req) {
    return applyForScholarship(req);
}
