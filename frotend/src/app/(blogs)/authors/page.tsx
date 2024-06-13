import { auth } from '@/auth';
import { baseURL } from '@/constants';
import Link from 'next/link';
import React from 'react';

const authors = [
    {
        name: 'Sara James',
        description: 'Author & developer of Aspire Themes. Minimalist.',
        image: '/images/smile.jpeg',
    },
    {
        name: 'Amelia Harry',
        description: 'Author & developer of Aspire Themes. Minimalist.',
        image: '/images/cute.jpeg',
    },
    {
        name: 'Olivia Thomas',
        description: 'I love creating clean and minimal websites.',
        image: '/images/hand.jpeg',
    },
    {
        name: 'Ahmad Ajmi',
        description: 'Web Developer. I Create Web Themes @aspirethemes. @envato Author.',
        image: '/images/laugh.jpeg',
    },
    {
        name: 'James Clear',
        description: 'Web Developer. I Create Web Themes @aspirethemes. @envato Author.',
        image: '/images/hand.jpeg',
    },
    {
        name: 'William James',
        description: 'Lorem ipsum dolor sit amet, sit magna iracundia consectetuer.',
        image: '/images/white.jpeg',
    },
];

const AuthorCard = ({ name, description, image, username }: { name: string, description: string, image: string, username: string }) => (
    <div className="bg-gray-100 rounded-lg p-6 flex items-center space-x-4">
        <img className="w-16 h-16 rounded-full ring-4 ring-white" src={image} alt={name} />
        <div>
            <Link href={`profile/${username}`} className="font-bold text-xl hover:text-[#E71319] transition duration-300 cursor-pointer">{name}</Link>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);

const fetchAuthors = async () => {
    try {
        const res = await fetch(`${baseURL}/user/authors`);
        const data = await res.json()
        console.log("data", data)
        return data
    } catch (error) {
        console.log(error)
    }
}

const AuthorsPage = async () => {
    const session = await auth();

    const data = await fetchAuthors()

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-8">Authors</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((author: any, index: number) => (
                    <AuthorCard
                        key={index}
                        username={author.username}
                        name={author.name}
                        description={`${author?.about?.slice(0, 30)}...`}
                        image={author.image}
                    />
                ))}
            </div>
        </div>
    )
};

export default AuthorsPage;
