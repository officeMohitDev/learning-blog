"use client"
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import React from 'react'

const ProfilePage = () => {
    return (
        <div>
            <Button onClick={() => signOut()}>Logout</Button>
        </div>
    )
}

export default ProfilePage