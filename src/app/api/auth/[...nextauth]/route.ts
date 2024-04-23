import { User } from "@/app/models/user";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Username",
          type: "text",
          placeholder: "abc@example.com",
        },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        // // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // // You can also use the `req` object to obtain additional parameters
        // // (i.e., the request IP address)
        // const res = await fetch("/your/endpoint", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();

        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user;
        // }
        // // Return null if user data could not be retrieved

        //@ts-ignore
        const { email, password }: { email: string; password: string } =
          credentials;
        // const email = credentials?.email; // Give error as by default it only provides username and password
        // const password = credentials?.password;
        mongoose.connect(process.env.MONGO_URL || "");
        const user = await User.findOne({ email });
        const passwordOK = user && bcrypt.compareSync(password, user.password);
        console.log(credentials);
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
