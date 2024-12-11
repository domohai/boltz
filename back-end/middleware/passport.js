import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import pool from "../utils/db.js";

// Configure LocalStrategy
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [email]);
        const user = rows[0];
        if (!user) return done(null, false, { message: "User not found" });

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) return done(null, false, { message: "Invalid password" });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser(async (user, done) => {
  done(null, user);
});

export default passport;
