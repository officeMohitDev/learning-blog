"use client"
import React from 'react'
import { Button } from './ui/button'
import { signIn } from '@/auth'
import { signOut } from 'next-auth/react'

const LogoutButton = ({ mobile }: { mobile: Boolean }) => {
    return (
        <Button onClick={() => signOut({ callbackUrl: '/', redirect: true })} type='submit' className={`${mobile ? "block md:hidden" : " hidden md:block"}  w-full `}>Log Out</Button>
    )
}

export default LogoutButton