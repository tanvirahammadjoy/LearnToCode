import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full rounded-lg bg-gray-200 text-black p-4 shadow-lg">
      <h1 className="text-xl font-bold">My App</h1>
      <hr />
      <div className="mt-4">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/settings">Settings</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
