import { handleDeleteServicePoint, handleUpdateServicePoint } from '@back-end/controllers/warehouseController.js';

export async function DELETE(req, {params}) {
  const { id } = params;
  return handleDeleteServicePoint(req, id);
}

export async function PUT(req, {params}) {
  const { id } = params;
  return handleUpdateServicePoint(req, id);
}