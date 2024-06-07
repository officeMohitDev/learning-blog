"use server"

import { auth, signIn } from "@/auth"

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