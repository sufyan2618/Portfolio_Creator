import bcrypt from "bcryptjs";
import generateToken from "../lib/token.js";
import Admin from "../models/admin.model.js";

export const AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const isValidPassword = await bcrypt.compare(password, admin.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const admintoken = generateToken(admin._id);
        res.cookie("admintoken", admintoken ,{
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
        });
        res.status(200).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
        });
    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({ message: `Error logging in admin: ${error.message}` });
    }
}

export const AdminLogout = async (req, res) => {
    try {
        res.clearCookie("admintoken");
        res.status(200).json({ message: "Admin logged out successfully" });
    } catch (error) {
        console.error("Admin logout error:", error);
        res.status(500).json({ message: `Error logging out admin: ${error.message}` });
    }
}

export const Check_Admin_Auth = async (req, res) => {
    try {
        res.status(200).json(req.admin);
    } catch (error) {
        console.error("Check_Admin_Auth error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}