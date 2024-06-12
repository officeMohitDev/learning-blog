import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import clientPromise from "./lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter"; // Adjust the path to your utility function
import { generateRandomUsername } from "./utils/generateRandomName";
import { toast } from "sonner";
import { baseURL } from "./constants";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          username: generateRandomUsername(profile.name),
          role: "user",
        };
      },
    }),
    GithubProvider({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          username: generateRandomUsername(profile.name as string),
          role: "user",
        } as any;
      },
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let res = await fetch(`${baseURL}/user/login`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials)
        })
        if (res.ok) {
          const  user = await res.json();
          return user
        }
         return null
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: {token : any, session: any}) {
      session.user.id = token.sub as string;
      session.user.role = token.role;
      session.user.username = token.username;
      // console.log("session", session);
      return session;
    },
    async jwt({ token, user } : {token : any, user: any}) {
      if (user) {
        token.sub = user._id;
        token.role = user.role;
        token.username = user.username;
      }
      console.log("token", user)
      return token;
    },
    
  },
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
});
