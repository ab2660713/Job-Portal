import jwt from "jsonwebtoken";
import User from "../models/authModel.js";

const adminProtect = async (req, res, next) => {
    try {
      const authHeader =
        req.headers.authorization || req.headers.Authorization;
  
      if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "No token found" });
      }
  
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const user = await User.findById(decoded.id).select("-password");
  
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
  
      if (user.role !== "admin") {
        return res
          .status(403)
          .json({ message: "Unauthorised Access : Admin Only" });
      }
  
      req.user = user;
      next();
    } catch (error) {
      console.error("ADMIN AUTH ERROR:", error.message);
      return res.status(401).json({ message: "Admin authentication failed" });
    }
  };
  

export default adminProtect;
