"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode, createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function AppProvider({ children }: { children: ReactNode }) {
  const [cartProducts, setCartProducts] = useState<any>();

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart") || ""));
    }
  }, []);

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indexToRemove: any) {
    setCartProducts((prevCartProducts: any) => {
      const newCartProducts = prevCartProducts.filter(
        (v: any, index: any) => index !== indexToRemove
      );
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
  }

  function saveCartProductsToLocalStorage(cartProducts: any) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  function addToCart(product: any, size: any = null, extras: any = []) {
    setCartProducts((prevProducts: any): any => {
      const cartProducts = { ...product, size, extras };
      const newProducts = [...(prevProducts || []), cartProducts];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeCartProduct,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
