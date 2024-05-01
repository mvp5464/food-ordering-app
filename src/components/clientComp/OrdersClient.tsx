"use client";
import { dbTimeForHuman } from "@/lib/datatime";
import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrdersClientPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(true);
  const { data } = useProfile();

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch("/api/orders", { next: { revalidate: 3600 } }).then((res) => {
      res.json().then((order) => {
        setOrders(order.reverse());
        setLoadingOrders(false);
      });
    });
  }

  return (
    <>
      <UserTabs isAdmin={data?.isAdmin} />
      <div className=" mt-8">
        {loadingOrders && <div>Loading order...</div>}
        {orders?.length > 0 &&
          orders.map((order: any) => (
            <div
              key={order._id}
              className=" bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6"
            >
              <div className="grow flex flex-col md:flex-row items-center gap-6">
                <div>
                  <div
                    className={
                      (order.paid ? "bg-green-500" : "bg-red-400") +
                      " p-2 rounded-md text-whit w-24 text-center"
                    }
                  >
                    {order.paid ? "paid" : "Not paid"}
                  </div>
                </div>
                <div className="grow">
                  <div className=" flex gap-2 items-center mb-1">
                    <div className=" grow">{order.userEmail}</div>
                    <div className=" text-gray-500 text-xs">
                      {dbTimeForHuman(order.createdAt)}
                    </div>
                  </div>
                  <div className=" text-gray-500 text-sm">
                    {order.cartProducts?.map((p: any) => p.name).join(", ")}
                  </div>
                </div>
              </div>
              <div className=" justify-end flex gap-2 items-center whitespace-nowrap ">
                <Link href={"/orders/" + order._id} className="button">
                  Show order
                </Link>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
