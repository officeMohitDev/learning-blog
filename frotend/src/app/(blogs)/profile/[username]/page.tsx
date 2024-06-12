
import { auth } from '@/auth';
import LogoutButton from '@/components/LogoutButton';
import { Button } from '@/components/ui/button';
import { baseURL } from '@/constants';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const getUserDetails = async (username: string) => {
  try {
    const session = await auth()
    const res = await fetch(`${baseURL}/user/details/${username}`);
    if (!res.ok) {
      const data = await res.json();
      throw Error(data.message || "Error while fetching Data")
    }
    const data = await res.json();
    console.log(data)
    return { data, loggedInUser: session?.user?.email === data.email }
  } catch (error) {
    throw new Error("error")
  }
}

const MediumProfile = async ({ params }: { params: { username: string } }) => {
  const data = await getUserDetails(params.username)
  console.log("data in medium", data)
  return (
    <div className='w-full'>
      <div className="mx-auto py-6 lg:px-28 px-4 lg:mt-6">
        <div className="flex flex-col-reverse lg:flex-row lg:justify-between">
          {/* Left Column */}
          <div className="lg:w-2/3 flex flex-col gap-5">
            <h1 className="text-2xl hidden lg:block font-bold">{data?.data?.username}</h1>
            <nav className="mt-2">
              <ul className="flex space-x-4">
                <li className="text-green-500 border-b-2 border-green-500">Home</li>
                <li>About</li>
              </ul>
            </nav>
            <div className="mt-6 h-[calc(100svh-320px)] overflow-auto">
              {
                data?.data?.savedPosts?.length ?
                  data?.data.savedPosts?.map((post: any) => (
                    <Article
                      key={post}
                      title="The Ultimate Guide to Making Sense of Data"
                      description="Lessons from 10 years at Uber, Meta and High-Growth Startups lorem23 Lessons from 10 years at Uber, Meta and High-Growth Startups lorem23Lessons from 10  Startups lorem23"
                      date="4d ago"
                      views="517"
                      comments="12"
                      imagePlaceholder
                    />
                  )) : (
                    <h1>No Posts to display</h1>
                  )
              }
            </div>
          </div>
          {/* Right Column */}
          <div className="lg:w-1/3 lg:mt-0 lg:ml-6 lg:sticky">
            <ProfileCard data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Article = ({ title, description, date, views, comments, imagePlaceholder }: { title: String; description: String; date: String; views: String; comments: String; imagePlaceholder: Boolean }) => (
  <article className="mb-8 flex justify-between">
    <div className='max-w-[50rem] flex flex-col justify-between'>
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600 text-[16px]">{description}</p>
      </div>
      <div className="flex items-center text-gray-500 mt-2 space-x-4">
        <span>{date}</span>
        <span>{views}</span>
        <span>{comments}</span>
      </div>
    </div>
    {imagePlaceholder && (
      <div className='p-4'>
        <img src="/images/blogHero.jpg" alt="" className='lg:max-w-[16rem] max-w-32' />
      </div>
    )}
  </article>
);

const ProfileCard = ({ data }: { data: any }) => (
  <div className="flex  flex-col items-start lg:items-start">
    <div className="flex lg:flex-col gap-4 items-center lg:items-start">
      <img src={data?.data?.image} className='w-16 h-16 rounded-full' alt="" />
      <div className="lg:mt-4 lg:mt-0 flex flex-col lg:gap-3">
        <h2 className="text-xl font-semibold">{data?.data?.name}</h2>
        <h2 className="text-[18px] text-gray-600">{data?.data?.followers?.length} Followers</h2>
        <div className=' max-w-[400px]'>
          <p className="text-gray-500 text-[15px] hidden lg:flex">{data?.data?.about}</p>
        </div>
        <div className='flex gap-4 w-full'>
          {
            data?.loggedInUser ? (
              <>
                <Link href='/profile/edit' className='w-full'>
                  <Button variant={'outline'} className="hidden w-full lg:flex lg:justify-center ">Edit Profile</Button>
                </Link>
                <LogoutButton mobile={false} />
              </>
            ) : (
              <Button className="hidden w-full lg:flex lg:justify-center bg-[#EF4444] hover:bg-[#EF4444]/80 text-white">Follow</Button>
            )
          }
        </div>
      </div>
    </div>
    <div className="mt-6 w-full hidden lg:flex lg:flex-col">
      <h3 className="text-lg font-semibold flex gap-4">Following <span className='text-[15px] text-gray-600'>{data?.data?.followers?.length}</span> </h3>
      <ul className="mt-2 space-y-2">
        {
          data?.data?.followers?.map((follower: any) => (
            <li key={follower} className='flex gap-2 justify-between items-center'>
              <div className='flex gap-3 items-center'>
                <div>
                  <img src={data.data.image} className='w-6 h-6 rounded-full' alt="" />
                </div>
                <p className='text-[10px]'>Moht rah</p>
              </div>
              <button className=''>
                <MoreHorizontal size={20} />
              </button>
            </li>
          ))
        }
      </ul>
    </div>
    {
      data?.loggedInUser ? (
        <div className='flex gap-4 mt-6 w-full'>
          <Link href='/profile/edit' className='w-full'>
            <Button variant={'outline'} className="flex md:hidden w-full lg:hidden lg:justify-center ">Edit Profile</Button>
          </Link>
          <LogoutButton mobile={true} />
        </div>
      ) : (
        <Button className="flex mt-6 w-full lg:hidden md:hidden lg:justify-center bg-[#EF4444] hover:bg-[#EF4444]/80 text-white">Follow</Button>
      )
    }
  </div>
);

export default MediumProfile;
