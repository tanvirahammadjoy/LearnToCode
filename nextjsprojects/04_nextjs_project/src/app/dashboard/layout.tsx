import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
//   const session = await getServerSession(authOptions);

//   if (!session) redirect("/auth/login");

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
