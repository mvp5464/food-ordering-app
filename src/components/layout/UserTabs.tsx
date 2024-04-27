"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }: { isAdmin: boolean }) {
  const path = usePathname();
  return (
    <div className=" flex mx-auto gap-2 tabs justify-center">
      <Link
        className={`${path === "/profile" ? "active" : ""}`}
        href={"/profile"}
      >
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            className={path === "/categories" ? "active" : ""}
            href={"/categories"}
          >
            Categories
          </Link>
          <Link
            // className={`${path === "/menu-items" ? "active" : ""} ${
            //   path === "/menu-items/new" ? "active" : ""
            // }`}
            className={path.includes("menu-items") ? "active" : ""}
            // className={/menu-item/.test(path) ? "active" : ""} // How this works regex
            href={"/menu-items"}
          >
            Menu Items
          </Link>
          <Link
            className={path.includes("users") ? "active" : ""}
            href={"/users"}
          >
            Users
          </Link>
          <Link className={path === "/orders" ? "active" : ""} href={"/orders"}>
            Orders
          </Link>
        </>
      )}
    </div>
  );
}
