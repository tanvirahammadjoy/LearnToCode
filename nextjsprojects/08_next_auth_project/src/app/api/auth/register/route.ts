import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const { fullname, username, email, password } = await request.json();
  console.log("Received registration data:", { fullname, username, email, password });
  // Here you would typically perform validation and save the user to a database
  await prisma.user.create({ data: { fullname, username, email, password } });
  return NextResponse.json({
    data: { fullname, username, email, password },
    message: "User registered successfully",
  });
}
