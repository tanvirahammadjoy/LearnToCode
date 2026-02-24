import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/db";
import Users from "@/models/User";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const users = await Users.find();

  return res.status(200).json(users);
}
