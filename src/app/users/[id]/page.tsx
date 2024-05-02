"use client";

import useProfile from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const { loading, data } = useProfile();
  const [user, setUser] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    fetch("/api/users?_id=" + id).then((res) => {
      res.json().then((users) => {
        setUser(users);
      });
    });
  }, [id]);

  async function handleSaveButtonClick(
    e: FormEvent<HTMLFormElement>,
    data: any
  ) {
    e.preventDefault();

    const myResponse = new Promise<void>(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });
      res.ok ? resolve() : reject();
    });
    await toast.promise(myResponse, {
      loading: "Saving",
      success: "Profile Saved",
      error: "Error",
    });
  }

  if (loading) {
    return "Loading....";
  }

  if (!data.isAdmin) {
    return "Not an admin";
  }

  return (
    <section className=" max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={data.isAdmin} />
      <div>
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}
