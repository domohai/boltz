"use server";
import pool from '@utils/db.js';
import {ROLES} from '@utils/roles.js';

export async function getAllUsersByRole(role) {
  if (role === ROLES.COLLECTION_MANAGER || role === ROLES.COLLECTION_STAFF) {
    const [result] = await pool.query(
      `SELECT user.id, user.name, user.email, user.role, collection_point.name AS collection_point
      FROM user 
      LEFT JOIN collection_point ON user.collection_point_id = collection_point.id
      WHERE user.role = ?`,
      [role],
    );
    return result;
  } else {
    const [result] = await pool.query(
      `SELECT user.id, user.name, user.email, user.role, service_point.name AS service_point
      FROM user 
      LEFT JOIN service_point ON user.service_point_id = service_point.id
      WHERE user.role = ?`,
      [role],
    );
    return result;
  }
}

export async function addUser(name, email, password, role) {
  const [result] = await pool.query(`INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)`, [name, email, password, role]);
  return { id: result.insertId, name, email, role };
}

export async function deleteUserById(id) {
  const [result] = await pool.query(`DELETE FROM user WHERE id = ?`, [id]);
  return result;
}

export async function getAllAvailableCM() {
  const [result] = await pool.query(
    `SELECT * FROM user WHERE user.role = ? AND user.collection_point_id IS NULL`,
    [ROLES.COLLECTION_MANAGER],
  );
  return result;
}

export async function getStaffOfCP(cp_id) {
  const [result] = await pool.query(
    `SELECT * FROM user WHERE user.role = ? AND user.collection_point_id = ?`,
    [ROLES.COLLECTION_STAFF, cp_id],
  );
  return result;
}