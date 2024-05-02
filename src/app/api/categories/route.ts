import { Category } from "@/app/models/db";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/authOptions";

export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || ""); // This is not needed
  const { name } = await req.json();
  if (await isAdmin()) {
    const categoryDoc = await Category.create({ name });
    return NextResponse.json(categoryDoc);
  } else {
    return NextResponse.json(false);
  }
}

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || "");
  return NextResponse.json(await Category.find());
}

export async function PUT(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || "");
  const { _id, name } = await req.json();
  if (await isAdmin()) {
    const res = await Category.updateOne({ _id }, { name });
    return NextResponse.json(res);
  } else {
    return NextResponse.json(false);
  }
}

export async function DELETE(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || "");
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (await isAdmin()) {
    await Category.findByIdAndDelete({ _id });
    return NextResponse.json(true);
  } else {
    return NextResponse.json(false);
  }
}
