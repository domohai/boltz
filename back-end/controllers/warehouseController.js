import { getAllCollectionPoints, addCollectionPoint, deleteCollectionPoint, updateCollectionPoint } from "@back-end/models/warehouse";
import { NextResponse } from "next/server";
import { assignCMToCP } from "@back-end/models/user";

export async function handleGetAllCollectionPoints(req, res) {
  try {
    const collectionPoints = await getAllCollectionPoints();
    if (!collectionPoints) {
      return NextResponse.json({ message: "Failed to get collection points", ok: false }, { status: 400 });
    }
    return NextResponse.json({ collectionPoints, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleAddCollectionPoint(req, res) {
  try {
    const { name, city, address, selectedManager } = await req.json();
    if (!name || !city || !address) {
      return NextResponse.json({ message: "Missing required fields", ok: false }, { status: 400 });
    }
    const result = await addCollectionPoint({ name, city, address });
    if (!result) {
      return NextResponse.json({ message: "Failed to add collection point", ok: false }, { status: 400 });
    }
    if (selectedManager) {
      const assignResult = await assignCMToCP(result.insertId, selectedManager);
      if (!assignResult) {
        return NextResponse.json({ message: "Failed to assign collection manager to collection point", ok: false }, { status: 400 });
      }
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleDeleteCollectionPoint(req, id) {
  try {
    const result = await deleteCollectionPoint(id);
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Failed to delete collection point", ok: false }, { status: 400 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleUpdateCollectionPoint(req, id) {
  try {
    const { name, city, address, selectedManager } = await req.json();
    if (!name || !city || !address) {
      return NextResponse.json({ message: "Missing required fields", ok: false }, { status: 400 });
    }
    const result = await updateCollectionPoint(id, { name, city, address });
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Failed to update collection point", ok: false }, { status: 400 });
    }
    if (selectedManager) {
      const assignResult = await assignCMToCP(id, selectedManager);
      if (!assignResult) {
        return NextResponse.json({ message: "Failed to assign collection manager to collection point", ok: false }, { status: 400 });
      }
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}