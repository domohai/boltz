import { 
  getAllCollectionManagers,
  getCollectionManagerById,
  addCollectionManager, 
  getCollectionManagerByEmail
 } from "@back-end/models/collection_manager";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function handleGetAllCollectionManagers(req, res) {
  try {
    const collectionManagers = await getAllCollectionManagers();
    return NextResponse.json(collectionManagers);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function handleAddCollectionManager(req, res) {
  const { name, email, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // check if email already exists
    let collectionManager = await getCollectionManagerByEmail(email);
    if (!collectionManager) {
      return NextResponse.json({ message: "Email already exists!", ok: false }, { status: 400 });
    }
    collectionManager = await addCollectionManager(name, email, hashedPassword);
    console.log(collectionManager);
    return NextResponse.json({message: "Successfully add collection manager!", ok: true}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}