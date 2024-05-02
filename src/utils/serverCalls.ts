import { MenuItem } from "@/app/models/db";
import mongoose from "mongoose";
import { cache } from "react";

// export async function getMenuItems() {
export const getMenuItems = cache(async () => {
  mongoose.connect(process.env.MONGO_URL || "");
  const allItems = await MenuItem.find();
  console.log("getmenuItems");
  console.log(allItems);
  return allItems;
});
// }
