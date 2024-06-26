
import { auth } from '@/auth';
import LogoutButton from '@/components/LogoutButton';
import DeleteBlogButton from '@/components/buttons/DeleteBlogButton';
import FollowButton from '@/components/buttons/FollowButton';
import { Button } from '@/components/ui/button';
import { baseURL } from '@/constants';
import { format, formatDistanceToNow } from 'date-fns';
import { Github, GithubIcon, HeartIcon, Instagram, LinkedinIcon, MessageCircleIcon, MoreHorizontal, SignalMedium, SunMediumIcon, TrashIcon, Twitter } from 'lucide-react';
import Link from 'next/link';
import React from 'react';


interface DataFromDB {
  data: any;
  currentUser: any;
  loggedInUser: Boolean;
  blog: any
}

const getUserDetails = async (username: string) => {
  try {
    const session = await auth()
    const res = await fetch(`${baseURL}/user/details/${username}`);
    if (!res.ok) {
      const data = await res.json();
      throw Error(data.message || "Error while fetching Data")
    }
    const data = await res.json();
    return { data: data.user, loggedInUser: session?.user?.email === data.user.email, currentUser: session?.user, blog: data.blog }
  } catch (error) {
    console.log(error)
    throw new Error("error")
  }
}



const MediumProfile = async ({ params }: { params: { username: string } }) => {
  const data: DataFromDB = await getUserDetails(params.username)

  return (
    <div className='w-full'>
      <div className="mx-auto py-6 lg:px-28 px-4 lg:mt-6">
        <div className="flex flex-col-reverse lg:flex-row lg:justify-between">
          {/* Left Column */}
          <div className="lg:w-2/3 flex flex-col gap-5">
            <h1 className="text-2xl hidden lg:block font-bold">@{data?.data?.username}</h1>
            <nav className="mt-2">
              <ul className="flex space-x-4">
                <li className="text-green-500 border-b-2 border-green-500">Home</li>
                <li>About</li>
              </ul>
            </nav>
            <div className="mt-6 h-[calc(100svh-320px)] overflow-auto">
              {
                data?.blog?.length ?
                  data?.blog?.map((post: any) => (
                    <Article
                      key={post._id}
                      userId={data?.currentUser?._id}
                      id={post._id}
                      title={post.title}
                      description={post.subTitle}
                      likes={post.likes.length}
                      comments={post.comments.length}
                      img={post.posterImg}
                      createdAt={post.createdAt}
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

const Article = ({ title, description, userId, likes, comments, img, createdAt, id }: {
  title: string;
  description: string;
  likes: string | number;
  comments: string;
  img: string;
  id: string;
  userId: string
  createdAt: string;
}) => {
  // Calculate the difference between the creation date and current date
  const createdAtDate = new Date(createdAt);
  const now = new Date();
  const distanceToNow = formatDistanceToNow(createdAtDate);

  // Function to format date in dd-mm-yyyy format
  const formatDate = (date: Date) => format(date, 'dd-MM-yyyy');

  // Determine how to display the date based on its age
  const formattedDate = now.getTime() - createdAtDate.getTime() < 7 * 24 * 60 * 60 * 1000
    ? `${distanceToNow} ago`
    : formatDate(createdAtDate);

  return (
    <article className="mb-8 flex justify-between">
      <div className='max-w-[50rem] flex flex-col justify-between'>
        <div>
          <Link href={`/blog/${id}`} className="text-xl font-semibold">{title}</Link>
          <p className="text-gray-600 text-[16px]">{description}</p>
        </div>
        <div className="flex items-center text-gray-500 mt-2 space-x-4">
          <span>{formattedDate}</span> {/* Display formatted date */}
          <span className='flex gap-2 items-center'> <HeartIcon /> {likes}</span>
          <span className='flex gap-2 items-center'><MessageCircleIcon /> {comments}</span>
          <DeleteBlogButton userId={userId} blogId={id} />
        </div>
      </div>
      <div className='p-4'>
        <img src={img} alt="" className='lg:max-w-[16rem] max-w-32' />
      </div>
    </article>
  );
};
const ProfileCard = ({ data }: { data: any }) => (
  <div className="flex  flex-col items-start lg:items-start">
    <div className="flex lg:flex-col gap-4 items-center lg:items-start">
      <img src={data?.data?.image} className='w-16 h-16 rounded-full' alt="" />
      <div className="lg:mt-4 lg:mt-0 flex flex-col lg:gap-3">
        <h2 className="text-xl font-semibold">{data?.data?.name}</h2>
        <h2 className="text-[18px] text-gray-600">{data?.data?.followers?.length} Followers</h2>
        <div className=' max-w-[400px]'>
          <p className="text-gray-500 text-[15px] hidden lg:flex">{data?.data?.about?.slice(0, 120)}...</p>
        </div>
        <div className='flex gap-2 justify-between mb-4'>
          <a target='_blank' href={data?.data?.socialLinks?.linkedin} className='text-black'>
            <LinkedinIcon />
          </a>
          <a target='_blank' href={data?.data?.socialLinks?.github} className='text-black'>
            <GithubIcon />
          </a>
          <a target='_blank' href={data?.data?.socialLinks?.instagram} className='text-black'>
            <Instagram />
          </a>
          <a target='_blank' href={data?.data?.socialLinks?.twitter} className='text-black'>
            <Twitter />
          </a>
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
              <FollowButton mobile={false} data={data} />
            )
          }
        </div>
      </div>
    </div>
    <div className="mt-6 w-full hidden lg:flex lg:flex-col">
      <h3 className="text-lg font-semibold flex gap-4">Following <span className='text-[15px] text-gray-600'>{data?.data?.following?.length}</span> </h3>
      <ul className="mt-2 space-y-2">
        {
          data?.data?.following?.map((follower: any) => (
            <li key={follower} className='flex gap-2 justify-between items-center'>
              <div className='flex gap-3 items-center'>
                <div>
                  <img src={follower?.image} className='w-6 h-6 rounded-full' alt="" />
                </div>
                <Link href={`/profile/${follower?.username}`} className='text-[10px]'>{follower?.username}</Link>
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
        <FollowButton mobile={true} data={data} />
      )
    }
  </div>
);

export default MediumProfile;
