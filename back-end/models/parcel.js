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

export async function getParcelsForLeader(start_date, end_date) {
  try {
    const [parcels] = await pool.query(
      `SELECT 
        p.id,
        p.name,
        p.weight,
        p.cost,
        p.status,
        p.src_service_p,
        p.des_service_p,
        p.src_collection_p,
        p.des_collection_p,
        p.start_time,
        p.end_time
      FROM parcel p
      WHERE p.start_time BETWEEN ? AND ?`,
      [start_date, end_date]
    );
    return parcels;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getParcelsByRange(service_point_id, start_date, end_date) {
  try {
    const [parcels] = await pool.query(
      `SELECT 
        p.id,
        p.start_time,
        p.end_time,
        p.cost,
        p.status,
        p.src_service_p,
        p.des_service_p,
        p.src_collection_p,
        p.des_collection_p
      FROM parcel p
      WHERE ((p.src_service_p = ? AND p.start_time BETWEEN ? AND ?) OR (p.des_service_p = ? AND p.end_time BETWEEN ? AND ?))`,
      [service_point_id, start_date, end_date, service_point_id, start_date, end_date]
    );
    return parcels;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getParcelByTrackingCode(tracking_code) {
  try {
    const [parcel] = await pool.query(
      `SELECT 
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
      WHERE p.id = ?`,
      [tracking_code]
    );
    return parcel;
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

export async function getWaitingParcelsByServicePoint(service_point_id) {
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
      WHERE p.des_service_p = ? AND p.curr_point = 'des_service_p' AND p.moving_to = 'des_service_p' AND p.status = "Chờ trả hàng"
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

export async function confirmDeliveredParcels(parcel_ids, status) {
  try {
    const [res] = await pool.query(
      `UPDATE parcel SET status = ?, end_time = NOW() WHERE id IN (?)`,
      [status, parcel_ids]
    );
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getMonthlyParcelStats() {
  try {
    const [result] = await pool.query(`
      SELECT 
        DATE_FORMAT(start_time, '%b') as name,
        COUNT(*) as count,
        SUM(cost) as cost
      FROM parcel 
      WHERE YEAR(start_time) = YEAR(CURRENT_DATE())
      GROUP BY MONTH(start_time), DATE_FORMAT(start_time, '%b')
      ORDER BY MONTH(start_time)
    `);
    return result;
  } catch (error) {
    console.error('Error getting monthly stats:', error);
    throw error;
  }
}

export async function getParcelStatsByStatus(cp_id) {
  try {
    console.log("Model executing query with cp_id:", cp_id);
    const [result] = await pool.query(`
      SELECT 
        status,
        COUNT(*) as count,
        SUM(cost) as total_cost
      FROM parcel 
      WHERE (src_collection_p = ?) 
      GROUP BY status
    `, [cp_id]);

    return result;
  } catch (error) {
    console.error('Error getting status stats:', error);
    throw error;
  }
}

export async function getMonthlyParcelStatsByCP(collection_point_id) {
  try {
    const [result] = await pool.query(`
      SELECT 
        DATE_FORMAT(start_time, '%b') as name,
        SUM(CASE WHEN src_collection_p = ? THEN 1 ELSE 0 END) as src_count,
        SUM(CASE WHEN des_collection_p = ? THEN 1 ELSE 0 END) as des_count,
        SUM(CASE WHEN src_collection_p = ? THEN cost ELSE 0 END) as src_cost,
        SUM(CASE WHEN des_collection_p = ? THEN cost ELSE 0 END) as des_cost
      FROM parcel 
      WHERE YEAR(start_time) = YEAR(CURRENT_DATE())
        AND status = "Đã trả hàng"
        AND (src_collection_p = ? OR des_collection_p = ?)
      GROUP BY MONTH(start_time), DATE_FORMAT(start_time, '%b')
      ORDER BY MONTH(start_time)
    `, [collection_point_id, collection_point_id, collection_point_id, collection_point_id, collection_point_id, collection_point_id]);
    
    return result;
  } catch (error) {
    console.error('Error getting monthly stats:', error);
    throw error;
  }
}

export async function getParcelsForCollectionManager(collection_point_id, start_date, end_date) {
  try {
    const [parcels] = await pool.query(
      `SELECT 
        p.id,
        p.name,
        p.weight,
        p.cost,
        p.status,
        p.src_service_p,
        p.des_service_p,
        p.src_collection_p,
        p.des_collection_p,
        p.start_time,
        p.end_time
      FROM parcel p
      WHERE (p.des_collection_p = ? OR p.src_collection_p = ?)
      AND p.start_time BETWEEN ? AND ?`,
      [collection_point_id, collection_point_id, start_date, end_date]
    );
    return parcels;
  } catch (error) {
    console.error(error);
    return null;
  }
}