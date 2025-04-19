"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/api/auth/session");
      if (!res.ok) router.push("/login");
    };
    checkSession();
  }, []);

  return (
    <div>
      <h1>داشبورد کاربری</h1>
      <LogoutButton />
    </div>
  );
}
