import { handleGetAllServicePoints, handleAddServicePoint } from '@back-end/controllers/warehouseController';

export async function GET(req, res) {
  return handleGetAllServicePoints(req, res);
}

export async function POST(req, res) {
  return handleAddServicePoint(req, res);
}