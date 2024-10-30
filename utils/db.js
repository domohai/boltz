import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import {leaders} from '@utils/leader_data.js';

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Maximum connections in the pool
  queueLimit: 0       // Unlimited queued requests when all connections are busy
});

const addLeaders = async () => {
  try {
    // check if leader already exists
    const [result] = await pool.query(
      `SELECT * FROM user WHERE role = ?`, ['leader']
    );
    if (result.length) {
      return console.log("Leaders already exist!");
    }
    for (const leader of leaders) {
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

// addLeaders();

export default pool;