import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">
            <a className="hover:text-gray-300">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/dashboard">
            <a className="hover:text-gray-300">Dashboard</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
