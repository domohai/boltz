import pool from "@utils/db";
import ROLES from "@utils/roles";

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