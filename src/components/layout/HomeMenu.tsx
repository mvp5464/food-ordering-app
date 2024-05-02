"use client";
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeader from "./SectionHeader";
import { useEffect, useState } from "react";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/menu-items").then((res: any) => {
      res.json().then((menuItems: any) => {
        setBestSellers(menuItems.slice(-3));
      });
    });
  }, []);
  return (
    <section>
      <div className=" absolute h-fulls left-0 right-0 justify-center overflow-x-hiddens">
        {/* <div className=" absolute -left-0 -stop-[30px] text-left -z-10">
          <Image src={"/leaf2.png"} alt="leaf" height={256} width={248} />
        </div>
        <div className="absolute -right-0 -stop-[50px] -z-10">
          <Image src={"/leaf2.png"} alt="leaf" height={256} width={248} />
        </div> */}
      </div>
      <SectionHeader subHeader={"Checkout"} mainHeader={"Our Best Sellers"} />
      <div className=" grid sm:grid-cols-3 gap-4">
        {bestSellers?.length > 0 &&
          bestSellers.map((items) => (
            <MenuItem
              key={items._id}
              {...items} //You can pass this whole item instead of passing every single items
              // image={"/pizza2.png"}
              // name={items.name}
              // description={items.description}
              // basePrice={items.basePrice}
            />
          ))}
      </div>
    </section>
  );
}
