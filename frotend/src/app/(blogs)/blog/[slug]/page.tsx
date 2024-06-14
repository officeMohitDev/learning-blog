import BlogContent from '@/components/blog/BlogContent'
import Footer from '@/components/shared/Footer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { baseURL } from '@/constants'
import { formateBlogDate } from '@/utils/datefun'
import { HeartIcon, MessageCircleIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { toast } from 'sonner'

const fetchSingleBlogData = async (id: string) => {
    try {
        const res = await fetch(`${baseURL}/blog/${id}`, { cache: "no-store" });
        if (!res.ok) {
            const data = await res.json()
            console.log(data)
            toast.error("Something went wrong")
            return null
        }

        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

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

const SingleBlogPage = async ({ params }: { params: { slug: string } }) => {
    const blog = await fetchSingleBlogData(params.slug)

    return blog ? (
        <div className='w-full'>
            <div className='w-full flex flex-col gap-7 md:px-24 md:mt-6'>
                <div className='max-w-full  flex items-center justify-center rounded-lg mt-6'>
                    <img src={blog.posterImg} alt='single' className='md:w-full md:h-[500px] rounded-lg w-80 h-40 object-cover' />
                </div>
                <div className='max-w-[45rem] mx-auto flex flex-col gap-6 px-3'>
                    <div className='flex flex-col gap-5'>
                        <h1 className='md:text-5xl text-3xl font-bold text-[#000c2d] text-center'>{blog.title}</h1>
                        <h4 className=' text-[#4f525f] md:text-xl text-[1rem] text-center'>{blog.subTitle}</h4>
                    </div>
                    <div className='w-full flex justify-center items-center gap-6'>
                        <Avatar>
                            <AvatarImage src={blog.author.image || "https://github.com/shadcn.png"} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h6 className='text-gray-600 text-[14px] font-semibold'>{blog.author.name}</h6>
                        <div className='w-[0.1px] h-[20px] bg-gray-600'></div>
                        <p className='text-[14px]'>{formateBlogDate(blog.createdAt)}</p>
                    </div>
                    <div className='mt-9 px-4 md:px-0'>
                        <BlogContent content={blog.content} />
                    </div>
                    <div>
                        <div className="max-w-3xl mx-auto p-4">
                            <div className="flex items-center space-x-2 pb-4 border-b">
                                {/* Placeholder for user avatars */}
                                <img src="https://via.placeholder.com/30" alt="User avatar" className="w-8 h-8 rounded-full" />
                                <img src="https://via.placeholder.com/30" alt="User avatar" className="w-8 h-8 rounded-full" />
                                <img src="https://via.placeholder.com/30" alt="User avatar" className="w-8 h-8 rounded-full" />
                                {/* More avatars and like/restack counts */}
                                <span className="text-sm">{blog.likes.length} Likes • {blog.comments.length} Comments</span>
                            </div>
                            <div className="mt-4 flex space-x-4 pb-4 border-b">
                                <button className="text-gray-500 border border-gray-500 rounded-full py-2 px-3 flex gap-2 items-center">
                                    <span><HeartIcon size={20} /> </span>  {blog.likes.length}
                                </button>
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
                                    <img src={blog.author.image} alt="User avatar" className="w-12 h-12 rounded-full" />
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
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <h1>No blog data</h1>
    )
}

export default SingleBlogPage