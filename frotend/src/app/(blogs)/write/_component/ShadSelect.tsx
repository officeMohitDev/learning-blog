"use client"
import React from 'react';
import MultipleSelector, { Option } from './MultiSelector';

const OPTIONS: Option[] = [
    { label: 'nextjs', value: 'nextjs' },
    { label: 'React', value: 'react' },
    { label: 'Remix', value: 'remix' },
    { label: 'Vite', value: 'vite' },
    { label: 'Nuxt', value: 'nuxt' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Angular', value: 'angular' },
    { label: 'Ember', value: 'ember', disable: true },
    { label: 'Gatsby', value: 'gatsby', disable: true },
    { label: 'Astro', value: 'astro' },
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
                placeholder="Type something that does not exist in dropdowns..."
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
