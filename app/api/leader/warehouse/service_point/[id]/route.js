import { handleDeleteServicePoint, handleUpdateServicePoint } from '@back-end/controllers/warehouseController.js';

export async function DELETE(req, {params}) {
  const { id } = params;
  return handleDeleteServicePoint(id);
}

export async function PUT(req, {params}) {
  const { id } = params;
  const { name, city, district, address, selectedManager } = await req.json();
  return handleUpdateServicePoint(id, name, city, district, address, selectedManager);
}