import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import clientPromise from "./lib/db"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import Github from "next-auth/providers/github"
import credentials from "next-auth/providers/credentials"
 
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
    ,
    credentials({
      async authorize(credentials){
        console.log("credentials", credentials)
        try {
          const res = await fetch("http://localhost:3020/api/user/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
          });
    
          if (!res.ok) {
            const data = await res.json();
            console.log('Failed to submit form:', data);
            return {error: data?.errors?.message || "error"} as any;
          }
          const data = await res.json();
          console.log('Server response:', data);
        } catch (error) {
          console.error('Error submitting form:', error);
          return {error: "Error message"};

        }
        return credentials
      }
    })
],
  adapter: MongoDBAdapter(clientPromise),
})