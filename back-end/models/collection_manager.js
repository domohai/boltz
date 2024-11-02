"use server";
import pool from "@utils/db.js";
import {ROLES} from "@utils/roles.js";

export async function getAllCollectionManagers() {
  const [result] = await pool.query(
    `SELECT * FROM user WHERE role = ?`, [ROLES.COLLECTION_MANAGER]
  );
  return result;
}

export async function getCollectionManagerById(id) {
  const [result] = await pool.query(
    `SELECT * FROM user WHERE id = ? AND role = ?`,
    [id, ROLES.COLLECTION_MANAGER]
  );
  return result;
}

export async function getCollectionManagerByEmail(email) {
  const [result] = await pool.query(
    `SELECT * FROM user WHERE email = ? AND role = ?`,
    [email, ROLES.COLLECTION_MANAGER]
  );
  return result;
}

export async function addCollectionManager(name, email, password) {
  const [result] = await pool.query(
    `INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)`,
    [name, email, password, ROLES.COLLECTION_MANAGER]
  );
  return { id: result.insertId , name, email, role: ROLES.COLLECTION_MANAGER };
}

export async function deleteCollectionManagerById(id) {
  const [result] = await pool.query(
    `DELETE FROM user WHERE id = ?`, [id]
  );
  return result;
}