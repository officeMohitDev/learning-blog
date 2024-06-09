"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { loginWithGoogle } from '@/actions'

const GoogleButton = () => {
    const [loading, setLoading] = useState(false)
    return (
        <Button disabled={loading} onClick={async () => {
            setLoading(true)
            await loginWithGoogle().then(res => {
                setLoading(false)
                window.history.back()
            })
        }} className={`w-full hover:bg-[#DC2626] bg-[#DC2626]`}>Google</Button>
    )
}

export default GoogleButton