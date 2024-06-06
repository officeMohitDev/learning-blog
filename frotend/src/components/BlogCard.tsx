import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogCard = () => {
    return (
        <Link href={"/"} className='max-w-[40rem] rounded-lg flex flex-col bg-white shadow-lg'>
            <div className='w-full h-[300px] rounded-lg'>
                <img src={"/images/blogHero.jpg"} className='w-full rounded-tr rounded-tl h-[300px] object-cover' alt='hero' />
            </div>
            <div className='flex flex-col gap-2 px-6 py-7'>
                <div className='flex gap-3'>
                    <p className='text-[12px]'>William James</p>
                    <div className='w-[0.1px] bg-gray-600 h-full'></div>
                    <p className='text-[12px]'> 16 oct 2019</p>
                    <div className='w-[0.2px] bg-gray-600 h-full'></div>
                    <p className='text-[12px] text-green-400'> Members</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <h1 className='text-xl font-bold text-[#000C2D]'>Scaling Design from Tech Companies</h1>
                    <p className='text-[15px]'>
                        Accessibility is something I wasn’t taking seriously before and was just reading some bits here and there without understanding and seeing the big picture.
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard