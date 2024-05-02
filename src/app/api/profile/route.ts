import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { User } from "@/app/models/db";
import { UserInfo } from "@/app/models/db";

export async function PUT(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || "");
  const data = await req.json();
  console.log("++++++++++++++++++++++++++");
  console.log(data);
  const { _id, name, image, email, ...otherUserInfo } = data; // name is separated from other
  const myUserInfo = { ...otherUserInfo, email };

  await User.updateOne({ email }, { name, image });
  await UserInfo.findOneAndUpdate({ email }, myUserInfo, {
    upsert: true,
  });

  // if (_id) {
  //   console.log("ID YES1111111");
  //   await User.updateOne({ _id }, { name, image });
  //   console.log("ID YES22");
  //   console.log(myUserInfo);
  //   console.log(otherUserInfo);
  //   await UserInfo.findOneAndUpdate({ _id }, myUserInfo);
  //   console.log("ID YES333");
  // } else {
  //   console.log("ID NO");
  //   const session = await getServerSession(authOptions);
  //   const email = session?.user?.email;

  //   await User.updateOne({ email }, { name, image });
  //   await UserInfo.findOneAndUpdate({ email }, otherUserInfo, {
  //     upsert: true,
  //   }); // It will findOne then Update and if not found then create (in one go not in 3 )
  // }
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
  const userInfoData = await UserInfo.findOne({ email }).lean();
  return NextResponse.json({ ...userData, ...userInfoData }); /// To join both into one
}
