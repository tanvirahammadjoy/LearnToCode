import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase(); // connect mongoose

    // Get first user (for testing)
    const user = await User.findOne().lean(); // lean() returns plain JS object

    if (!user) {
      return NextResponse.json({ message: "No user found" }, { status: 404 });
    }

    delete user.password; // remove password

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
