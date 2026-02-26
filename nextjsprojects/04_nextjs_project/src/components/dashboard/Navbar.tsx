"use client";

import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <div className="flex justify-end p-4 border-b">
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="bg-red-500 text-white px-4 py-1"
      >
        Logout
      </button>
    </div>
  );
}
