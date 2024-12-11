import express from 'express';
import authRoutes from './auth.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import { ROLES } from '../utils/roles.js';

const router = express.Router();

// api/auth/login
// api/auth/logout
router.use('/auth', authRoutes);

// api/leader/*
router.use('/leader', roleMiddleware([ROLES.LEADER]), (req, res) => {
  res.json({ message: 'Welcome, leader' });
});

// api/collection_manager/*
router.use('/collection_manager', roleMiddleware([ROLES.COLLECTION_MANAGER]), (req, res) => {
  res.json({ message: 'Welcome, collection_manager' });
});

// api/service_manager/*
router.use('/service_manager', roleMiddleware([ROLES.SERVICE_MANAGER]), (req, res) => {
  res.json({ message: 'Welcome, service_manager' });
});

// api/collection_staff/*
router.use('/collection_staff', roleMiddleware([ROLES.COLLECTION_STAFF]), (req, res) => {
  res.json({ message: 'Welcome, collection_staff' });
});

// api/service_staff/*
router.use('/service_staff', roleMiddleware([ROLES.SERVICE_STAFF]), (req, res) => {
  res.json({ message: 'Welcome, service_staff' });
});

export default router; 