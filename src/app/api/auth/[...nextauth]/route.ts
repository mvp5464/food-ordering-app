import { User } from "@/app/models/user";
// import clientPromise from "@/lib/db";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  // //@ts-ignore
  // adapter: MongoDBAdapter(clientPromise),
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.username; // Give error as by default it only provides username and password
        const password = credentials?.password || "";

        mongoose.connect(process.env.MONGO_URL || "");
        const user = await User.findOne({ email });
        if (!user) {
          return null;
        }
        console.log(user);
        const passwordOK = user && bcrypt.compareSync(password, user.password);
        console.log(credentials);
        console.log({ passwordOK });
        if (passwordOK) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // TODO: can u fix the type here? Using any is bad
    async session({ token, session }: any) {
      session.user.id = token.sub;
      console.log(session);
      return session;
    },
  },
  // pages: {
  //   signIn: "/login",
  // },
});

export { handler as GET, handler as POST };
