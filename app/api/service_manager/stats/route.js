import {handleGetParcelsByRange} from "@back-end/controllers/parcelController.js";

export async function GET(req, res) {
  return handleGetParcelsByRange(req, res);
}