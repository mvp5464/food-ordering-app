import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className=" flex justify-between items-center">
      <Link className=" text-primary font-semibold text-2xl" href={"/"}>
        Dr's Cafe
      </Link>
      <nav className="flex gap-8 font-semibold text-gray-500 items-center">
        <Link href={""}>Home</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Contact</Link>
        <Link
          href={""}
          className=" bg-primary rounded-full px-8 py-2 text-white"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
