import { handleGetStaffOfCP } from "@back-end/controllers/userController.js";

export async function GET(req, res) {
    return handleGetStaffOfCP(req, res);
}