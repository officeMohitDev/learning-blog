"use client"
import { HeartIcon } from 'lucide-react'
import React from 'react'

const LikeUnlikeButton = ({ blog, likeBlogPost, isLiked }: { blog: any; likeBlogPost: any; isLiked: boolean }) => {
    return (
        <button onClick={likeBlogPost} className="text-gray-500 border border-gray-500 rounded-full py-2 px-3 flex gap-2 items-center">
            <span><HeartIcon size={20} color={isLiked ? "red" : "black"} /> </span>  {blog.likes.length}
        </button>
    )
}

export default LikeUnlikeButton