import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || "");
  const data = await req.json();
  if (await isAdmin()) {
    const menuItemDoc = await MenuItem.create(data);
    return NextResponse.json(menuItemDoc);
  } else {
    return NextResponse.json({});
  }
}

export async function PUT(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || "");
  if (await isAdmin()) {
    const { _id, ...data } = await req.json();
    await MenuItem.findByIdAndUpdate(_id, data);
    return NextResponse.json(true);
  }
  return NextResponse.json(false);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL || "");
  const allItems = await MenuItem.find();
  return NextResponse.json(allItems);
}

export async function DELETE(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || "");
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (await isAdmin()) {
    await MenuItem.findByIdAndDelete({ _id });
    return NextResponse.json(true);
  }
  return NextResponse.json(false);
}
