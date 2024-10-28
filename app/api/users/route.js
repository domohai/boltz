import { NextResponse } from "next/server";
import { createConnection } from "@utils/db.js";
import { users } from "@utils/users_data.js";

export function GET() {
  const data = users;
  return NextResponse.json({ data });
}