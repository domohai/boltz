import { handleGetCityList } from "@back-end/controllers/warehouseController.js";

export async function GET(req, res) {
  return handleGetCityList(req, res);
}