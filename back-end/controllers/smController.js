import { getAllServiceManagers, addServiceManager } from "@back-end/models/service_manager.js";
import { NextResponse } from "next/server";

export async function handleGetAllServiceManagers(req, res) {
  try {
    const serviceManagers = await getAllServiceManagers();
    return NextResponse.json({ serviceManagers, ok: true, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false, status: 500 });
  }
}

export async function handleAddServiceManager(name, email, password) {
  try {
    // check if email already exists
    let serviceManager = await getServiceManagerByEmail(email);
    if (!serviceManager) {
      return NextResponse.json({ message: "Email already exists!", ok: false, status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    serviceManager = await addServiceManager(name, email, hashedPassword);
    return NextResponse.json({ message: "Successfully add service manager!", ok: true, status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false, status: 500 });
  }
}