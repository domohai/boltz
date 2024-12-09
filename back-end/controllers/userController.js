import { NextResponse } from 'next/server';
import { 
  getAllUsersByRole, 
  addUser, 
  addCS_User, 
  deleteUserById, 
  getAllAvailableCM, 
  getStaffOfCP, 
  getAllAvailableSM, 
  getStaffOfSP,
  addSS_User
} from '@back-end/models/user.js';
import bcrypt from 'bcryptjs';


export async function handleGetAllUsersByRole(role) {
  try {
    const users = await getAllUsersByRole(role);
    if (!users) {
      return NextResponse.json({ message: "Failed to get users", ok: false }, { status: 400 });
    }
    return NextResponse.json({ users, ok : true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleAdd_CS_User(name, email, password, role, collection_point_id, service_point_id) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await addCS_User(name, email, hashedPassword, role, collection_point_id, service_point_id);
    if (!result) {
      return NextResponse.json({ message: "Failed to add user", ok: false }, { status: 400 });
    }
    return NextResponse.json({ user: result, ok: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleAddUser(name, email, password, _role) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await addUser(name, email, hashedPassword, _role);
    if (!result) {
      return NextResponse.json({ message: "Failed to add user", ok: false }, { status: 400 });
    }
    return NextResponse.json({ user: result , ok : true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}


export async function handleDeleteUserById(id) {
  try {
    const result = await deleteUserById(id);
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Failed to delete user", ok: false }, { status: 400 });
    }
    return NextResponse.json({ message: `User deleted successfully! Id: ${id}`, ok : true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleGetAllAvailableCM() {
  try {
    const users = await getAllAvailableCM();
    if (!users) {
      return NextResponse.json({ message: "Failed to available CM!", ok: false }, { status: 400 });
    }
    return NextResponse.json({ users, ok : true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleGetAllAvailableSM() {
  try {
    const users = await getAllAvailableSM();
    if (!users) {
      return NextResponse.json({ message: "Failed to available SM!", ok: false }, { status: 400 });
    }
    return NextResponse.json({ users, ok : true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleGetStaffOfCP(cp_id) {
  try {
    const users = await getStaffOfCP(cp_id);
    if (!users) {
      return NextResponse.json({ message: "Failed to get staff of CP!", ok: false }, { status: 400 });
    }
    // console.log(users);
    return NextResponse.json({ users, ok : true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleGetStaffOfSP(sp_id) {
  try {
    const users = await getStaffOfSP(sp_id);
    if (!users) {
      return NextResponse.json({ message: "Failed to get staff of SP!", ok: false }, { status: 400 });
    }
    console.log(users);
    return NextResponse.json({ users, ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}

export async function handleAdd_SS_User(name, email, password, role, service_point_id, collection_point_id) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await addSS_User(name, email, hashedPassword, role, service_point_id, collection_point_id);
    if (!result) {
      return NextResponse.json({ message: "Failed to add user", ok: false }, { status: 400 });
    }
    return NextResponse.json({ user: result, ok: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false }, { status: 500 });
  }
}