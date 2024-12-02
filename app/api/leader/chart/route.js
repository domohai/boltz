import { NextResponse } from "next/server";
import { getMonthlyParcelStats } from "@back-end/models/parcel";

export async function GET(req) {
  try {
    const stats = await getMonthlyParcelStats();
    return NextResponse.json({ stats, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}