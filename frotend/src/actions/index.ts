"use server"

import { auth, signIn } from "@/auth"

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
        const res = await signIn("credentials", {
            email: formdata.email,
            password: formdata.password,
            redirectTo: "/"
        })

        if (!res?.ok) {
            const data = await res.json();
        console.log('Failed to submit form:', data);
        return {error: data.errors.message || "Error while registering" }
        }
        return {error: "hello"}
    } catch (error) {
            console.log("error", error)
        return 
        
    }
   
    console.log(res, "error niggga")
}