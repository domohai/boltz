import {
  handleGetParcelsByCollectionPoint, 
  handleConfirmParcelsForSrcCollectionPoint
} from "@back-end/controllers/parcelController.js";

export async function GET(req, res) {
  return handleGetParcelsByCollectionPoint(req, res);
}

export async function POST(req, res) {
  return handleConfirmParcelsForSrcCollectionPoint(req, res);
}