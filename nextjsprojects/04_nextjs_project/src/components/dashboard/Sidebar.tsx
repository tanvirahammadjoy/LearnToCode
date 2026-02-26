import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6">
      <h2 className="text-xl mb-6">Dashboard</h2>

      <nav className="space-y-3">
        <Link href="/dashboard">Home</Link>
        <br />
        <Link href="/dashboard/settings">Settings</Link>
      </nav>
    </div>
  );
}
