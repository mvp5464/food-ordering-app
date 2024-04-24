"use client"; // Change this by transfering all the client component to different file
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  //   Optimise here as no need to fetch from the same backend (harkirat class)
  async function handleFormSubmit(e: any) {
    e.preventDefault();
    setCreatingUser(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      response.ok ? setUserCreated(true) : setError(true);
      setCreatingUser(false);
    } catch (e) {
      console.log({ Errrrrrrrrrrrrr: e });
      setCreatingUser(false);
    }
  }

  return (
    <section className="mt-8">
      <h1 className=" text-center text-primary text-4xl mb-4">Register</h1>
      {userCreated && (
        <div className="my-4 text-center">
          User created Successfully.{" "}
          <Link className=" underline" href={"/login"}>
            Login Now &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center text-red-800">
          Error creating user.{" "}
        </div>
      )}
      <form className=" block max-w-xs mx-auto " onSubmit={handleFormSubmit}>
        <input
          disabled={creatingUser}
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setUserCreated(false);
            setError(false);
          }}
        />
        {JSON.stringify(email)}
        <input
          disabled={creatingUser}
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setUserCreated(false);
            setError(false);
          }}
        />
        {JSON.stringify(password)}
        <button
          type="submit"
          disabled={creatingUser}
          onClick={() => {
            setUserCreated(false);
            setError(false);
          }}
        >
          Register
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
        <div className=" text-center my-4 text-gray-500 border-t pt-4">
          Already have an account?{" "}
          <Link className=" underline" href={"/login"}>
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
