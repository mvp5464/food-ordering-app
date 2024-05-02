import { User } from "@/app/models/db";
import { UserInfo } from "@/app/models/db";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/authOptions";

interface UserType {
  _id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  name: string;
}

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || "");
  //   const url = new URL(req.url);
  const _id = new URL(req.url).searchParams.get("_id");
  if (_id) {
    const userData: UserType | null = await User.findById({ _id }).lean();
    // const email = userData?.email;
    const userInfoData = await UserInfo.findOne({
      email: userData?.email,
    }).lean();
    return NextResponse.json({ ...userData, ...userInfoData }); /// To join both into one
  } else if (await isAdmin()) {
    const users = await User.find();
    return NextResponse.json(users);
  } else {
    const users = await User.find();
    return NextResponse.json(users);
  }
}

// export async function GET(req: NextRequest) {
//   mongoose.connect(process.env.MONGO_URL || "");
//   if (await isAdmin()) {
//     const users = await User.find();
//     return NextResponse.json(users);
//   } else {
//     return NextResponse.json([]);
//   }
// }
