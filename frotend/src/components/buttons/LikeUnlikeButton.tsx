"use client"
import { HeartIcon } from 'lucide-react'
import React, { SetStateAction } from 'react'

const LikeUnlikeButton = ({ blog, likeBlogPost, isLiked, loaderLike, }: {loaderLike:Boolean; blog: any; likeBlogPost: any; isLiked: boolean }) => {
    return (
        <button disabled={loaderLike as boolean} onClick={likeBlogPost} className="text-gray-500 border border-gray-500 rounded-full py-2 px-3 flex gap-2 items-center">
            <span><HeartIcon size={20} fill={isLiked ? '#EF4444' : "#fff"} color={isLiked ? "#EF4444" : "black"} /> </span>  {blog.likes.length}
        </button>
    )
}

export default LikeUnlikeButton