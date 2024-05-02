import { Order } from "@/app/models/db";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    console.error("stripe error");
    return NextResponse.json(e, { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === "paid";
    if (isPaid) {
      await Order.updateOne({ _id: orderId }, { paid: true });
    }
  }
  return NextResponse.json("ok", { status: 200 });
}
