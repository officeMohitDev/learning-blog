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
    <div className="relative">
        <img className="w-full h-full object-cover rounded-lg" src={image} alt={title} />
        <div className="absolute bottom-4 left-4 text-white text-lg font-bold">
            {title} ({count})
        </div>
    </div>
);

const TagsPage = () => (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">Tags</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {tags.map((tag, index) => (
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