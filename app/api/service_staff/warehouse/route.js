import { handleGetServicePoints } from "@back-end/controllers/warehouseController.js";

export async function GET(req, res) {
  return handleGetServicePoints();
}