import { 
  handleGetAllCollectionPoints, 
  handleAddCollectionPoint,
  handleDeleteCollectionPoint,
  handleUpdateCollectionPoint
} from "@back-end/controllers/warehouseController";

export async function GET(req, res) {
  return handleGetAllCollectionPoints();
}

export async function POST(req, res) {
  const { name, city, address, selectedManager } = await req.json();
  return handleAddCollectionPoint(name, city, address, selectedManager);
}

export async function DELETE(req, res) {
  const id = await req.nextUrl.searchParams.get('id');
  return handleDeleteCollectionPoint(id);
}

export async function PUT(req, res) {
  const id = await req.nextUrl.searchParams.get('id');
  const { name, city, address, selectedManager } = await req.json();
  return handleUpdateCollectionPoint(id, name, city, address, selectedManager);
}