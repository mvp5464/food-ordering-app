import { User } from "@/app/models/User";
import clientPromise from "@/lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // //@ts-ignore
  // adapter: MongoDBAdapter(clientPromise),
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
        console.log("OKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK");
        console.log(email, password);
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
    session: ({ session, token, user }: any) => {
      console.log(session);
      if (session && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  // pages: {
  //   signIn: "/login",
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
