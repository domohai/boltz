import { handleGetParcelsForCollectionManager } from "@back-end/controllers/parcelController.js";

export async function GET(req) {
  const collection_point_id = req.nextUrl.searchParams.get('collection_point_id');
  return handleGetParcelsForCollectionManager(collection_point_id);
}