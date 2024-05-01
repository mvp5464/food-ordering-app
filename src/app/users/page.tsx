"use client";
import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const { loading, data } = useProfile();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/users", { next: { revalidate: 3600 } }).then((res) => {
      res.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return "Loading User Info...";
  }

  if (!data.isAdmin) {
    return "Not an admin";
  }

  return (
    <section className=" max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={data.isAdmin} />
      <div className=" mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className=" bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-center grow">
                <div className=" text-gray-900">
                  {!!user.name && <span>{user.name}</span>}
                  {!user.name && <span className=" italic">No name</span>}
                </div>
                <span className=" text-gray-500">{user.email}</span>
              </div>
              <div>
                <Link className="button" href={"/users/" + user._id}>
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
