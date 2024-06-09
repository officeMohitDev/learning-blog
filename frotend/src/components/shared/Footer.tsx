import { tags } from '@/constants';
import Link from 'next/link';
import React from 'react';





const Footer = () => {
    return (
        <footer className="bg-gray-100 py-8 md:px-24 md:mt-6 mtau">
            <div className="mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between">
                    {/* Tags */}
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-lg font-semibold mb-4">Tags</h2>
                        <ul className='flex flex-col'>
                            {
                                tags.map(tag => (

                                    <Link href={tag.path} key={tag.id} className="mb-2 text-gray-700">{tag.name}</Link>
                                ))
                            }
                        </ul>
                    </div>
                    {/* Navigation */}
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-lg font-semibold mb-4">Other Apps</h2>
                        <ul>
                            <li className="mb-2"><a href="#" className="text-gray-700">Task Manager</a></li>
                            <li className="mb-2"><a href="#" className="text-gray-700">Kahi Suni</a></li>
                            <li className="mb-2"><a href="#" className="text-gray-700">Todo</a></li>
                        </ul>
                    </div>
                    {/* Subscribe */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Subscribe</h2>
                        <form className="flex flex-col sm:flex-row">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="px-4 py-2 border border-gray-300 rounded-t-md sm:rounded-l-md sm:rounded-t-none focus:outline-none"
                            />
                            <button className="bg-red-500 text-white px-4 py-2 rounded-b-md sm:rounded-r-md sm:rounded-b-none mt-2 sm:mt-0">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 text-center text-gray-500">
                    © 2024 Kahi Suni  🌸 Made By Mohit
                </div>
            </div>
        </footer>
    );
};

export default Footer;
