import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full rounded-lg bg-white p-10 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Welcome to the Home Page
        </h1>
        <p className="text-gray-700">
          This is the home page of our Next.js application. Use the navigation
          bar to explore different pages.
        </p>
      </main>
    </div>
  );
}
