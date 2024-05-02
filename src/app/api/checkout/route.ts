import mongoose from "mongoose";
import { getServerSession } from "next-auth";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { Order } from "@/app/models/db";
import { MenuItem } from "@/app/models/db";
// import Stripe from "stripe";

export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL || "");
  const { cartProducts, address } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });
  //    We are finding the price by id and not getting directly what user has sent as it can be modified
  const stripeLineItems: any[] = [];
  for (const cartProduct of cartProducts) {
    const productInfo = await MenuItem.findById(cartProduct._id);
    let productPrice = productInfo.basePrice;
    if (cartProduct?.size) {
      const size = productInfo.sizes.find(
        (size: any) => size._id.toString() === cartProduct.size._id.toString() // Id may be as objects so convert it to string (not needed maybe)
      );
      productPrice += size.price;
    }
    if (cartProduct.extras?.length > 0) {
      for (const cartProdutExtraThing of cartProduct.extras) {
        const extraThingInfo = productInfo.extraIngredientPrices.find(
          (extra: any) =>
            extra._id.toString() === cartProdutExtraThing._id.toString()
        );
        productPrice += extraThingInfo.price;
      }
    }

    const productName = cartProduct.name;

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "inr",
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100, // in cent convert into rupee or paisa
      },
    });
  }

  // const stripeAddress: Stripe.AddressParam = {
  //   line1: orderDoc.streetAddress,
  //   line2: "ok",
  //   city: orderDoc.city,
  //   country: orderDoc.country,
  //   postal_code: orderDoc.postalCode,
  //   state: "Gujarat",
  // };

  // const stripeCustomer: Stripe.Customer = await stripe.customers.create({
  //   name: "test",
  //   description: "testtest",
  //   email: orderDoc.userEmail,
  //   phone: orderDoc.phone,
  //   address: stripeAddress,
  // });

  // console.log(stripeCustomer);

  // USE 4000003560000008 THIS CARD DETAIL TO CHECK
  // https://docs.stripe.com/api/checkout/sessions/create  ---> From official document

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment", // As it is one time payment
    // customer: stripeCustomer.id,
    customer_email: userEmail, // Email of the customer
    success_url:
      process.env.NEXTAUTH_URL +
      "orders/" +
      orderDoc._id.toString() +
      "?clear-cart=1", // This is the url we want to redirect our customer (after payment success)
    cancel_url: process.env.NEXTAUTH_URL + "cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() }, // Our own data to further information
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery1 fee",
          type: "fixed_amount",
          fixed_amount: { amount: 2000, currency: "inr" }, // In USD cent and not doller (1doller = 100 cent) --> CHANGE INTO RUPEE
        },
      },
    ],
  });

  // console.log(stripeSession);
  // console.log(stripeSession.url);

  return NextResponse.json(stripeSession.url);
}
