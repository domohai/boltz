import {handleGetParcelByTrackingCode} from "@back-end/controllers/parcelController.js";

export async function GET(req, res) {
  const trackingCode = await req.nextUrl.searchParams.get("trackingCode");
  return handleGetParcelByTrackingCode(trackingCode);
}