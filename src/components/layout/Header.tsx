"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const session = useSession();
  console.log(session);
  const status = session.status;
  return (
    <header className=" flex justify-between items-center">
      <nav className="flex gap-8 font-semibold text-gray-500 items-center">
        <Link className=" text-primary font-semibold text-2xl" href={"/"}>
          Dr's Cafe
        </Link>
        <Link href={""}>Home</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Contact</Link>
      </nav>
      <nav className=" flex gap-4 items-center text-gray-500 font-semibold">
        {status == "authenticated" && (
          <button
            onClick={() => signOut()}
            className=" bg-primary rounded-full px-8 py-2 text-white"
          >
            Logout
          </button>
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
      </nav>
    </header>
  );
}
