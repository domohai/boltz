import { NextResponse } from "next/server";
import { getMonthlyParcelStatsByCP } from "@back-end/models/parcel";

export async function GET(req) {
  try {
    const collection_point_id = req.nextUrl.searchParams.get('collection_point_id');
    console.log("API received collection_point_id:", collection_point_id);
    
    if (!collection_point_id) {
      return NextResponse.json({ 
        message: "Missing collection_point_id", 
        ok: false 
      }, { status: 400 });
    }

    const stats = await getMonthlyParcelStatsByCP(collection_point_id);
    return NextResponse.json({ stats, ok: true }, { status: 200 });
  } catch (error) {
    console.error("Chart API error:", error);
    return NextResponse.json({ 
      message: error.message, 
      ok: false 
    }, { status: 500 });
  }
}