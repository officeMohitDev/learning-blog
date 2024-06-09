"use server"

import { auth, signIn } from "@/auth"
import { AuthError } from "next-auth"

interface Formdata {
    email: string,
    password: string
}

export const loginWithGoogle = async () => {
    await signIn("google")
  }
export const loginWithGithub = async () => {
    await signIn("github")
  }

export const getCurrentUser = async () => {
    const session = await auth();
    return session?.user
}


export const loginUser = async (formdata: Formdata) => {
    try {
        return await signIn("credentials", {
            email: formdata.email,
            password: formdata.password,
            redirect: false
        });

    } catch (error) {
         if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": 
                return { msg: "wrong", status: "error" };
                default:
                return { msg: "Something went wrong", status: "error" };
            }
         }
         throw error
    }
};