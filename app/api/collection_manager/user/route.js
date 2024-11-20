import { handleGetStaffOfCP, handleAdd_CS_User } from "@back-end/controllers/userController.js";

export async function GET(req, res) {
    return handleGetStaffOfCP(req, res);
}

export async function POST(req, res) {
  return handleAdd_CS_User(req, res);
}