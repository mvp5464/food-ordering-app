"use client";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/editableImage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useProfile from "../UseProfile";

interface UserType {
  email: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  image: string;
  country: string;
  isAdmin: boolean;
  phone: string;
  name: string;
  password: string;
}

export default function UserForm({
  user,
  onSave,
}: {
  user: UserType;
  onSave: (e: FormEvent<HTMLFormElement>, any: any) => void;
}) {
  //   const session = useSession(); // use getServerSession() instead of useSession() for server and remove "use client"
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);
  const { data: loggedInUserData } = useProfile();
  //   const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    setUserName(user?.name || "");
    setImage(user?.image || "");
    setPhone(user?.phone || "");
    setStreetAddress(user?.streetAddress || "");
    setPostalCode(user?.postalCode || "");
    setCity(user?.city || "");
    setCountry(user?.country || "");
    setEmail(user?.email || "");
    setIsAdmin(user?.isAdmin || false);
  }, [user]);
  return (
    <div className="flex gap-4">
      <div>
        <div className=" p-2 rounded-lg relative max-w-[120px]">
          {/* <EditableImage link={userImage} setLink={setimage}/> */}
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(e) =>
          onSave(e, {
            name: userName,
            image,
            phone,
            streetAddress,
            postalCode,
            city,
            country,
            email,
            isAdmin,
          })
        }
      >
        <label>Name</label>
        <input
          type="text"
          //   disabled={isSaving}
          placeholder="First and Last name"
          value={userName}
          onChange={(e) => {
            // setSaved(false);
            return setUserName(e.target.value);
          }}
        />
        <label>Email</label>
        <input
          className=" select-none"
          type="email"
          disabled={true}
          placeholder="Email"
          value={email}
        />
        <label>Phone number</label>
        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label>Street address</label>
        <input
          type="text"
          placeholder="Street address"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        />
        <div className="flex gap-2">
          <div>
            <label>Postal code</label>
            <input
              style={{ margin: "0" }}
              type="text"
              placeholder="Postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div>
            <label>City</label>
            <input
              style={{ margin: "0" }}
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label>Country</label>
            <input
              style={{ margin: "0" }}
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
        {loggedInUserData?.isAdmin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 my-2"
              htmlFor="adminCb"
            >
              <input
                type="checkbox"
                id="adminCb"
                className=""
                value={"1"}
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button className=" mt-2" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
