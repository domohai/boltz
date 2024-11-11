import { handleGetAllCollectionPoints, handleAddCollectionPoint } from "@back-end/controllers/warehouseController";

export async function GET(req, res) {
  return handleGetAllCollectionPoints(req, res);
}

export async function POST(req, res) {
  return handleAddCollectionPoint(req, res);
}