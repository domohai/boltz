import { handleGetStaffOfCP, handleAdd_CS_User } from "@back-end/controllers/userController.js";

export async function GET(req, res) {
  const cp_id = await req.nextUrl.searchParams.get('collection_point_id');
  return handleGetStaffOfCP(cp_id);
}

export async function POST(req, res) {
  const { name, email, password, role, collection_point_id, service_point_id } = await req.json();
  return handleAdd_CS_User(name, email, password, role, collection_point_id, service_point_id);
}

