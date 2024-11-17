"use server";
import pool from '@utils/db.js';

export async function getPersonByPhoneNumber(phone_number) {
  const [rows] = await pool.query(
    `SELECT * FROM person WHERE phone_number = ?;`,
    [phone_number]
  );
  return rows;
}
