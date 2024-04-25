import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/user";

export async function PUT(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || "");
  const data = await req.json();
  const session = await getServerSession(authOptions);
  console.log({ session });
  console.log(data.name);
  const email = session.user.email; //Not showing options

  console.log("Inside");
  const result = await User.updateOne({ email }, data);
  console.log({ result });
  return NextResponse.json(true);
}
