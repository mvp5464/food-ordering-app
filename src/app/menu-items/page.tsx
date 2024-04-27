"use client";
import RightArrow from "@/components/Icons/RightArrow";
import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/editableImage";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MenuItemsPage() {
  const { loading, data } = useProfile();
  const [menuItems, setMenuItems] = useState<any>([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  console.log(data.isAdmin);

  if (!data.isAdmin) {
    return "Not an admin";
  }
  console.log(menuItems);
  return (
    <section className=" mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={data.isAdmin} />
      <div className="mt-8">
        <Link className="button flex" href={"/menu-items/new"}>
          <span>Create new menu item</span>
          <RightArrow />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item: any, i: number) => (
              <Link
                key={i}
                href={"/menu-items/edit/" + item._id}
                className=" bg-gray-200 rounded-lg p-4"
              >
                <div className="relative">
                  <Image
                    src={"/pizza2.png"}
                    alt={""}
                    width={100}
                    height={100}
                  />
                </div>
                {item.name}
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
