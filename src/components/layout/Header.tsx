"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "../AppContext";
import ShoppingCart from "../Icons/ShoppingCart";

export default function Header() {
  const session = useSession();
  const userDate = session.data?.user;
  const userName =
    userDate?.name?.split(" ")[0] || userDate?.email?.split("@")[0];
  //@ts-ignore
  const { cartProducts } = useContext(CartContext);
  const status = session.status;
  return (
    <header className=" flex justify-between items-center">
      <nav className="flex gap-8 font-semibold text-gray-500 items-center">
        <Link className=" text-primary font-semibold text-2xl" href={"/"}>
          0l's Oate
        </Link>
        <Link href={"/"}>Home</Link>
        <Link href={"/menu"}>Menu</Link>
        <Link href={"/#about"}>About</Link>
        <Link href={"/#contact"}>Contact</Link>
      </nav>
      <nav className=" flex gap-4 items-center text-gray-500 font-semibold">
        {status == "authenticated" && (
          <>
            <Link href={"/profile"} className=" whitespace-nowrap">
              Hello, {userName}
            </Link>
            <button
              onClick={() => signOut()}
              className=" bg-primary rounded-full px-8 py-2 text-white"
            >
              Logout
            </button>
          </>
        )}
        {status == "unauthenticated" && (
          <>
            <Link href={"/login"}>Login</Link>
            <Link
              href={"/register"}
              className=" bg-primary rounded-full px-8 py-2 text-white"
            >
              Register
            </Link>
          </>
        )}
        <Link href={"/cart"} className=" relative">
          <ShoppingCart />
          <span className=" absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
            {cartProducts?.length || 0}
          </span>
        </Link>
      </nav>
    </header>
  );
}
