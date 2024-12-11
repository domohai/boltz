// middleware/roleMiddleware.js
import { ROLES } from "../utils/roles.js";

export const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = req.user; // User info is deserialized from session
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next(); // Proceed to the route if the user is authorized
  };
};
