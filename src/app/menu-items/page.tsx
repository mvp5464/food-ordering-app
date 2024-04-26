"use client";
import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/editableImage";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MenuItemsPage() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const { loading, data } = useProfile();

  async function handleFormSubmit(e: any) {
    e.preventDefault();
    const data = { image, name, description, basePrice };

    const savingPromise = new Promise<void>(async (res, rej) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) res();
      else rej();

      await toast.promise(savingPromise, {
        loading: "Saving this tasty item",
        success: "Saved",
        error: "Error",
      });
    });
  }

  if (loading) {
    return "Loading user info...";
  }

  console.log(data.isAdmin);

  if (!data.isAdmin) {
    return "Not an admin";
  }

  return (
    <section className=" mt-8">
      <UserTabs isAdmin={data?.isAdmin} />
      <form onSubmit={handleFormSubmit} className=" mt-8 max-w-md mx-auto">
        <div className=" grid items-start gap-4 grid-cols-10">
          <div className=" col-span-3">
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="grow col-span-7">
            <label>Item name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Base price</label>
            <input
              type="text"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  );
}
