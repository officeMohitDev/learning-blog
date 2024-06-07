import Footer from '@/components/shared/Footer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import React from 'react'

const SingleBlogPage = () => {
    return (
        <div className='w-full '>
            <div className='w-full flex flex-col gap-7 md:px-24 md:mt-6'>
                <div className='max-w-full  flex items-center justify-center rounded-lg mt-6'>
                    <img src='/images/blogHero.jpg' alt='single' className='md:w-full md:h-[500px] rounded-lg w-80 h-40 object-cover' />
                </div>
                <div className='max-w-[45rem] mx-auto flex flex-col gap-6 px-3'>
                    <div className='flex flex-col gap-5'>
                        <h1 className='md:text-5xl text-3xl font-bold text-[#000c2d] text-center'>Scaling Design from Tech Companies</h1>
                        <h4 className=' text-[#4f525f] md:text-xl text-[1rem] text-center'>Accessibility is something I wasn’t taking seriously before and was just reading some bits here and there without understanding and seeing the big picture.</h4>
                    </div>
                    <div className='w-full flex justify-center items-center gap-6'>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h6 className='text-gray-600 text-[14px] font-semibold'>William James</h6>
                        <div className='w-[0.1px] h-[20px] bg-gray-600'></div>
                        <p className='text-[14px]'>16 Oct 2019</p>
                    </div>
                    <div className='mt-9 px-4 md:px-0'>
                        <h3>Lorem ipsum dolor sit amet consecteturlroe Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus facilis nemo in hic voluptatum atque, quam commodi blanditiis aut, reprehenderit quisquam nobis placeat ullam ea. Magni voluptatum consectetur quis maxime.</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleBlogPage