"use server";
import pool from "@utils/db";
import {ROLES} from "@utils/roles.js";

export async function getAllServiceManagers() {
  const [result] = await pool.query(
    `SELECT * FROM user WHERE role = ?`, [ROLES.SERVICE_MANAGER]
  );
  return result;
}

export async function getServiceManagerById(id) {
  const [result] = await pool.query(
    `SELECT * FROM user WHERE id = ? AND role = ?`,
    [id, ROLES.SERVICE_MANAGER]
  );
  return result;
}

export async function addServiceManager(name, email, password) {
  const [result] = await pool.query(
    `INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)`,
    [name, email, password, ROLES.SERVICE_MANAGER]
  );
  return result;
}