export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
}: {
  hasSizesOrExtras: any;
  onClick: any;
  basePrice: any;
}) {
  return (
    <button
      onClick={onClick}
      className=" mt-4 bg-primary text-white rounded-full px-8 py-2 "
    >
      {hasSizesOrExtras ? (
        <span>Add to cart (from ₹{basePrice})</span>
      ) : (
        <span>Add to cart ₹{basePrice}</span>
      )}
    </button>
  );
}
