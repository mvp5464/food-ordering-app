import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || "");
  const data = await req.json();
  const menuItemDoc = await MenuItem.create(data);
  return NextResponse.json(menuItemDoc);
}

export async function PUT(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || "");
  const { _id, ...data } = await req.json();
  await MenuItem.findByIdAndUpdate(_id, data);
  return NextResponse.json(true);
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
  await MenuItem.findByIdAndDelete({ _id });
  return NextResponse.json(true);
}
