import { handleDeleteCollectionPoint, handleUpdateCollectionPoint } from "@back-end/controllers/warehouseController";

export async function DELETE(req, { params }) {
  const { id } = params;
  return handleDeleteCollectionPoint(id);
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { name, city, address, selectedManager } = await req.json();
  return handleUpdateCollectionPoint(id, name, city, address, selectedManager);
}