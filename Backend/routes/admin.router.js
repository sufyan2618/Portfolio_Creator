import { AdminLogin, AdminLogout, Check_Admin_Auth } from "../controllers/admin.controller.js";
import adminAuth from "../middleware/adminAuth.middleware.js";
import express from "express";

const Adminrouter = express.Router();

// Route for admin login
Adminrouter.post("/login", AdminLogin);

Adminrouter.post("/logout", adminAuth, AdminLogout);

Adminrouter.get("/check-auth", adminAuth, Check_Admin_Auth);

export default Adminrouter;