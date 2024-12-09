// service_staff/page.jsx
import { handleGetParcelsByServicePoint } from "@back-end/controllers/parcelController.js";

export async function GET(req, res) {
  const service_point_id = await req.nextUrl.searchParams.get("service_point_id");
  return handleGetParcelsByServicePoint(service_point_id);
}