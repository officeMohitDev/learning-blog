import { getCurrentUser } from '@/actions'
import BlogContent from '@/components/blog/BlogContent'
import BlogStat from '@/components/blog/BlogStat'
import LikeUnlikeButton from '@/components/buttons/LikeUnlikeButton'
import Footer from '@/components/shared/Footer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { baseURL } from '@/constants'
import { formateBlogDate } from '@/utils/datefun'
import { HeartIcon, MessageCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
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




const SingleBlogPage = async ({ params }: { params: { slug: string } }) => {
    const [blog, user] = await Promise.all([
        await fetchSingleBlogData(params.slug),
        await getCurrentUser()
    ])


    return blog ? (
        <div className='w-full'>
            <div className='w-full flex flex-col gap-7 md:px-24 md:mt-6'>
                <div className='max-w-full flex items-center justify-center rounded-lg mt-6'>
                    <img src={blog.posterImg} alt='single' className='md:w-full md:h-[500px] rounded-lg w-80 h-40 object-cover' />
                </div>
                <div className='max-w-[45rem] mx-auto flex flex-col gap-6 md:px-3'>
                    <div className='flex flex-col gap-5'>
                        <h1 className='md:text-5xl text-3xl font-bold text-[#000c2d] text-center'>{blog.title}</h1>
                        <h4 className=' text-[#4f525f] md:text-xl text-[1rem] text-center'>{blog.subTitle}</h4>
                    </div>
                    <Link href={`/profile/${blog.author.username}`} className='w-full flex justify-center items-center gap-6'>
                        <Avatar>
                            <AvatarImage src={blog.author.image || "https://github.com/shadcn.png"} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h6 className='text-gray-600 text-[14px] font-semibold'>{blog.author.name}</h6>
                        <div className='w-[0.1px] h-[20px] bg-gray-600'></div>
                        <p className='text-[14px]'>{formateBlogDate(blog.createdAt)}</p>
                    </Link>
                    <div className='mt-9 px-4 md:px-0'>
                        <BlogContent content={blog.content} />
                    </div>
                    <div>
                        <BlogStat blog={blog} user={user} />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <h1>No blog data</h1>
    )
}

export default SingleBlogPage