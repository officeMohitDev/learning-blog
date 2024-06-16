import Link from 'next/link';
import React from 'react';

const tags = [
    {
        title: 'Community',
        count: 7,
        image: '/images/community.jpeg',
    },
    {
        title: 'Rant',
        count: 6,
        image: '/images/rant.jpeg',
    },
    {
        title: 'Gossip',
        count: 4,
        image: '/images/gossip.jpeg',
    },
    {
        title: 'Stories',
        count: 4,
        image: '/images/stories.jpeg',
    },
    {
        title: 'Experience',
        count: 4,
        image: '/images/experience.jpeg',
    },
    {
        title: 'Confession',
        count: 3,
        image: '/images/confession.jpeg',
    },
];

const TagCard = ({ title, count, image }: { title: string, count: number, image: string }) => (
    <Link href={`/tags/${title.toLowerCase()}`} className="relative">
        <img className="w-full h-full object-cover rounded-lg" src={image} alt={title} />
        <div className="absolute bottom-4 left-4 text-white text-lg font-bold">
            {title} ({count})
        </div>
    </Link>
);

const TagsPage = () => (
    <div className="max-w-full mx-auto py-12 px-4 sm:px-6 lg:px-24">
        <h1 className="text-4xl font-bold text-center mb-8">Tags</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {tags?.map((tag, index) => (
                <TagCard
                    key={index}
                    title={tag.title}
                    count={tag.count}
                    image={tag.image}
                />
            ))}
        </div>
    </div>
);

export default TagsPage;
