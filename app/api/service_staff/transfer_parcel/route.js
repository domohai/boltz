import { handleTransferToSrcCollectionPoint } from "@back-end/controllers/parcelController.js";

export async function POST(req, res) {
  return handleTransferToSrcCollectionPoint(req, res);
}