"use server";
import pool from '@utils/db.js';

export async function getAllUsersByRole(role) {
  const [result] = await pool.query(`SELECT * FROM user WHERE role = ?`, [role]);
  return result;
}

export async function addUser(name, email, password, role) {
  const [result] = await pool.query(`INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)`, [name, email, password, role]);
  return { id: result.insertId, name, email, role };
}

export async function deleteUserById(id) {
  const [result] = await pool.query(`DELETE FROM user WHERE id = ?`, [id]);
  return result;
}