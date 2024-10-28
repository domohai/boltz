import { NextResponse } from "next/server";
import { createConnection } from "@utils/db.js";
import { leader } from "@utils/users_data/users_data.js";

export async function POST(req, res) {
  let data = await req.json();
  
  if (!data.email || !data.password || !data.role) {
    return NextResponse.json({ message: "Required field is empty", ok: false }, { status: 400 });
  }

  return NextResponse.json({ res: "Successfully add users", ok: true }, { status: 201 });
}