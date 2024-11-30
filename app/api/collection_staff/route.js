// collection_staff/page.jsx
import { 
  handleGetTransferParcelsByCollectionPoint, 
  handleTransferFromCollection 
} from "@back-end/controllers/parcelController.js";

export async function GET(req, res) {
  return handleGetTransferParcelsByCollectionPoint(req, res);
}

export async function POST(req, res) {
  return handleTransferFromCollection(req, res);
}