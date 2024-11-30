import {handleGetWaitingParcelsByServicePoint, handleConfirmDeliveredParcels} from "@back-end/controllers/parcelController.js"; 

export async function GET(req, res) {
  return handleGetWaitingParcelsByServicePoint(req, res);
}

export async function POST(req, res) {
  return handleConfirmDeliveredParcels(req, res);
}