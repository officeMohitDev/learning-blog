"use server"

import { auth, signIn } from "@/auth"
import { baseURL } from "@/constants"
import { AuthError, User } from "next-auth"

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

export interface ExtendedUser extends User {
    username: string;
    location: string;
    website: string;
    about: string;
    github: string;
    twitter: string;
    instagram: string;
    medium: string;
    _id: string
}

export const getCurrentUser = async () => {
    const session = await auth();
    return session?.user as ExtendedUser
}

export const getUserDetails = async () => {
    try {
        const session: any = await auth();
        console.log(session)
        const res = await fetch(`${baseURL}/user/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: session.user.id })
        });
        const data = await res.json();
        return { data, loggedInUser: session?.user?.email === data.email }
    } catch (error) {
        console.log(error)
    }
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