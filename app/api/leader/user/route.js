import { 
  handleGetAllUsersByRole, 
  handleAddUser,
  handleDeleteUserById
} from '@back-end/controllers/userController';

export async function GET(req, res) {
  const role = await req.nextUrl.searchParams.get('role');
  return handleGetAllUsersByRole(role);
} 

export async function POST(req, res) {
  const { name, email, password, _role } = await req.json();
  return handleAddUser(name, email, password, _role);
}

export async function DELETE(req, res) {
  const id = await req.nextUrl.searchParams.get('id');
  return handleDeleteUserById(id);
}