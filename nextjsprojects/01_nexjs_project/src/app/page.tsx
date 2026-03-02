"use client";

import Nab from "../components/Nab";

import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
      <div>
        <h1>Users</h1>

        {users.map((user: any) => (
          <div key={user._id}>
            <h2>name: {user.name}</h2>
            <p>email: { user.email}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
