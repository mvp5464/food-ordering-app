import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import { UserInfo } from "@/app/models/UserInfo";

export async function PUT(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || "");
  const data = await req.json();
  const { name, email, ...otherUserInfo } = data; // name is separated from other
  console.log({ otherUserInfo });
  console.log({ data });
  console.log({ ...otherUserInfo, email });
  const myUserInfo = { ...otherUserInfo, email };
  console.log(myUserInfo);
  const session = await getServerSession(authOptions);
  console.log({ session });
  console.log(data.name);
  // const email = session?.user?.email || ""; //Not showing options

  console.log("Inside");
  const result = await User.updateOne({ email }, { name });
  console.log({ result });
  // const update1 = await UserInfo.findOne({ email });
  // console.log(update1);
  // if (!update1) {
  //   const result2 = await UserInfo.create(myUserInfo);
  //   console.log(result2);
  // } else {
  //   const update2 = await UserInfo.updateOne({ email }, myUserInfo);
  //   console.log(update2);
  // }
  const update3 = await UserInfo.findOneAndUpdate({ email }, myUserInfo, {
    upsert: true,
  }); // It will findOne then Update and if not found then create
  console.log(update3);
  return NextResponse.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL || "");
  const session = await getServerSession(authOptions);
  const email = session?.user?.email; //Not showing options
  if (!email) {
    return NextResponse.json({}); //if write then it will show an error but no error for empty object
  }
  const userData = await User.findOne({ email }).lean();
  console.log(userData);
  const userInfoData = await UserInfo.findOne({ email }).lean();
  console.log(userInfoData);
  console.log({ ...userData, ...userInfoData });
  return NextResponse.json({ ...userData, ...userInfoData }); /// To join both into one
}
