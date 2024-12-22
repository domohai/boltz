import {handleGetParcelsForCollectionManager} from "@back-end/controllers/parcelController.js";

export async function GET(req) {
    const collection_point_id = req.nextUrl.searchParams.get('collection_point_id');
    const start_date = req.nextUrl.searchParams.get("start_date");
    const end_date = req.nextUrl.searchParams.get("end_date");
    return handleGetParcelsForCollectionManager(collection_point_id, start_date, end_date);
  }