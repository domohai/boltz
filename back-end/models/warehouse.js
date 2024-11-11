"use server";
import pool from "@utils/db.js";

export async function getAllCollectionPoints() {
  try {
    const [rows] = await pool.query(
      `SELECT cp.id, cp.city, cp.name, cp.address, u.email AS manager_email
      FROM collection_point cp
      LEFT JOIN user u ON u.collection_point_id = cp.id;`
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

export async function addCollectionPoint({ name, city, address }) {
  try {
    const [rows] = await pool.query(
      `INSERT INTO collection_point (name, city, address) VALUES (?, ?, ?);`,
      [name, city, address]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

export async function deleteCollectionPoint(id) {
  try {
    const [rows] = await pool.query(
      `DELETE FROM collection_point WHERE id = ?;`,
      [id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

export async function updateCollectionPoint(id, { name, city, address }) {
  try {
    const [rows] = await pool.query(
      `UPDATE collection_point SET name = ?, city = ?, address = ? WHERE id = ?;`,
      [name, city, address, id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}