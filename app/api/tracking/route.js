import {handleGetParcelByTrackingCode} from "@back-end/controllers/parcelController.js";

export async function GET(req, res) {
  return handleGetParcelByTrackingCode(req, res);
}