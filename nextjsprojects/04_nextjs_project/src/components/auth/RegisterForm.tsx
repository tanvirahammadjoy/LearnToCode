"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/auth/login");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-80">
      <h2 className="text-2xl font-bold">Register</h2>

      <input
        placeholder="Name"
        className="w-full border p-2"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        className="w-full border p-2"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button className="w-full bg-black text-white p-2">Register</button>
      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/auth/login" className="text-blue-500">
          Login
        </a>
      </p>
    </form>
  );
}
