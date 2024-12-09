import {handleGetAllAvailableSM} from '@back-end/controllers/userController.js';

export async function GET(req, res) {
  return handleGetAllAvailableSM();
}