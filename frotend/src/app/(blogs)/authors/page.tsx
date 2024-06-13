import { auth } from '@/auth';
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

const AuthorCard = ({ name, description, image }: { name: string, description: string, image: string }) => (
    <div className="bg-gray-100 rounded-lg p-6 flex items-center space-x-4">
        <img className="w-16 h-16 rounded-full ring-4 ring-white" src={image} alt={name} />
        <div>
            <h2 className="font-bold text-xl hover:text-[#E71319] transition duration-300 cursor-pointer">{name}</h2>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);

const AuthorsPage = async () => {
    const session = await auth()
    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-8">Authors</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {authors.map((author, index) => (
                    <AuthorCard
                        key={index}
                        name={author.name}
                        description={author.description}
                        image={author.image}
                    />
                ))}
            </div>
        </div>
    )
};

export default AuthorsPage;
