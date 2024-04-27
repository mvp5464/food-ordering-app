"use client";
import LeftArrow from "@/components/Icons/LeftArrow";
import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/editableImage";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MenuItemForm({
  onSubmit,
  menuItem,
}: {
  onSubmit: any;
  menuItem?: any;
}) {
  //   const { id } = useParams();
  //   const { loading, data } = useProfile();
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  //   const [redirectToItems, setRedirectToItems] = useState(false);

  //   async function onSubmit(e: any) {
  //     e.preventDefault();
  //     const data = { _id: id, image, name, description, basePrice };

  //     const savingPromise = new Promise<void>(async (res, rej) => {
  //       const response = await fetch("/api/menu-items", {
  //         method: "PUT",
  //         body: JSON.stringify(data),
  //         headers: { "Content-Type": "application/json" },
  //       });
  //       if (response.ok) {
  //         res();
  //         // setImage("");
  //         // setName("");
  //         // setDescription("");
  //         // setBasePrice("");
  //       } else {
  //         rej();
  //       }

  //       await toast.promise(savingPromise, {
  //         loading: "Saving this tasty item",
  //         success: "Saved",
  //         error: "Error",
  //       });
  //       setRedirectToItems(true);
  //     });
  //   }

  return (
    <form
      onSubmit={(e) => onSubmit(e, { image, name, description, basePrice })}
      className=" mt-8 max-w-md mx-auto"
    >
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
  );
}
