import { NextResponse } from "next/server";

export function GET(_, response) {
  console.log(response.params.id);
  return NextResponse.json({ message: "Hello from the server!" });
}