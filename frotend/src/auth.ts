import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import clientPromise from "./lib/db"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import Github from "next-auth/providers/github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Github({
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      })
],
  adapter: MongoDBAdapter(clientPromise),
})