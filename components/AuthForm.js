import { useState } from "react";
import { useRouter } from "next/router";

export default function AuthForm({ type }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/auth/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    if (type === "signup") {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ایمیل"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="رمز عبور"
        required
      />
      {error && <div className="error">{error}</div>}
      <button type="submit">{type === "login" ? "ورود" : "ثبت نام"}</button>
    </form>
  );
}
