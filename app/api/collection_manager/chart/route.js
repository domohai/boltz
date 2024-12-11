import { handleGetMonthlyParcelStats } from "@back-end/controllers/parcelController.js";

export async function GET(req, res) {
  const collection_point_id = await req.nextUrl.searchParams.get('collection_point_id');
  return handleGetMonthlyParcelStats(collection_point_id);
}