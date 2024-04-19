"use client";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(e: any) {
    e.preventDefault();
    setLoginInProgress(true);
    const { ok } = await fetch("api/login", {
      body: JSON.stringify({ email, password }),
      headers: { "content-Type": "application/json" },
      method: "POST",
    });
    if (ok) {
      //
    } else {
      //
    }
    setLoginInProgress(false);
  }
  return (
    <section className=" mt-8">
      <h1 className=" text-center text-primary text-4xl mb-4">Login</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          disabled={loginInProgress}
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            // setUserCreated(false);
            // setError(false);
          }}
        />
        {JSON.stringify(email)}
        <input
          disabled={loginInProgress}
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            // setUserCreated(false);
            // setError(false);
          }}
        />
        {JSON.stringify(password)}
        <button disabled={loginInProgress} type="submit">
          Login
        </button>
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
