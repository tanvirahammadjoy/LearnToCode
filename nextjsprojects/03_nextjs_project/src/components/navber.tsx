import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <h1>Navbar</h1>
      <hr />
      <div>
        <nav>
          <ul>
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
