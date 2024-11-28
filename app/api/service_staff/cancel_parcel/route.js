import { handleCancelParcels } from "@back-end/controllers/parcelController";

export async function POST(req, res) {
  return handleCancelParcels(req, res);
}