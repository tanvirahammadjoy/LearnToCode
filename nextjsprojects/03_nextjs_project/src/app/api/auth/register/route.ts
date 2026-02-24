import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await connectDB();
  if (request.method === "POST") {
    const { name, email, password } = await request.json();

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { message: "User already exists" },
          { status: 400 },
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        name,
        email,
        password: hashedPassword,
      });

      return NextResponse.json(
        { message: "User registered successfully" },
        { status: 201 },
      );
    } catch (error) {
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  } else {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }
}
