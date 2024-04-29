"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import TrashIcon from "@/components/Icons/TrashIcon";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function CartProduct({
  product,
  onRemove,
}: {
  product: any;
  onRemove?: any;
}) {
  //@ts-ignore
  const { cartProducts, removeCartProduct } = useContext(CartContext);

  return (
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
      <div className=" text-lg font-semibold">₹{cartProductPrice(product)}</div>
      {!!onRemove && (
        <div className=" ml-2">
          <button className="p-2" type="button" onClick={onRemove}>
            <TrashIcon />
          </button>
        </div>
      )}
    </div>
  );
}
