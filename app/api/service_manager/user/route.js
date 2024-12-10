import { 
  handleGetStaffOfSP, 
  handleAdd_SS_User,
  handleDeleteUserById
} from "@back-end/controllers/userController.js";

export async function GET(req, res) {
  const sp_id = await req.nextUrl.searchParams.get('service_point_id');
  return handleGetStaffOfSP(sp_id);
}

export async function POST(req, res) {
  const { name, email, password, role, service_point_id, collection_point_id } = await req.json();
  return handleAdd_SS_User(name, email, password, role, service_point_id, collection_point_id);
}

export async function DELETE(req, res) {
  const id = await req.nextUrl.searchParams.get('id');
  return handleDeleteUserById(id);
}