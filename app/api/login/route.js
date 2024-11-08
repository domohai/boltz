import {handleLogin} from "@back-end/controllers/loginController.js";

export async function POST(req, res) {
  return handleLogin(req, res);
}