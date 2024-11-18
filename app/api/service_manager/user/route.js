import { handleGetStaffOfSP, handleAdd_SS_User } from "@back-end/controllers/userController.js";

export async function GET(req, res) {
  return handleGetStaffOfSP(req, res);
}

export async function POST(req, res) {
  return handleAdd_SS_User(req, res);
}