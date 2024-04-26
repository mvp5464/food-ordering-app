import { Category } from "@/app/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  const categoryDoc = await Category.create({ name });
  return NextResponse.json(categoryDoc);
}

export async function GET(req: NextRequest) {
  return NextResponse.json(await Category.find());
}

export async function PUT(req: NextRequest) {
  const { _id, name } = await req.json();
  const res = await Category.updateOne({ _id }, { name });
  return NextResponse.json(res);
}
