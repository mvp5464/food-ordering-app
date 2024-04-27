"use client";
import EditableImage from "@/components/layout/editableImage";
import { useState } from "react";
import MenuItemPriceProps from "./MenuItemPriceProps";

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
  const [sizes, setSizes] = useState<any>([]);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState<any>([]);

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
          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add item size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Extra ingredients"}
            addLabel={"Add ingredients prices"}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
