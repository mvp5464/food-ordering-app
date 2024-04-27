import { Category } from "@/app/models/Category";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || ""); // This is not needed
  const { name } = await req.json();
  const categoryDoc = await Category.create({ name });
  return NextResponse.json(categoryDoc);
}

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || "");
  return NextResponse.json(await Category.find());
}

export async function PUT(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || "");
  const { _id, name } = await req.json();
  const res = await Category.updateOne({ _id }, { name });
  return NextResponse.json(res);
}

export async function DELETE(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || "");
  const url = new URL(req.url);
  // console.log(req.url);
  // console.log(url);
  // console.log(url.searchParams);
  // console.log(url.searchParams.get("_id"));
  const _id = url.searchParams.get("_id");
  await Category.findByIdAndDelete({ _id });
  return NextResponse.json(true);
}
