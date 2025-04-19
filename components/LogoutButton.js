"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("خطا در خروج:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      خروج
    </button>
  );
}
