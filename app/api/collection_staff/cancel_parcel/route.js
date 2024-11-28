import {handleCancelParcels} from "@back-end/controllers/parcelController.js";

export async function POST(req, res) {
  return handleCancelParcels(req, res);
}