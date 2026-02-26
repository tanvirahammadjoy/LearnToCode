import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li>
            <Link href="/" className="hover:text-gray-300">
                my Next.js App
            </Link>
        </li>
        <li>
          <Link href="/auth/login" className="hover:text-gray-300">
            Login
          </Link>
        </li>
        <li>
          <Link href="/auth/register" className="hover:text-gray-300">
            register
          </Link>
        </li>
      </ul>
    </nav>
  );
}
