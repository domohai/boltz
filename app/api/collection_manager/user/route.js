import { handleGetStaffOfCP } from "@back-end/controllers/userController.js";

export async function GET(req, res) {
    return handleGetStaffOfCP(req, res);
}

export async function POST(req, res) {
  return handleAddUser(req, res);
}