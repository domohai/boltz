import {handleGetAllAvailableCM} from '@back-end/controllers/userController.js';

export async function GET(req, res) {
  return handleGetAllAvailableCM(req, res);
}