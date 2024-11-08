import { handleGetAllUsersByRole, handleAddUser } from '@back-end/controllers/userController';

export async function GET(req, res) {
  return handleGetAllUsersByRole(req, res);
} 

export async function POST(req, res) {
  return handleAddUser(req, res);
}