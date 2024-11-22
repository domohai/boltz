"use server";
import pool from '@utils/db.js';

export async function addParcel(parcelInfo) {
  try {
    const { name, weight, value, type, notes, src_service_p, src_collection_p, des_collection_p, des_service_p, curr_point, status, cost, sender_id, receiver_id } = parcelInfo;
    const [res] = await pool.query(
      `INSERT INTO parcel 
      (name, weight, value, type, notes, src_service_p, src_collection_p, des_collection_p, des_service_p, curr_point, status, cost, sender_id, receiver_id, start_time) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [name, weight, value, type, notes, src_service_p, src_collection_p, des_collection_p, des_service_p, curr_point, status, cost, sender_id, receiver_id]
    );
    return res;    
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getParcelsByServicePoint(service_point_id) {
  try {
    const [parcels] = await pool.query(
      `SELECT * FROM parcel WHERE src_service_p = ? AND curr_point = ? AND moving_to IS NULL`,
      [service_point_id, 'src_service_p']
    );
    return parcels;
  } catch (error) {
    console.error(error);
    return null;
  }
}