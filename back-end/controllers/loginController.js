import pool from "@utils/db";
import { NextResponse } from "next/server";

export const handleLogin = async (req, res) => {
  const { email } = await req.json();
  try {
    const user = await pool.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    if (user.rows.length === 0) {
      return NextResponse.json({ message: 'Email không đúng', ok: false }, { status: 400 });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordMatch) {
      return NextResponse.json({ message: 'Mật khẩu không đúng', ok: false }, { status: 400 });
    }
    return NextResponse.json({message: 'Đăng nhập thành công!' ,ok: true });
  } catch (error) {
    return NextResponse.json({ message: error.message , ok: false}, { status: 500 });
  }
}
