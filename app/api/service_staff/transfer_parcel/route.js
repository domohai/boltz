import { handleTransferToSrcCollectionPoint } from "@back-end/controllers/parcelController.js";

export async function POST(req, res) {
  const {parcel_ids, status} = await req.json();
  return handleTransferToSrcCollectionPoint(parcel_ids, status);
}