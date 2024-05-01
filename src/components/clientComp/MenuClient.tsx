"use client";
import SectionHeader from "@/components/layout/SectionHeader";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

export default function MenuClientPage({
  allMenuItems,
}: {
  allMenuItems?: any;
}) {
  const [categories, setCategories] = useState<any[]>([]);
  //   const [menuItems, setMenuItems] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/categories", { next: { revalidate: 3600 } }).then((res) => {
      res.json().then((categories) => setCategories(categories));
    });
    // fetch("/api/menu-items").then((res) => {
    //   res.json().then((menuItems) => {
    //     console.log(menuItems);
    //     setMenuItems(menuItems);
    //   });
    // });
  }, []);
  return (
    <section className=" mt-8">
      {/* {JSON.stringify(allMenuItems)} */}
      {categories?.length > 0 &&
        categories.map((c) => (
          <div key={c._id}>
            <div className=" text-center">
              <SectionHeader mainHeader={c.name} />
            </div>
            <div className=" grid sm:grid-cols-3 gap-4 mt-6 mb-12">
              {allMenuItems
                .filter((item: any) => item.category === c._id)
                .map((item: any) => (
                  <MenuItem key={item._id} {...item} />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}
