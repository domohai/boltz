import { handleCancelParcels } from "@back-end/controllers/parcelController";

export async function POST(req, res) {
  const {parcel_ids, status} = await req.json();
  return handleCancelParcels(parcel_ids, status);
}