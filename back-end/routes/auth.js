import express from 'express';
import passport from '../middleware/passport.js';

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
  const role = req.user.role;
  // Role-based redirection logic
  let redirectPath = '/unauthorized'; // Default unauthorized path
  if (role === 'leader') {
    redirectPath = '/leader';
  } else if (role === 'collection_manager') {
    redirectPath = '/collection_manager';
  } else if (role === 'service_manager') {
    redirectPath = '/service_manager';
  } else if (role === 'collection_staff') {
    redirectPath = '/collection_staff';
  } else if (role === 'service_staff') {
    redirectPath = '/service_staff';
  }
  if (redirectPath === '/unauthorized') {
    return res.status(401).json({ message: 'Unauthorized', susscess: false });
  }
  res.json({susscess: true, redirectPath});
});

router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.json({ message: 'Logout successful' });
  });
});

export default router;