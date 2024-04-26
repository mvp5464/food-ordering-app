"use client";
import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { redirect } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  interface DataType {
    name: string;
    _id?: string;
  }
  [];
  const { loading: profileLoading, data: profileData } = useProfile();
  const [CategoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState<any>([]);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  useEffect(() => {
    fetchCategories();
  }, []);
  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleCategorySubmit(e: any) {
    e.preventDefault();
    const createPromise = new Promise<void>(async (resolve, reject) => {
      const data: DataType = { name: CategoryName };
      if (editingCategory) {
        data._id = editingCategory._id;
        console.log(data);
      }
      const response = await fetch("/api/categories", {
        method: editingCategory ? "PUT" : "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditingCategory(null);
      console.log(response);
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(createPromise, {
      loading: editingCategory
        ? "Updating category..."
        : "Creating your new category...",
      success: editingCategory ? "Category updated" : "Category created",
      error: "Error, sorry...",
    });
  }

  console.log(profileData);
  console.log(profileLoading);
  console.log(profileData?.isAdmin);

  if (profileLoading) {
    console.log("waiting for info");
    return "Loading Info.....";
  }
  //   profileLoading && "Loading INfo ........"; //NOT WORKING PROPERLY WHY

  if (!profileData?.isAdmin) {
    console.log("you are not admin");
    return redirect("/profile");
    return "YOU are not admin";
  }
  //   !profileData?.isAdmin && redirect("/profile");

  return (
    <section className=" mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={profileData?.isAdmin} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editingCategory ? "Update category : " : "New category name"}
              {editingCategory && <b>{editingCategory.name}</b>}
            </label>
            <input
              type="text"
              value={CategoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="pb-2">
            <button className="border border-primary" type="submit">
              {editingCategory ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Edit category</h2>
        {categories?.length > 0 &&
          categories.map((c: { name: string }) => (
            <button
              className=" bg-gray-200 rounded-xl p-2 px-4 flex gap-1 mb-1 cursor-pointerrrr"
              onClick={() => {
                setEditingCategory(c);
                setCategoryName(c.name);
              }}
            >
              {c.name}
            </button>
          ))}
      </div>
    </section>
  );
}
