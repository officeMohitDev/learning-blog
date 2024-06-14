"use client"
import React, { useState } from 'react'
import LikeUnlikeButton from '../buttons/LikeUnlikeButton'
import { MessageCircleIcon } from 'lucide-react'
import { baseURL } from '@/constants'
import { toast } from 'sonner'



const comments = [
    {
        id: 1,
        name: 'Alex Plutau',
        username: 'packagemain.tech',
        date: 'Jun 7',
        content: "We use Redis very often, over time we noticed that it's also to pay attention to how you name your keys, so it's easier to do invalidations and share cache between multiple services/teams - https://packagemain.tech/p/unified-namespaced-cache-keys",
        avatar: 'https://via.placeholder.com/50',
    },
]


const BlogStat = ({ blog: blogData, user }: { blog: any, user: any }) => {
    const [isLiked, setIsLiked] = useState(blogData.likes.find((like: any) => like._id === user._id));
    const [blog, setBlog] = useState(blogData)
    console.log("is it like or not", isLiked)

    const likeBlogPost = async () => {
        try {
            const res = await fetch(`${baseURL}/blog/like/${blog._id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other common headers here
                    'Authorization': `Bearer ${user?._id}`,
                }
            })
            if (!res.ok) {
                toast.error("Unexpected error")
            }
            const data = await res.json();
            console.log("blog update data", data);
            setBlog(data.blog)
            setIsLiked(data.message === "Blog Liked" ? true : false)
            toast.success(data.message === "Blog Liked" ? "Post Liked 💘" : "Post Unliked 💔")
            return res
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    return blog ? (
        <div className="max-w-3xl mx-auto p-4">
            <div className="flex items-center space-x-2 pb-4 border-b">
                {/* Placeholder for user avatars */}
                {
                    blog.likes.map((user: any) => {
                        return <img key={user._id} src={user?.image || "/images/noprofile.png"} alt="User avatar" className="w-8 h-8 rounded-full" />
                    })
                }
                <span className="text-sm">{blog.likes.length} Likes • {blog.comments.length} Comments</span>
            </div>
            <div className="mt-4 flex space-x-4 pb-4 border-b">
                <LikeUnlikeButton blog={blog} likeBlogPost={likeBlogPost} isLiked={isLiked} />
                <button className="text-gray-500 flex border border-gray-500 gap-2 rounded-full py-2 px-3 items-center">
                    <span> <MessageCircleIcon size={20} /> </span> {blog.comments.length}
                </button>
            </div>
            <div className="mt-4 flex justify-between items-center pb-4 border-b">
                <button className="bg-gray-200 px-4 py-2 rounded">Previous</button>
                <button className="bg-gray-200 px-4 py-2 rounded">Next</button>
            </div>
            <div className="mt-4 pb-4 border-b">
                <h2 className="text-xl font-bold">{blog.comments.length} Comment</h2>
                <div className="mt-2 flex items-start space-x-2">
                    <img src={user.image} alt="User avatar" className="w-12 h-12 rounded-full" />
                    <textarea
                        className="flex-1 border rounded p-2"
                        placeholder="Write a comment..."
                    />
                </div>
            </div>
            <div className="mt-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-2 py-4 border-b">
                        <img src={comment.avatar} alt="User avatar" className="w-12 h-12 rounded-full" />
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="font-bold">{comment.name}</span>{' '}
                                    <span className="text-gray-500">@{comment.username}</span>{' '}
                                    <span className="text-gray-500 text-sm">{comment.date}</span>
                                </div>
                                <div className="flex space-x-2 text-gray-500">
                                    <button>Like</button>
                                    <button>Reply</button>
                                    <button>Share</button>
                                </div>
                            </div>
                            <p className="mt-2">{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <h1>BLog</h1>
    )
}

export default BlogStat