import { handleGetMonthlyParcelStats } from "@back-end/controllers/parcelController.js";

export async function GET(req) {
  return handleGetMonthlyParcelStats(req);
}