// service_staff/page.jsx
import { handleGetParcelsByServicePoint } from "@back-end/controllers/parcelController.js";

export async function GET(req, res) {
  return handleGetParcelsByServicePoint(req, res);
}