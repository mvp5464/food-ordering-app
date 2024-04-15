"use client"; // Change this by transfering all the client component to different file
import Image from "next/image";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   Optimise here as no need to fetch from the same backend (harkirat class)
  function handleFormSubmit(e: any) {
    e.preventDefault();
    console.log(1);
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(2);
  }

  return (
    <section className="mt-8">
      <h1 className=" text-center text-primary text-4xl mb-4">Register</h1>
      <form className=" block max-w-xs mx-auto " onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {JSON.stringify(email)}
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {JSON.stringify(password)}
        <button type="submit">Register</button>
        <div className=" my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button className=" flex justify-center gap-4" type="submit">
          <Image src={"/image.png"} alt={"google"} height={24} width={24} />
          Login with google
        </button>
      </form>
    </section>
  );
}
