import jwt from "jsonwebtoken";
import User from "../models/User";

export const authenticate = async (req, res, next) => {
  const token = req.cookies.session;

  if (!token) {
    return res.status(401).json({ error: "دسترسی غیرمجاز" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "کاربر یافت نشد" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "سشن نامعتبر" });
  }
};

export const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "دسترسی ممنوع" });
    }
    next();
  };
};
