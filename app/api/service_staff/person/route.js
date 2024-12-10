import {
  handleGetPersonByPhoneNumber,
  handleAddPerson
} from '@back-end/controllers/personController.js';

export async function GET(req, res) {
  const phone_number = await req.nextUrl.searchParams.get("phone_number");
  return handleGetPersonByPhoneNumber(phone_number);
}

export async function POST(req, res) {
  const {name, phone_number, city, district} = await req.json();
  return handleAddPerson(name, phone_number, city, district);
}