"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession(); // use getServerSession() instead of useSession() for server and remove "use client"
  const [userName, setUserName] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  // Change the below into one
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  console.log(session);
  const { status } = session;
  const userImage = session.data?.user?.image || "";

  useEffect(() => {
    status === "authenticated" && setUserName(session.data?.user?.name || "");
  }, [status]);

  async function handleProfileForUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ userName });
    // setSaved(false);
    // setIsSaving(true);
    const myResponse = new Promise<void>(async (resolve, reject) => {
      const res: Response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          streetAddress,
          phone,
          postalCode,
          city,
          country,
        }),
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

  if (status === "loading") {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }
  return (
    <section className=" mt-8">
      <h1 className=" text-center text-primary text-4xl mb-4">Profile</h1>
      <div className=" max-w-md mx-auto ">
        {/* <h2
          className={` text-center p-4 rounded-lg border 
          ${
            isSaving
              ? "bg-blue-200 border-blue-300 block"
              : saved
              ? "bg-green-200 border-green-300 block"
              : "hidden"
          } 
          `}
        >
          {isSaving ? "Saving..." : "Profile saved!"}
        </h2> */}
        <div className="flex gap-4 items-center">
          {/* <div>
            <div className=" p-2 rounded-lg relative max-w-[120px]">
              {userImage && (
                <Image
                  className=" rounded-lg w-full h-full mb-1"
                  src={userImage}
                  alt={"Avatar"}
                  width={250}
                  height={250}
                />
              )}
              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className=" block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
                  Edit
                </span>
              </label>
            </div>
          </div> */}
          <form className="grow" onSubmit={handleProfileForUpdate}>
            <input
              type="text"
              disabled={isSaving}
              placeholder="First and Last name"
              value={userName}
              onChange={(e) => {
                setSaved(false);
                return setUserName(e.target.value);
              }}
            />
            <input
              className=" select-none"
              type="email"
              disabled={true}
              value={session.data?.user?.email || ""}
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Street address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <button disabled={isSaving} type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
