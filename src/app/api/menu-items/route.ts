import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || "");
  const data = await req.json();
  const menuItemDoc = await MenuItem.create(data);
  return NextResponse.json(menuItemDoc);
}
