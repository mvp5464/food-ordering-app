"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import TrashIcon from "@/components/Icons/TrashIcon";
import useProfile from "@/components/UseProfile";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeader from "@/components/layout/SectionHeader";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {
  //@ts-ignore
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

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

  let total = 0;
  if (cartProducts?.length > 0) {
    for (const p of cartProducts) {
      total += cartProductPrice(p);
    }
  }

  function handleAddressChange(propName: any, value: any) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
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
              <div className="flex items-center gap-4  border-b py-4">
                <div className="w-24">
                  <Image
                    src={product.image || "/pizza2.png"}
                    alt={product.name}
                    height={240}
                    width={240}
                  />
                </div>
                <div className=" grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && (
                    <div className=" text-sm">
                      Size: <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className=" text-sm text-gray-500">
                      Extras:
                      {product.extras.map((extra: any) => (
                        <div>
                          {extra.name} {extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className=" text-lg font-semibold">
                  ₹{cartProductPrice(product)}
                </div>
                <div className=" ml-2">
                  <button
                    className="p-2"
                    type="button"
                    onClick={() => removeCartProduct(index)}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          <div className=" py-2 text-right pr-16">
            <span className=" text-gray-500"> Subtotal:</span>
            <span className=" text-lg font-semibold pl-2"> ₹{total}</span>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">pay ₹{total}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
