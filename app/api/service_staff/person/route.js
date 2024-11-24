import {
  handleGetPersonByPhoneNumber,
  handleAddPerson
} from '@back-end/controllers/personController.js';

export async function GET(req, res) {
  return handleGetPersonByPhoneNumber(req, res);
}

export async function POST(req, res) {
  return handleAddPerson(req, res);
}