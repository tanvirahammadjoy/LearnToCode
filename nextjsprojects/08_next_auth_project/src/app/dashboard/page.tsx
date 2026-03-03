import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold mb-4">Dashboard</h2>
      <p className="mb-4">Welcome to your dashboard!</p>
      <Link href="/login" className="text-blue-500 hover:underline">
        Logout
      </Link>
    </div>
  );
}
