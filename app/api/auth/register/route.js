import { mongooseConnect } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  await mongooseConnect();

  try {
    const { email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        { error: "این ایمیل قبلا ثبت شده است" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      password: hashedPassword,
      role: "USER"
    });

    await newUser.save();

    return Response.json(
      { message: "ثبت نام موفقیت آمیز بود" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ error: "خطا در سرور" }, { status: 500 });
  }
}
