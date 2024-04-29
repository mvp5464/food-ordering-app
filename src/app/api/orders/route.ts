import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions, isAdmin } from "../auth/[...nextauth]/route";
// import { UserInfo } from "@/app/models/UserInfo";
import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/app/models/Order";

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || "");

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  let admin = await isAdmin();

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (_id) {
    const data = await Order.findById(_id);
    return NextResponse.json(data);
  }

  // // can check if you are a admin or not by sending param (maybe not if not secure)
  // if (userEmail) {
  //   const userInfo = await UserInfo.findOne({ email: userEmail });
  //   if (userInfo) {
  //     isAdmin = userInfo.isAdmin;
  //   }
  // }

  if (admin) {
    return NextResponse.json(await Order.find());
  }

  if (userEmail) {
    return NextResponse.json(await Order.find({ userEmail }));
  }
}
