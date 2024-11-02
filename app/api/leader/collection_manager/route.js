import { handleGetAllCollectionManagers, handleAddCollectionManager } from "@back-end/controllers/cmController";

export async function GET(req, res) {
  return handleGetAllCollectionManagers(req, res);
}

export async function POST(req, res) {
  return handleAddCollectionManager(req, res);
}