"use client";
import TrashIcon from "../Icons/TrashIcon";
import PlusIcon from "../Icons/PlusIcon";

export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}: {
  name: string;
  addLabel: string;
  props: any;
  setProps: any;
}) {
  function addProp() {
    setProps((oldProps: any) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }

  function editProp(e: any, index: number, prop: "name" | "price") {
    const newValue = e.target.value;
    setProps((prevSizes: any) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove: any) {
    setProps((prev: any) =>
      prev.filter((v: any, index: any) => index !== indexToRemove)
    );
  }

  return (
    <div className=" bg-gray-200 p-2 rounded-md mb-2">
      <label>{name}</label>
      {props?.length > 0 &&
        props.map((size: any, index: number) => (
          <div key={index} className=" flex items-end gap-2">
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Size name"
                value={size.name}
                onChange={(e) => editProp(e, index, "name")}
              />
            </div>
            <div>
              <label>Extra price</label>
              <input
                type="text"
                placeholder="Extra price"
                value={size.price}
                onChange={(e) => editProp(e, index, "price")}
              />
            </div>
            <div>
              <button
                type="button"
                className=" bg-white mb-2 px-2"
                onClick={() => removeProp(index)}
              >
                <TrashIcon />
              </button>
            </div>
          </div>
        ))}
      <button type="button" onClick={addProp} className="bg-white items-center">
        <PlusIcon className="h-4 w-4" />
        <span>{addLabel}</span>
      </button>
    </div>
  );
}
