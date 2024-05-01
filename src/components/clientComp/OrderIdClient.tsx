"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeader from "@/components/layout/SectionHeader";
import CartProduct from "@/components/menu/CartProduct";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function OrderPage() {
  //@ts-ignore
  const { clearCart } = useContext(CartContext);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(true);
  const [order, setOrder] = useState<any>();
  const { id } = useParams();

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }

    if (id) {
      setLoadingOrders(true);
      fetch("/api/orders?_id=" + id, { next: { revalidate: 3600 } }).then(
        (res) => {
          res.json().then((orderData) => {
            setOrder(orderData);
            setLoadingOrders(false);
          });
        }
      );
    }
  }, [id]);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }
  return (
    <section className=" max-w-2xl mx-auto text-center mt-8">
      <div className=" text-center">
        <SectionHeader mainHeader="Your order" />
        <p>Thanks for your order</p>
        <p>We will call you when your order will be on the way.</p>
      </div>
      {loadingOrders && <div>Loading order...</div>}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map((product: any, i: number) => (
              <CartProduct key={i} product={product} />
            ))}
            <div className=" text-right py-2 text-gray-500">
              Subtotal:
              <span className="text-black font-bold inline-block w-12">
                ₹{subtotal}
              </span>
              <br />
              Delivery:
              <span className="text-black font-bold inline-block w-12">₹5</span>
              <br />
              Total:
              <span className="text-black font-bold inline-block w-12">
                ₹{subtotal + 20}
              </span>
              <br />
            </div>
          </div>
          <div>
            <div className=" bg-gray-100 p-4 rounded-lg">
              <AddressInputs disabled={true} addressProps={{ order }} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
