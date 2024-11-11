import { handleDeleteCollectionPoint, handleUpdateCollectionPoint } from "@back-end/controllers/warehouseController";

export async function DELETE(req, { params }) {
  const { id } = params;
  return handleDeleteCollectionPoint(req, id);
}

export async function PUT(req, { params }) {
  const { id } = params;
  return handleUpdateCollectionPoint(req, id);
}