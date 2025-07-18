import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';

const adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.admintoken;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const admin = await Admin.findById(decoded.userId).select("-password");
        if (!admin) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.admin = admin;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
export default adminAuth;