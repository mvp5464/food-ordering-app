"use client";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import Image from "next/image";
import MenuItemTiles from "./MenuItemTiles";

interface ExtraPriceTypes {
  name: string;
  price: number;
}
interface MenuItemTypes {
  name: string;
  image: string;
  description: string;
  basePrice: number;
  sizes: ExtraPriceTypes[];
  extraIngredientPrices: ExtraPriceTypes[];
}

export default function MenuItem(menuItem: MenuItemTypes) {
  const { name, image, description, basePrice, sizes, extraIngredientPrices } =
    menuItem;
  const [selectedSize, setSelectedSize] = useState<any>(
    (sizes && sizes[0]) || null
  );
  const [selectedExtra, setSelectedExtra] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  //@ts-ignore
  const { addToCart } = useContext(CartContext);

  function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;

    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }

    addToCart(menuItem, selectedSize, selectedExtra);
    setShowPopup(false);
    toast.success("Added to cart!");
  }

  function handleExtraThingClick(e: any, extraThing: any) {
    const checked = e.target.checked;
    if (checked) {
      setSelectedExtra((prev) => [...prev, extraThing]);
    } else {
      //@ts-ignore
      setSelectedExtra((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  }

  // add uesref || useMemo
  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtra?.length > 0) {
    for (const extra of selectedExtra) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {showPopup && (
        <div
          className=" fixed inset-0 bg-black/80 flex justify-center items-center"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white p-4 rounded-lg max-w-md max-h-[90%] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={image || "/pizza2.png"}
              alt={name}
              width={300}
              height={200}
              className=" mx-auto"
            />
            <h2 className="text-lg font-bold text-center mb-2">{name} </h2>
            <p className=" text-center text-gray-500 text-sm mb-2">
              {description}
            </p>
            {sizes?.length > 0 && (
              <div className="p-2">
                <h3 className="text-center text-gray-700">Pick your size</h3>
                {sizes.map((size) => (
                  <label className="flex items-center gap-2 p-4 border rounded-md mb-1">
                    <input
                      onClick={() => setSelectedSize(size)}
                      checked={selectedSize?.name === size?.name}
                      type="radio"
                      name="size"
                    />{" "}
                    {size.name} ₹{basePrice + size.price}
                  </label>
                ))}
              </div>
            )}
            {extraIngredientPrices?.length > 0 && (
              <div className="p-2">
                <h3 className="text-center text-gray-700">Any extras?</h3>
                {JSON.stringify(selectedExtra)}
                {extraIngredientPrices.map((extraThing) => (
                  <label className="flex items-center gap-2 p-4 border rounded-md mb-1">
                    <input
                      type="checkbox"
                      onChange={(e) => handleExtraThingClick(e, extraThing)}
                      name={extraThing.name}
                    />
                    {extraThing.name} ₹{extraThing.price}
                  </label>
                ))}
              </div>
            )}
            <button
              className=" primary sticky bottom-2"
              onClick={handleAddToCartButtonClick}
              type="button"
            >
              Add to cart ₹{selectedPrice}
            </button>
            <button className=" mt-2" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <MenuItemTiles onAddToCart={handleAddToCartButtonClick} {...menuItem} />

      {/* <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-2xl hover:shadow-black/25 transition-all">
        <div className=" text-center">
          <img
            src={image || "/pizza2.png"}
            alt="Pizza"
            className=" max-h-24 max-auto block mx-auto"
          />
        </div>
        <h4 className=" font-semibold text-xl my-3">{name}</h4>
        <p className=" text-gray-500 text-sm line-clamp-3">{description}</p>
        <button
          onClick={handleAddToCartButtonClick}
          className=" mt-4 bg-primary text-white rounded-full px-8 py-2 "
        >
          {sizes?.length > 0 || extraIngredientPrices?.length > 0 ? (
            <span>Add to cart (from ₹{basePrice})</span>
          ) : (
            <span>Add to cart ₹{basePrice}</span>
          )}
        </button>
      </div> */}
    </>
  );
}
