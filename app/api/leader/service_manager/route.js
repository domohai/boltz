import { handleGetAllServiceManagers } from "@back-end/controllers/smController.js";

export async function GET(req, res) {
  return handleGetAllServiceManagers(req, res);
}