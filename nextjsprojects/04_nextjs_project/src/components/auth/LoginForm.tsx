"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res?.error) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-80">
      <h2 className="text-2xl font-bold">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="w-full bg-black text-white p-2">Login</button>
    </form>
  );
}
