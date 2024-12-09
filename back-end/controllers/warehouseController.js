import { 
  getAllCollectionPoints, 
  addCollectionPoint, 
  deleteCollectionPoint, 
  updateCollectionPoint, 
  getAllServicePoints,
  deleteServicePoint,
  addServicePoint,
  updateServicePoint,
  getServicePoints } from "@back-end/models/warehouse.js";
import { NextResponse } from "next/server";
import { assignCMToCP, assignSMToSP } from "@back-end/models/user.js";

export async function handleGetAllCollectionPoints() {
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

export async function handleGetAllServicePoints() {
  try {
    const servicePoints = await getAllServicePoints();
    if (!servicePoints) {
      return NextResponse.json({ message: "Failed to get service points", ok: false }, { status: 400 });
    }
    return NextResponse.json({ servicePoints, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleAddCollectionPoint(name, city, address, selectedManager) {
  try {
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

export async function handleAddServicePoint(name, city, district, address, selectedManager) {
  try {
    if (!name || !city || !district || !address) {
      return NextResponse.json({ message: "Missing required fields", ok: false }, { status: 400 });
    }
    const result = await addServicePoint({ name, city, district, address });
    if (!result) {
      return NextResponse.json({ message: "Failed to add service point", ok: false }, { status: 400 });
    }
    if (selectedManager) {
      const assignResult = await assignCMToCP(result.insertId, selectedManager);
      if (!assignResult) {
        return NextResponse.json({ message: "Failed to assign collection manager to service point", ok: false }, { status: 400 });
      }
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleDeleteCollectionPoint(id) {
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

export async function handleDeleteServicePoint(id) {
  try {
    const result = await deleteServicePoint(id);
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Failed to delete service point", ok: false }, { status: 400 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleUpdateCollectionPoint(id, name, city, address, selectedManager) {
  try {
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

export async function handleUpdateServicePoint(id, name, city, district, address, selectedManager) {
  try {
    if (!name || !city || !district || !address) {
      return NextResponse.json({ message: "Missing required fields", ok: false }, { status: 400 });
    }
    const result = await updateServicePoint(id, { name, city, district, address });
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Failed to update service point", ok: false }, { status: 400 });
    }
    if (selectedManager) {
      const assignResult = await assignSMToSP(id, selectedManager);
      if (!assignResult) {
        return NextResponse.json({ message: "Failed to assign service manager to service point", ok: false }, { status: 400 });
      }
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleGetServicePoints() {
  try {
    const servicePoints = await getServicePoints();
    if (!servicePoints) {
      return NextResponse.json({ message: "Failed to get city list", ok: false }, { status: 400 });
    }
    return NextResponse.json({ servicePoints, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}