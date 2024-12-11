import {handleLogin} from "@back-end/controllers/loginController.js";

export async function POST(req, res) {
  const { email } = await req.json();
  return handleLogin(email);
}