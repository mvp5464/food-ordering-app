"use client";
import LeftArrow from "@/components/Icons/LeftArrow";
import useProfile from "@/components/UseProfile";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/editableImage";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditMenuItemPage() {
  const { id } = useParams();

  const { loading, data } = useProfile();
  const [menuItem, setMenuItem] = useState<any>([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [redirectToItems, setRedirectToItems] = useState(false);

  useEffect(() => {
    fetch("/api/menu-items").then((res) =>
      res.json().then((items: any) => {
        const item = items.find((i: any) => i._id === id);
        setMenuItem(item);
      })
    );
  }, []);

  async function handleFormSubmit(e: any, data: any) {
    e.preventDefault();
    data = { ...data, _id: id };

    const savingPromise = new Promise<void>(async (res, rej) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        res();
        // setImage("");
        // setName("");
        // setDescription("");
        // setBasePrice("");
      } else {
        rej();
      }

      await toast.promise(savingPromise, {
        loading: "Saving this tasty item",
        success: "Saved",
        error: "Error",
      });
      setRedirectToItems(true);
    });
  }
  if (redirectToItems) {
    return redirect("/menu-items");
  }
  if (loading) {
    return "Loading user info";
  }
  if (!data.isAdmin) {
    return "Not an admin";
  }
  return (
    <section className=" mt-8">
      <UserTabs isAdmin={data?.isAdmin} />
      <div className="mt-8 max-w-md mx-auto">
        <Link href={"/menu-items"} className="button">
          <LeftArrow />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm onSubmit={handleFormSubmit} menuItem={menuItem} />
    </section>
  );
}
