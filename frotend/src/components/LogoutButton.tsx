"use client"
import React from 'react'
import { Button } from './ui/button'
import { signIn } from '@/auth'
import { signOut } from 'next-auth/react'
import { toast } from 'sonner'

const LogoutButton = ({ mobile }: { mobile: Boolean }) => {
    return (
        <Button onClick={() => {
            signOut({ callbackUrl: '/', redirect: true });
            toast.success("Successfully logged out, you will be redirected soon!")
        }} type='submit' className={`${mobile ? "block md:hidden" : " hidden md:block"}  w-full `}>Log Out</Button>
    )
}

export default LogoutButton