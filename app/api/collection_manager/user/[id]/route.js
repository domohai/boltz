import { NextResponse } from 'next/server';
import { deleteUserById } from '@back-end/models/user';

export async function DELETE(req, { params }) {
  const { id } = params;
  
  try {
    const result = await deleteUserById(id);
    if (!result || result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Failed to delete user or user not found", ok: false }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: "User deleted successfully", ok: true }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { message: error.message, ok: false }, 
      { status: 500 }
    );
  }
}