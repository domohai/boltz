import {handleGetWaitingParcelsByServicePoint, handleConfirmDeliveredParcels} from "@back-end/controllers/parcelController.js"; 

export async function GET(req, res) {
  const service_point_id = await req.nextUrl.searchParams.get("service_point_id");
  return handleGetWaitingParcelsByServicePoint(service_point_id);
}

export async function POST(req, res) {
  const {parcel_ids, status} = await req.json();
  return handleConfirmDeliveredParcels(parcel_ids, status);
}