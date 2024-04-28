"use client";
import SectionHeader from "@/components/layout/SectionHeader";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => setCategories(categories));
    });
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => setMenuItems(menuItems));
    });
  }, []);
  console.log(categories);
  console.log(menuItems);
  return (
    <section className=" mt-8">
      {categories?.length > 0 &&
        categories.map((c) => (
          <div>
            <div className=" text-center">
              <SectionHeader mainHeader={c.name} />
            </div>
            <div className=" grid grid-cols-3 gap-4 mt-6 mb-12">
              {menuItems
                .filter((item: any) => item.category === c._id)
                .map((item) => (
                  <MenuItem {...item} />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}
