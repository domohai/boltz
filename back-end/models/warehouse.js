"use server";
import pool from "@utils/db.js";

// Get all collection points with their managers
export async function getAllCollectionPoints() {
  try {
    const [rows] = await pool.query(
      `SELECT cp.id, cp.city, cp.name, cp.address, u.id AS manager_id, u.name AS manager_name, u.email AS manager_email
      FROM collection_point cp
      LEFT JOIN user u ON u.collection_point_id = cp.id
      WHERE u.role = 'cp_manager' OR u.id IS NULL;`
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

// Get all service points with their managers
export async function getAllServicePoints() {
  try {
    const [rows] = await pool.query(
      `SELECT sp.id, sp.district, sp.city, sp.name, sp.address, u.id AS manager_id, u.name AS manager_name, u.email AS manager_email
      FROM service_point sp
      LEFT JOIN user u ON u.service_point_id = sp.id
      WHERE u.role = 'sp_manager' OR u.id IS NULL;`
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

// Add a new collection point
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

// Add a new service point
export async function addServicePoint({ name, city, district, address }) {
  try {
    const [rows] = await pool.query(
      `INSERT INTO service_point (name, city, district, address) VALUES (?, ?, ?, ?);`,
      [name, city, district, address]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

// Delete a collection point
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

// Delete a service point
export async function deleteServicePoint(id) {
  try {
    const [rows] = await pool.query(
      `DELETE FROM service_point WHERE id = ?;`,
      [id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

// Update information of a collection point
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

// Update information of a service point
export async function updateServicePoint(id, { name, city, district, address }) {
  try {
    const [rows] = await pool.query(
      `UPDATE service_point SET name = ?, city = ?, district = ?, address = ? WHERE id = ?;`,
      [name, city, district, address, id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

// Get all service points without managers
export async function getServicePoints() {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM service_point;`
    );
    return rows;
  } catch (error) {
    throw error;
  }
}