import {handleGetConfirmParcelsByServicePoint, handleConfirmParcelsForDesServicePoint} from "@back-end/controllers/parcelController.js";

export async function GET(req, res) {
  return handleGetConfirmParcelsByServicePoint(req, res);
}

export async function POST(req, res) {
  return handleConfirmParcelsForDesServicePoint(req, res);
}