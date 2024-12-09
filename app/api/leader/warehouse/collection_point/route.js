import { handleGetAllCollectionPoints, handleAddCollectionPoint } from "@back-end/controllers/warehouseController";

export async function GET(req, res) {
  return handleGetAllCollectionPoints();
}

export async function POST(req, res) {
  const { name, city, address, selectedManager } = await req.json();
  return handleAddCollectionPoint(name, city, address, selectedManager);
}