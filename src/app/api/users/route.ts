import { User } from "@/app/models/User";
import { UserInfo } from "@/app/models/UserInfo";
import { Console } from "console";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

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
    console.log(userData);
    console.log(userInfoData);
    console.log({ ...userData, ...userInfoData });
    return NextResponse.json({ ...userData, ...userInfoData }); /// To join both into one
  } else {
    console.log("ID NO");
    const users = await User.find();
    return NextResponse.json(users);
  }
}
