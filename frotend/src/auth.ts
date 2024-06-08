import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter"; // Adjust the path to your utility function
import { generateRandomUsername } from "./utils/generateRandomName";
import { toast } from "sonner";

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
          username: profile.email.split("@")[0],
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
          username: profile?.email?.split("@")[0],
          role: "user",
        } as any;
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch("http://localhost:3020/api/user/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
          });

          if (!res.ok) {
            const data = await res.json();
            console.log("error in nigga", data)
            throw Error(data) 
          }
          const data = await res.json();

          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email, 
            username: data.user.email,
            role: data.user.role,
            image: data.user.image,
          } as any;
        } catch (error) {
          throw Error("err") 

        }
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
        token.sub = user.id;
        token.role = user.role;
        token.username = user.username;
      }
      // console.log("token", token);
      return token;
    },
    
  },
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
});
