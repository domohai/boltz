"use server"

import { createConnection } from "@utils/db.js";

export const registerManager = async (req, res) => {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [req.body.email]
    );

    if (rows.length > 0) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      await connection.execute(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [req.body.email, req.body.password]
      );
      res.status(201).json({ message: 'User created successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const login = async (req, res) => {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [req.body.email, req.body.password]
    );

    if (rows.length === 0) {
      res.status(401).json({ message: 'Invalid email or password' });
    } else {
      res.status(200).json({ message: 'Login successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}