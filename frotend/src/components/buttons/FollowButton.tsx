"use client"
import { baseURL } from '@/constants'
import fetchWithHeaders from '@/utils/api'
import React, { useState } from 'react'
import { Button } from '../ui/button'

const FollowButton = ({ data, mobile }: { data: any; mobile: boolean }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFollowed, setIsFollowed] = useState(data?.data?.followers?.find((follower: any) => follower._id === data?.currentUser?._id))
    const followOrUnfollowUser = async (userId: string) => {
        try {
            setIsLoading(true)
            const res = await fetchWithHeaders(`${baseURL}/user/following/${userId}`, {
                method: "PATCH",
            })

            console.log(res);
            setIsFollowed(!isFollowed)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    return (
        <Button disabled={isLoading} onClick={() => followOrUnfollowUser(data?.data?._id)} className={` ${mobile ? "flex mt-4 lg:hidden" : "hidden lg:flex lg:justify-center"} w-full bg-[#EF4444] hover:bg-[#EF4444]/80 text-white`}>{isFollowed ? "Following" : "Follow"
        }</Button>
    )
}

export default FollowButton