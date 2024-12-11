// take reqs from leader/page.jsx
import {handleGetParcelsForLeader} from "@back-end/controllers/parcelController.js";

export async function GET(req, res) {
  const start_date = await req.nextUrl.searchParams.get("start_date");
  const end_date = await req.nextUrl.searchParams.get("end_date");
  return handleGetParcelsForLeader(start_date, end_date);
}