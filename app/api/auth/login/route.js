import { mongooseConnect } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  await mongooseConnect();

  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return Response.json(
        { error: "ایمیل یا رمز عبور نادرست است" },
        { status: 401 }
      );
    }

    // ایجاد سشن
    const session = {
      userId: user._id,
      role: user.role,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    };

    return Response.json(
      { message: "ورود موفقیت آمیز", user: { id: user._id, role: user.role } },
      {
        headers: {
          "Set-Cookie": `session=${JSON.stringify(
            session
          )}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
        }
      }
    );
  } catch (error) {
    return Response.json({ error: "خطا در سرور" }, { status: 500 });
  }
}
