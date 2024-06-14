import { formateBlogDate } from '@/utils/datefun'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogCard = ({ blog }: { blog: any }) => {
    return (
        <Link href={`/blog/${blog._id}`} className='rounded-lg flex flex-col bg-white shadow-lg'>
            <div className='w-full h-[300px] rounded-lg'>
                <img src={blog.posterImg} className='w-full rounded-tr rounded-tl h-[300px] object-cover' alt='hero' />
            </div>
            <div className='flex flex-col gap-2 px-6 py-7'>
                <div className='flex gap-3'>
                    <p className='text-[12px]'>{blog?.author?.username}</p>
                    <div className='w-[0.1px] bg-gray-600 h-full'></div>
                    <p className='text-[12px]'>{formateBlogDate(blog?.author?.createdAt)}</p>
                    <div className='w-[0.2px] bg-gray-600 h-full'></div>
                    <p className='text-[12px] text-green-400'>Author</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <h1 className='text-xl font-bold text-[#000C2D]'>{blog.title}</h1>
                    <p className='text-[15px]'>
                        {blog.subTitle.slice(0, 100)}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard