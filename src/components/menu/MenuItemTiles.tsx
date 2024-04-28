import AddToCartButton from "./AddToCartButton";

export default function MenuItemTiles({
  onAddToCart,
  ...item
}: {
  onAddToCart: () => void;
}) {
  //@ts-ignore
  const { name, image, description, basePrice, sizes, extraIngredientPrices } =
    item;
  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientPrices?.length > 0;
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-2xl hover:shadow-black/25 transition-all">
      <div className=" text-center">
        <img
          src={image || "/pizza2.png"}
          alt="Pizza"
          className=" max-h-24 max-auto block mx-auto"
        />
      </div>
      <h4 className=" font-semibold text-xl my-3">{name}</h4>
      <p className=" text-gray-500 text-sm line-clamp-3">{description}</p>
      <AddToCartButton
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
      />
    </div>
  );
}
