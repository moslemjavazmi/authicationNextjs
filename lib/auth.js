import bcrypt from "bcrypt";
import { randomBytes, createHash } from "crypto";
import cookie from "cookie";

// تنظیمات
const SALT_ROUNDS = 12;
const SESSION_SECRET = process.env.SESSION_SECRET;

// توابع هش
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// مدیریت سشن
export const createSession = (user, res) => {
  const sessionData = {
    userId: user._id,
    role: user.role,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
  };

  const sessionToken = createHash("sha256")
    .update(JSON.stringify(sessionData) + SESSION_SECRET)
    .digest("hex");

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60,
      path: "/"
    })
  );
};

export const destroySession = (res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/"
    })
  );
};
