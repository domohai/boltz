import { handleDeleteCollectionManagerById } from "@back-end/controllers/cmController.js";

export async function DELETE(req, { params }) {
  const { id } = params;
  return handleDeleteCollectionManagerById(req, id);
}