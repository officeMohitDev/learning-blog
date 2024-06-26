"use client"
import React from 'react';
import MultipleSelector, { Option } from './MultiSelector';

const OPTIONS: Option[] = [
    { label: 'Confession', value: 'confession' },
    { label: 'Community', value: 'community' },
    { label: 'Rant', value: 'rant' },
    { label: 'Buzz', value: 'buzz' },
    { label: 'Gossip', value: 'gossip' },
    { label: 'Stories', value: 'stories' },
    { label: 'Experience', value: 'experience' },
];

const MultipleSelectorCreatable = ({ setBlogData }: { setBlogData: any }) => {

    const getActualValues = (obj: any[]) => {
        const values = obj.map((item: any) => item.value);

        // Assuming 'setBlogData' is a setter function for your state 'blogData'
        setBlogData((prev: any) => ({
            ...prev,
            tags: values // Assign the array of strings to the 'tags' field
        }));
    }

    return (
        <div className="w-full">
            <MultipleSelector
                defaultOptions={OPTIONS}
                className='w-full'
                onChange={(e) => getActualValues(e)}
                placeholder="Select Tags"
                creatable
                emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                    </p>
                }
            />
        </div>
    );
};

export default MultipleSelectorCreatable;
