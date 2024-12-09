// leader/page.jsx
import {handleGetParcelsForLeader} from "@back-end/controllers/parcelController.js";

export async function GET(req, res) {
  return handleGetParcelsForLeader(req, res);
}