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
    const [parcels] = await pool.query(`
      SELECT 
        p.*, 
        s.name AS sender_name,
        s.phone_number AS sender_phone,
        s.city AS sender_city,
        s.district AS sender_district, 
        r.name AS receiver_name, 
        r.phone_number AS receiver_phone,
        r.city AS receiver_city,
        r.district AS receiver_district,
        sp.name AS src_service_point_name,
        sp.address AS src_service_point_address,
        dsp.name AS des_service_point_name,
        dsp.address AS des_service_point_address,
        scp.name AS src_collection_point_name,
        scp.address AS src_collection_point_address
      FROM parcel p
      LEFT JOIN person s ON p.sender_id = s.id
      LEFT JOIN person r ON p.receiver_id = r.id
      LEFT JOIN service_point dsp ON p.des_service_p = dsp.id
      LEFT JOIN service_point sp ON p.src_service_p = sp.id
      LEFT JOIN collection_point scp ON p.src_collection_p = scp.id
      WHERE p.src_service_p = ? AND p.curr_point = 'src_service_p' AND p.moving_to IS NULL AND p.status = "Chờ xử lý"
      `, [service_point_id]
    );
    return parcels;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getParcelsByCollectionPoint(collection_point_id) {
  try {
    const [parcels] = await pool.query(`
      SELECT 
        p.*, 
        s.name AS sender_name,
        s.phone_number AS sender_phone,
        s.city AS sender_city,
        s.district AS sender_district, 
        r.name AS receiver_name, 
        r.phone_number AS receiver_phone,
        r.city AS receiver_city,
        r.district AS receiver_district,
        sp.name AS src_service_point_name,
        sp.address AS src_service_point_address,
        dsp.name AS des_service_point_name,
        dsp.address AS des_service_point_address,
        scp.name AS src_collection_point_name,
        scp.address AS src_collection_point_address
      FROM parcel p
      LEFT JOIN person s ON p.sender_id = s.id
      LEFT JOIN person r ON p.receiver_id = r.id
      LEFT JOIN service_point dsp ON p.des_service_p = dsp.id
      LEFT JOIN service_point sp ON p.src_service_p = sp.id
      LEFT JOIN collection_point scp ON p.src_collection_p = scp.id
      WHERE ((p.src_collection_p = ? AND p.curr_point = 'src_service_p' AND p.moving_to = 'src_collection_p') OR (p.des_collection_p = ? AND p.curr_point = 'src_collection_p' AND p.moving_to = 'des_collection_p')) AND p.status = "Đang vận chuyển"
      `, [collection_point_id, collection_point_id]
    );
    return parcels;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTransferParcelsByCollectionPoint(collection_point_id) {
  try {
    const [parcels] = await pool.query(`
      SELECT 
        p.*, 
        s.name AS sender_name,
        s.phone_number AS sender_phone,
        s.city AS sender_city,
        s.district AS sender_district, 
        r.name AS receiver_name, 
        r.phone_number AS receiver_phone,
        r.city AS receiver_city,
        r.district AS receiver_district,
        sp.name AS src_service_point_name,
        sp.address AS src_service_point_address,
        dsp.name AS des_service_point_name,
        dsp.address AS des_service_point_address,
        scp.name AS src_collection_point_name,
        scp.address AS src_collection_point_address
      FROM parcel p
      LEFT JOIN person s ON p.sender_id = s.id
      LEFT JOIN person r ON p.receiver_id = r.id
      LEFT JOIN service_point dsp ON p.des_service_p = dsp.id
      LEFT JOIN service_point sp ON p.src_service_p = sp.id
      LEFT JOIN collection_point scp ON p.src_collection_p = scp.id
      WHERE ((p.src_collection_p = ? AND p.curr_point = 'src_collection_p' AND p.moving_to = 'src_collection_p') OR (p.des_collection_p = ? AND p.curr_point = 'des_collection_p' AND p.moving_to = 'des_collection_p')) AND p.status = "Đang vận chuyển"
      `, [collection_point_id, collection_point_id]
    );
    return parcels;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getConfirmParcelsByServicePoint(service_point_id) {
  try {
    const [parcels] = await pool.query(`
      SELECT
        p.*,
        s.name AS sender_name,
        s.phone_number AS sender_phone,
        s.city AS sender_city,
        s.district AS sender_district,
        r.name AS receiver_name,
        r.phone_number AS receiver_phone,
        r.city AS receiver_city,
        r.district AS receiver_district,
        sp.name AS src_service_point_name,
        sp.address AS src_service_point_address,
        dsp.name AS des_service_point_name,
        dsp.address AS des_service_point_address,
        scp.name AS src_collection_point_name,
        scp.address AS src_collection_point_address
      FROM parcel p
      LEFT JOIN person s ON p.sender_id = s.id
      LEFT JOIN person r ON p.receiver_id = r.id
      LEFT JOIN service_point dsp ON p.des_service_p = dsp.id
      LEFT JOIN service_point sp ON p.src_service_p = sp.id
      LEFT JOIN collection_point scp ON p.src_collection_p = scp.id
      WHERE p.des_service_p = ? AND p.curr_point = 'des_collection_p' AND p.moving_to = 'des_service_p' AND p.status = "Đang vận chuyển"
      `, [service_point_id]
    );
    return parcels;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function cancelParcels(parcel_ids, status) {
  try {
    const [res] = await pool.query(
      `UPDATE parcel SET status = ? WHERE id IN (?)`,
      [status, parcel_ids]
    );
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function transferToSrcCollectionPoint(parcel_ids, status) {
  try {
    const [res] = await pool.query(
      `UPDATE parcel SET moving_to = "src_collection_p", status = ? WHERE id IN (?)`,
      [status, parcel_ids]
    );
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function transferToDesCollectionPoint(parcel_ids) {
  try {
    const [res] = await pool.query(
      `UPDATE parcel SET moving_to = "des_collection_p" WHERE id IN (?)`,
      [parcel_ids]
    );
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function transferToDesServicePoint(parcel_ids) {
  try {
    const [res] = await pool.query(
      `UPDATE parcel SET moving_to = "des_service_p" WHERE id IN (?)`,
      [parcel_ids]
    );
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function confirmParcelsForSrcCollectionPoint(parcel_ids) {
  try {
    const [res] = await pool.query(
      `UPDATE parcel SET curr_point = "src_collection_p" WHERE id IN (?)`,
      [parcel_ids]
    );
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function confirmParcelForDesCollectionPoint(parcel_ids) {
  try {
    const [res] = await pool.query(
      `UPDATE parcel SET curr_point = "des_collection_p" WHERE id IN (?)`,
      [parcel_ids]
    );
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function confirmParcelForDesServicePoint(parcel_ids, status) {
  try {
    const [res] = await pool.query(
      `UPDATE parcel SET curr_point = "des_service_p", status = ? WHERE id IN (?)`,
      [status, parcel_ids]
    );
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}