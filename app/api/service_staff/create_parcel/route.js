import { handleAddParcel } from "@back-end/controllers/parcelController.js";

export async function POST(req, res) {
  return handleAddParcel(req, res);
}