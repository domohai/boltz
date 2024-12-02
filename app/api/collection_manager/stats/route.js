import { NextResponse } from "next/server";
import { getParcelStatsByStatus } from "@back-end/models/parcel";

export async function GET(req) {
  try {
    const cp_id = req.nextUrl.searchParams.get('collection_point_id');
    const stats = await getParcelStatsByStatus(cp_id);
    return NextResponse.json({ stats, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message, ok: false },
      { status: 500 }
    );
  }
}