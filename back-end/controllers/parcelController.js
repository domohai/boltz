import { NextResponse } from "next/server";
import { addParcel, getParcelsByServicePoint } from "@back-end/models/parcel.js";

export async function handleAddParcel(req, res) {
  const _parcelInfo = await req.json();
  try {
    const parcel = await addParcel(_parcelInfo);
    if (!parcel) {
      return NextResponse.json({ message: "Failed to add parcel!", ok: false }, { status: 400 });
    }
    return NextResponse.json({ parcel, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleGetParcelsByServicePoint(req, res) {
  const service_point_id = await req.nextUrl.searchParams.get("service_point_id");
  // console.log(service_point_id);
  try {
    const parcels = await getParcelsByServicePoint(service_point_id);
    if (!parcels) {
      return NextResponse.json({ message: "Failed to get parcels!", ok: false }, { status: 400 });
    }
    // console.log(parcels);
    return NextResponse.json({ parcels, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}