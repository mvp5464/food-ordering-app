"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import TrashIcon from "@/components/Icons/TrashIcon";
import useProfile from "@/components/UseProfile";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeader from "@/components/layout/SectionHeader";
import CartProduct from "@/components/menu/CartProduct";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
  //@ts-ignore
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("payment failed ");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  if (cartProducts?.length > 0) {
    for (const p of cartProducts) {
      subtotal += cartProductPrice(p);
    }
  }

  function handleAddressChange(propName: any, value: any) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  async function proceedToCheckout(e: any) {
    e.preventDefault();
    //get address and shopping cart products
    const promise = new Promise<void>((res, rej) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          res();
          const link = await response.json(); // get what is written from the backend after payment
          window.location = link; // redirect user to stripe payment page //==> CHANGE IT TO REDIRECT LINK SO CAN BE USED BY PHONE
          // redirect(link);
        } else {
          rej();
        }
      });
    });

    await toast.promise(promise, {
      loading: "Preparing your order...",
      success: "Redirecting to payment...",
      error: "Something went wrong... Please try again later",
    });
  }

  if (cartProducts?.length === 0) {
    return (
      <section className=" mt-8 text-center">
        <SectionHeader mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty </p>
      </section>
    );
  }

  return (
    <section className=" mt-8">
      <h1>Checkout</h1>
      <div className=" text-center">
        <SectionHeader mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product: any, index: number) => (
              <CartProduct
                product={product}
                onRemove={() => removeCartProduct(index)}
              />
            ))}
          <div className=" py-2 pr-16 flex justify-end items-center">
            <div className=" text-gray-500">
              Subtotal: <br />
              Delivery: <br />
              Total: <br />
            </div>
            <div className="font-semibold pl-2">
              ₹{subtotal} <br />
              {cartProducts?.length > 0 ? "₹20" : "₹0"} <br />
              {cartProducts?.length > 0 ? `₹${subtotal + 20}` : `₹${subtotal}`}
              <br />
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div>
            <h2>Checkout</h2>
            <form onSubmit={proceedToCheckout}>
              <AddressInputs
                addressProps={address}
                setAddressProp={handleAddressChange}
              />
              <button type="submit" className=" mt-6">
                {cartProducts?.length > 0
                  ? `pay ₹${subtotal + 20} `
                  : `pay ₹${subtotal}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
