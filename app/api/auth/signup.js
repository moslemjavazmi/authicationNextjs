import dbConnect from "../../../lib/db";
import User from "../../../models/User";
import { hashPassword } from "../../../lib/auth";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "متد غیرمجاز" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "لطفا تمام فیلدها را پر کنید" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "این ایمیل قبلا ثبت شده است" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      email,
      password: hashedPassword
    });

    createSession(user, res);

    res.status(201).json({
      message: "ثبت نام موفقیت آمیز بود",
      user: { id: user._id, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: "خطای سرور" });
  }
}
