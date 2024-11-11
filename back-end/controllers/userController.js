import { NextResponse } from 'next/server';
import { getAllUsersByRole, addUser, deleteUserById, getAllAvailableCM } from '@back-end/models/user.js';
import bcrypt from 'bcryptjs';

export async function handleGetAllUsersByRole(req, res) {
  const role = req.nextUrl.searchParams.get('role');
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

export async function handleAddUser(req, res) {
  const { name, email, password, _role } = await req.json();
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

export async function handleDeleteUserById(req, id) {
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

export async function handleGetAllAvailableCM(req, res) {
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