import BlogCard from '@/components/BlogCard';
import { Button } from '@/components/ui/button';
import { baseURL } from '@/constants'
import Link from 'next/link';
import React from 'react'
async function fetchPostsByTagName(tagName:string){
    try {
        const res = await fetch(`${baseURL}/tag/${tagName}`)
        if (!res.ok) {
            const data = await res.json()
            console.log(data);
            throw new Error("Error occured")            
        }

        const data = await res.json()
        return data
    } catch (error) {
        console.log(error);
        // throw new Error("Something went wron!")
    }
}

const TagPage = async({params}: {params: {tag: string}}) => {
    const data = await fetchPostsByTagName(params.tag)
    console.log("tag data", data);
  return (
    <div className='md:px-24 mt-6 '>
        <div>
            <h1 className='text-5xl font-bold text-center mb-8 capitalize'>{params.tag}</h1>
        </div>

          {
              data?.length ?
            data?.map((blog: any) => (
                <div key={blog._id} className="grid grid-cols-1 place-items-center md:place-items-start md:grid-cols-2 md:px-24 px-3 gap-14 bg-[#FEFEFE]">
              <BlogCard  blog={blog} />
        </div>
            )) : (
                <div className='w-full flex justify-center gap-5 items-center'>
                <h1 className='text-xl font-bold text-center capitalize'>No post for this tag</h1>
                <Button>
                    <Link href={"/tags"}>Go Back</Link>
                </Button>
                </div>
            )
          }

    </div>
  )
}

export default TagPage