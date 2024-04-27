"use client";
import LeftArrow from "@/components/Icons/LeftArrow";
import useProfile from "@/components/UseProfile";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/editableImage";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {
  const { loading, data } = useProfile();
  const [redirectToItems, setRedirectToItems] = useState(false);

  async function handleFormSubmit(e: any, data: any) {
    e.preventDefault();

    const savingPromise = new Promise<void>(async (res, rej) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
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
      <div className="mt-8 max-w-2xl mx-auto">
        <Link href={"/menu-items"} className="button">
          <LeftArrow />
          <span>Show all menu items</span>
        </Link>
      </div>

      <MenuItemForm onSubmit={handleFormSubmit} />
    </section>
  );
}
