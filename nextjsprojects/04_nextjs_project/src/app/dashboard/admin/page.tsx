export default function Admin() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full rounded-lg bg-white p-10 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Welcome to the Admin Dashboard
        </h1>
        <p className="text-gray-700">
          This is the admin dashboard of our Next.js application. Only admin
          users can access this page.
        </p>
      </main>
    </div>
  );
}
