import { User } from "@/app/models/user";
import { registerSchema } from "@/utils/zod";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  console.log(process.env.MONGO_URL);
  if (!process.env.MONGO_URL) {
    console.log("no url");
    return;
  }
  const { success } = registerSchema.safeParse(body);
  console.log(success);
  if (!success) {
    return NextResponse.json({ message: "Incorrect Inputs" }, { status: 401 });
  }
  mongoose.connect(process.env.MONGO_URL);
  const createdUser: any = await User.create(body);
  //   return Response.json({ msg: "ok" });
  //   return Response.json("ok");
  return NextResponse.json(createdUser);
}
