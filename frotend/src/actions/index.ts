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
        // console.log(error.response.data)
        return { msg: "Something went wrong", status: "error" };
    }
};