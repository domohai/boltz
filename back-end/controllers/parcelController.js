import { NextResponse } from "next/server";
import { addParcel } from "@back-end/models/parcel.js";

export async function handleAddParcel(req, res) {
  const parcelInfo = await req.json();
  try {
    const parcel = await addParcel(parcelInfo);
    if (!parcel) {
      return NextResponse.json({ message: "Failed to add parcel!", ok: false }, { status: 400 });
    }
    return NextResponse.json({ parcel, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}