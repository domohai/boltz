// collection_staff/page.jsx
import { 
  handleGetTransferParcelsByCollectionPoint, 
  handleTransferFromCollection 
} from "@back-end/controllers/parcelController.js";

export async function GET(req, res) {
  const collection_point_id = await req.nextUrl.searchParams.get("collection_point_id");
  return handleGetTransferParcelsByCollectionPoint(collection_point_id);
}

export async function POST(req, res) {
  const {parcelsToCollectionPoint, parcelsToServicePoint} = await req.json();
  return handleTransferFromCollection(parcelsToCollectionPoint, parcelsToServicePoint);
}