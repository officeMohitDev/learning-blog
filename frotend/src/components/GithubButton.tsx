"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { loginWithGithub } from '@/actions'
const GithubButton = () => {
    const [loading, setLoading] = useState(false)
    return (
        <Button disabled={loading} onClick={async () => {
            setLoading(true)
            await loginWithGithub().then(res => {
                setLoading(false)
                window.history.back()

            })
        }} className={`w-full`}>Github</Button>
    )
}

export default GithubButton