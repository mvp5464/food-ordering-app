"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "../AppContext";
import ShoppingCart from "../Icons/ShoppingCart";
import Bars2 from "../Icons/Bars2Icon";

function AuthLinks({ status, userName }: { status: string; userName: string }) {
  if (status === "authenticated") {
    return (
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
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Link href={"/login"}>Login</Link>
        <Link
          href={"/register"}
          className=" bg-primary rounded-full px-8 py-2 text-white"
        >
          Register
        </Link>
      </>
    );
  }
}

export default function Header() {
  const session = useSession();
  const userDate = session.data?.user;
  const userName =
    userDate?.name?.split(" ")[0] || userDate?.email?.split("@")[0];
  //@ts-ignore
  const { cartProducts } = useContext(CartContext);
  const status = session.status;
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <header className="">
      <div className="flex justify-between items-center md:hidden">
        <Link className=" text-primary font-semibold text-2xl" href={"/"}>
          Dr&apos;s Cafe
        </Link>
        <div className="flex gap-8 items-center">
          <Link href={"/cart"} className=" relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className=" absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts?.length}
              </span>
            )}
          </Link>
          <button
            className="p-1 border"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <Bars2 />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          className=" md:hidden p-2 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center"
          onClick={() => setMobileNavOpen(false)}
        >
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
          <AuthLinks status={status} userName={userName || ""} />
        </div>
      )}
      <div className=" hidden md:flex justify-between items-center">
        <nav className="flex gap-8 font-semibold text-gray-500 items-center">
          <Link className=" text-primary font-semibold text-2xl" href={"/"}>
            Dr&apos;s Cafe
          </Link>
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
        </nav>
        <nav className=" flex gap-4 items-center text-gray-500 font-semibold">
          <AuthLinks status={status} userName={userName || ""} />
          <Link href={"/cart"} className=" relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className=" absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts?.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
