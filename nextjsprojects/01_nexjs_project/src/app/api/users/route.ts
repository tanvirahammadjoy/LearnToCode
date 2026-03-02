// app/api/products/route.ts
import connectDB from "@/lib/db";
import { User as Users } from "@/models/Users";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const users = await Users.find();

  return NextResponse.json(users);
}
