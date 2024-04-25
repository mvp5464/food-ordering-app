import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // USE DEFAULT AVATAR FOR ALL -- ELSE NEED AWS-S3 FOR IT
  const data = await req.formData();
  console.log(data);
  if (data.get("file")) {
    console.log("we have file", data.get("file"));
  }
  return NextResponse.json(true);
}
