import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import {leaders} from '@utils/leader_data.js';
import {cp_managers} from '@utils/cp_accounts.js';
import {sp_managers} from '@utils/sp_manager.js';
import {service_staff} from '@utils/ss_accounts.js';
import {collection_staff} from '@utils/cs_accounts.js';

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Maximum connections in the pool
  queueLimit: 0       // Unlimited queued requests when all connections are busy
});

const addAccounts = async (list) => {
  try {
    for (const leader of list) {
      // check if the user already exists
      const [rows] = await pool.query(`SELECT * FROM user WHERE email = ?`, [leader.email]);
      if (rows.length > 0) {
        console.log(`User with email ${leader.email} already exists`);
        continue;
      }
      const hashedPassword = await bcrypt.hash(leader.password, 10);
      const [result] = await pool.query(
        `INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)`,
        [leader.name, leader.email, hashedPassword, leader.role]
      );
      console.log(result);
    }
  } catch (error) {
    console.error(error);
  }
}

const addSS = async (list) => {
  try {
    for (const staff of list) {
      // check if the user already exists
      const [rows] = await pool.query(`SELECT * FROM user WHERE email = ?`, [staff.email]);
      if (rows.length > 0) {
        console.log(`User with email ${staff.email} already exists`);
        continue;
      }
      const hashedPassword = await bcrypt.hash(staff.password, 10);
      const [result] = await pool.query(
        `INSERT INTO user (name, email, password, role, service_point_id) VALUES (?, ?, ?, ?, ?)`,
        [staff.name, staff.email, hashedPassword, staff.role, staff.service_point_id]
      );
      console.log(result);
    }
  } catch (error) {
    console.error(error);
  }
}

const addCS = async (list) => {
  try {
    for (const staff of list) {
      // check if the user already exists
      const [rows] = await pool.query(`SELECT * FROM user WHERE email = ?`, [staff.email]);
      if (rows.length > 0) {
        console.log(`User with email ${staff.email} already exists`);
        continue;
      }
      const hashedPassword = await bcrypt.hash(staff.password, 10);
      const [result] = await pool.query(
        `INSERT INTO user (name, email, password, role, collection_point_id) VALUES (?, ?, ?, ?, ?)`,
        [staff.name, staff.email, hashedPassword, staff.role, staff.collection_point_id]
      );
      console.log(result);
    }
  } catch (error) {
    console.error(error);
  }
}

// addAccounts(leaders);
// addAccounts(cp_managers);
// addAccounts(sp_managers);
// addSS(service_staff);
// addCS(collection_staff);

export default pool;