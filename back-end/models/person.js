"use server";
import pool from '@utils/db.js';

export async function getPersonByPhoneNumber(phone_number) {
  const [result] = await pool.query(
    'SELECT * FROM person WHERE phone_number = ?',
    [phone_number]
  );
  return result;
}

export async function addPerson(name, phone_number, city, district) {
  const [result] = await pool.query(
    'INSERT INTO person (name, phone_number, city, district) VALUES (?, ?, ?, ?)',
    [name, phone_number, city, district]
  );
  return {
    id: result.insertId,
    name,
    phone_number,
    city,
    district,
  };
}
