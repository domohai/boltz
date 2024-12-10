import { 
  handleGetAllServicePoints, 
  handleAddServicePoint,
  handleDeleteServicePoint, 
  handleUpdateServicePoint
} from '@back-end/controllers/warehouseController';

export async function GET(req, res) {
  return handleGetAllServicePoints();
}

export async function POST(req, res) {
  const { name, city, district, address, selectedManager } = await req.json();
  return handleAddServicePoint(name, city, district, address, selectedManager);
}

export async function DELETE(req, res) {
  const id = await req.nextUrl.searchParams.get('id');
  return handleDeleteServicePoint(id);
}

export async function PUT(req, res) {
  const id = await req.nextUrl.searchParams.get('id');
  const { name, city, district, address, selectedManager } = await req.json();
  return handleUpdateServicePoint(id, name, city, district, address, selectedManager);
}