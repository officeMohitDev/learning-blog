'use client' // Error components must be Client Components

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    const router = useRouter()

    return (
        <div className='px-24 mt-6 h-[calc(100vh-200px)] justify-center flex flex-col items-center gap-6'>
            <h2>We cant find the page you are looking for : (</h2>
            <h3>maybe You go broken link. Try to go back</h3>
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => router.push("/")
                }
            >
                Try again
            </Button>
        </div>
    )
}