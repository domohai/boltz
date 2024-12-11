import {handleGetParcelsByRange} from "@back-end/controllers/parcelController.js";

export async function GET(req, res) {
  const service_point_id = await req.nextUrl.searchParams.get("service_point_id");
  const start_date = await req.nextUrl.searchParams.get("start_date");
  const end_date = await req.nextUrl.searchParams.get("end_date");
  return handleGetParcelsByRange(service_point_id, start_date, end_date);
}