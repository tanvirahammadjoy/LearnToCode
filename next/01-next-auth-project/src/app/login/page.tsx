"use client";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="flex justify-center text-black mt-10">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 text-black rounded">
        <h2 className="text-xl mb-4">Login</h2>

        <input
          placeholder="Email"
          className="border p-2 block mb-2"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 block mb-2"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="bg-green-500 text-white p-2">
          Login
        </button>
        <p>Don&apos;t have an account? <a href="/register" className="text-blue-500">Register</a></p>
      </form>
    </div>
  );
}