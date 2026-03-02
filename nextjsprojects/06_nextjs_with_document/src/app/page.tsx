"use client";
import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/me");
      const data = await res.json();
      console.log(data);
      setData(data);
    };

    fetchUser();
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-6xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p className="mt-6 text-2xl text-gray-700 dark:text-gray-300">
          Get started by editing{" "}
          <code className="rounded-md bg-gray-100 p-3 font-mono text-sm">
            app/page.tsx
          </code>
        </p>
        <p>{ data.name || "No user data available"}</p>
        <p>{ data.email || "No user data available"}</p>
      </main>
    </div>
  );
}
