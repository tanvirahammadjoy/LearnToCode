"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl mb-6">Welcome to Dashboard 🔥</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2"
      >
        Logout
      </button>
    </div>
  );
}
