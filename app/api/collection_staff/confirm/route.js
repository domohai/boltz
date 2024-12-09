import {
  handleGetParcelsByCollectionPoint, 
  handleConfirmParcels
} from "@back-end/controllers/parcelController.js";

export async function GET(req, res) {
  const collection_point_id = await req.nextUrl.searchParams.get("collection_point_id");
  return handleGetParcelsByCollectionPoint(collection_point_id);
}

export async function POST(req, res) {
  const {parcelsFromSrcServicePoint, parcelsFromSrcCollectionPoint} = await req.json();
  return handleConfirmParcels(parcelsFromSrcServicePoint, parcelsFromSrcCollectionPoint);
}