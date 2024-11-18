import { handleDeleteUserById } from "@back-end/controllers/userController";

export async function DELETE(req, {params}) {
  const { id } = params;
  return handleDeleteUserById(req, id);
}