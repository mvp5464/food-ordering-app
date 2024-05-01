import { User } from "@/app/models/User";
import { RegisterType, registerSchema } from "@/utils/zod";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: RegisterType = await req.json();
    console.log(body);
    console.log(process.env.MONGO_URL);
    // Check the database
    if (!process.env.MONGO_URL) {
      console.log("Server Down(no url)");
      return;
    }
    // zod validation for signup
    const { success } = registerSchema.safeParse(body);
    console.log(success);
    if (!success) {
      return NextResponse.json(
        { message: "Incorrect Inputs" },
        { status: 401 }
      );
    }
    // Check if user already exists
    mongoose.connect(process.env.MONGO_URL);
    const user1: any = await User.findOne({ email: body.email });
    console.log(user1);
    if (user1) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // encrypt the password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    console.log("hashedPassword", hashedPassword);

    // Create a user
    mongoose.connect(process.env.MONGO_URL);
    const createdUser: any = await User.create({
      email: body.email,
      password: hashedPassword,
    });
    return NextResponse.json({ message: createdUser }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 400 });
  }
}
