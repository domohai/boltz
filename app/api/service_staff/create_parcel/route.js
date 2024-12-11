import { handleAddParcel } from "@back-end/controllers/parcelController.js";

export async function POST(req, res) {
  const _parcelInfo = await req.json();
  return handleAddParcel(_parcelInfo);
}