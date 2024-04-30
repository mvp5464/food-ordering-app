"use client";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/editableImage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();

  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const { status } = session;

  const userImage = session.data?.user?.image || "";
  const email = session.data?.user?.email || "";

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((res: any) => {
        res.json().then((data: any) => {
          setUser(data);
          setIsAdmin(data.isAdmin);
          setProfileFetched(true);
        });
      });
    }
  }, [status, session]);

  async function handleProfileForUpdate(
    e: FormEvent<HTMLFormElement>,
    data: any
  ) {
    e.preventDefault();

    const myResponse = new Promise<void>(async (resolve, reject) => {
      const res: Response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, email }), //???(email is not there in video)
      });
      res.ok ? resolve() : reject();
      //   if (res.ok) {
      //     resolve();
      //   } else {
      //     reject();
      //   }
    });

    // res.ok && setSaved(true);
    // setIsSaving(false);
    await toast.promise(myResponse, {
      loading: "Saving",
      success: "Profile Saved",
      error: "Error",
    });
  }

  //   async function handleFileChange(e: any) {
  //     //
  //     console.log(e);
  //     console.log(e.target.files);
  //     console.log(e.target.files.Filelist);

  //     const files = e.target.files;
  //     if (files?.length === 1) {
  //       const data = new FormData();
  //       data.set("file", files[0]);
  //       await fetch("/api/upload", {
  //         method: "POST",
  //         body: data,
  //         // headers: { "Content-Type": "multipart/form-data" },
  //       });
  //     }
  //   }

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }
  return (
    <section className=" mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className=" max-w-2xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileForUpdate} />
      </div>
    </section>
  );
}
