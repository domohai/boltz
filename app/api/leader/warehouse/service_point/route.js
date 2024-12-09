import { handleGetAllServicePoints, handleAddServicePoint } from '@back-end/controllers/warehouseController';

export async function GET(req, res) {
  return handleGetAllServicePoints();
}

export async function POST(req, res) {
  const { name, city, district, address, selectedManager } = await req.json();
  return handleAddServicePoint(name, city, district, address, selectedManager);
}