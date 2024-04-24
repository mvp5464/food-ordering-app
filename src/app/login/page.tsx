"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(e: any) {
    e.preventDefault();
    setLoginInProgress(true);
    console.log(email, password);
    const res = await signIn("credentials", {
      username: email,
      password,
      callbackUrl: "/",
    });
    console.log(res);

    setLoginInProgress(false);
  }
  return (
    <section className=" mt-8">
      <h1 className=" text-center text-primary text-4xl mb-4">Login</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        {JSON.stringify(session)}
        <input
          disabled={loginInProgress}
          type="email"
          // name="email"
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
          // name="password"
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
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className=" flex justify-center gap-4"
        >
          <Image src={"/image.png"} alt={"google"} height={24} width={24} />
          Login with google
        </button>
      </form>
    </section>
  );
}
