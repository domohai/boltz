import { handleAddCollectionManager } from "@back-end/controllers/cmController.js";
import { handleAddServiceManager } from "@back-end/controllers/smController.js";
import { ROLES } from "@utils/roles.js";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { name, email, password, role } = await req.json();
  if (role === ROLES.COLLECTION_MANAGER) {
    return handleAddCollectionManager(name, email, password);
  } else if (role === ROLES.SERVICE_MANAGER) {
    return handleAddServiceManager(name, email, password);
  }
  return NextResponse.json({ message: "Cannot add other account in SM and CM route!", ok: false, status: 400 });
}