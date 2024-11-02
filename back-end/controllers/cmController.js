import { 
  getAllCollectionManagers,
  getCollectionManagerById,
  addCollectionManager, 
  getCollectionManagerByEmail,
  deleteCollectionManagerById
 } from "@back-end/models/collection_manager.js";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function handleGetAllCollectionManagers(req, res) {
  try {
    const collectionManagers = await getAllCollectionManagers();
    return NextResponse.json({ collectionManagers , ok : true, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false , status: 500 });
  }
}

export async function handleAddCollectionManager(name, email, password) {
  try {
    // check if email already exists
    let collectionManager = await getCollectionManagerByEmail(email);
    if (!collectionManager) {
      return NextResponse.json({ message: `Email: ${email} already exists!`, ok: false, status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    collectionManager = await addCollectionManager(name, email, hashedPassword);
    return NextResponse.json({message: "Successfully add collection manager!", ok: true, status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false, status: 500 });
  }
}

export async function handleDeleteCollectionManagerById(req, id) {
  try {
    const collectionManager = await getCollectionManagerById(id);
    if (!collectionManager) {
      return NextResponse.json({ message: "Collection manager not found!", ok: false, status: 404 });
    }
    const result = await deleteCollectionManagerById(id);
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Failed to delete collection manager!. Affected rows = 0.", ok: false, status: 500 });
    }
    return NextResponse.json({ message: "Successfully delete collection manager!", ok: true, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false, status: 500 });
  }
}