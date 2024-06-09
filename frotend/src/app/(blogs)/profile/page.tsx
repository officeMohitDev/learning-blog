// src/components/MediumProfile.js
import React from 'react';

const MediumProfile = () => {
  return (
    <div className='w-full'>
    <div className="mx-auto py-6 lg:px-28 px-4 lg:mt-6">
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between">
        {/* Left Column */}
        <div className="lg:w-2/3 flex flex-col gap-5">
          <h1 className="text-2xl hidden lg:block font-bold">Torsten Walbaum</h1>
          <nav className="mt-2">
            <ul className="flex space-x-4">
              <li className="text-green-500 border-b-2 border-green-500">Home</li>
              <li>About</li>
            </ul>
          </nav>
          <div className="mt-6 h-[calc(100svh-320px)] overflow-auto">
            <Article
              title="The Ultimate Guide to Making Sense of Data"
              description="Lessons from 10 years at Uber, Meta and High-Growth Startups lorem23 Lessons from 10 years at Uber, Meta and High-Growth Startups lorem23Lessons from 10  Startups lorem23"
              date="4d ago"
              views="517"
              comments="12"
              imagePlaceholder
            />
            <Article
              title="The Ultimate Guide to Making Sense of Data"
              description="Lessons from 10 years at Uber, Meta and High-Growth Startups lorem23 Lessons from 10 years at Uber, Meta and High-Growth Startups lorem23Lessons from 10  Startups lorem23"
              date="4d ago"
              views="517"
              comments="12"
              imagePlaceholder
            />
            <Article
              title="The Ultimate Guide to Making Sense of Data"
              description="Lessons from 10 years at Uber, Meta and High-Growth Startups lorem23 Lessons from 10 years at Uber, Meta and High-Growth Startups lorem23Lessons from 10  Startups lorem23"
              date="4d ago"
              views="517"
              comments="12"
              imagePlaceholder
            />
            <Article
              title="The Ultimate Guide to Making Sense of Data"
              description="Lessons from 10 years at Uber, Meta and High-Growth Startups lorem23 Lessons from 10 years at Uber, Meta and High-Growth Startups lorem23Lessons from 10  Startups lorem23"
              date="4d ago"
              views="517"
              comments="12"
              imagePlaceholder
            />
            <Article
              title="The Ultimate Guide to Making Sense of Data"
              description="Lessons from 10 years at Uber, Meta and High-Growth Startups lorem23 Lessons from 10 years at Uber, Meta and High-Growth Startups lorem23Lessons from 10  Startups lorem23"
              date="4d ago"
              views="517"
              comments="12"
              imagePlaceholder
            />
            <Article
              title="The Ultimate Guide to Making Sense of Data"
              description="Lessons from 10 years at Uber, Meta and High-Growth Startups lorem23 Lessons from 10 years at Uber, Meta and High-Growth Startups lorem23Lessons from 10  Startups lorem23"
              date="4d ago"
              views="517"
              comments="12"
              imagePlaceholder
            />
            <Article
              title="What 10 Years at Uber, Meta and Startups Taught Me About Data Analytics"
              description="Advice for Data Scientists and Managers"
              date="May 31"
              views="3.6K"
              comments="64"
              imagePlaceholder
            />
          </div>
        </div>
        {/* Right Column */}
        <div className="lg:w-1/3 lg:mt-0 lg:ml-6 lg:sticky">
          <ProfileCard />
        </div>
      </div>
    </div>
    </div>
  );
};

const Article = ({ title, description, date, views, comments, imagePlaceholder }: {title: String; description: String; date: String;  views:String; comments:String; imagePlaceholder:Boolean}) => (
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
      <img src="/images/blogHero.jpg" alt=""  className='lg:max-w-[16rem] max-w-32' />
        </div>
    )}
  </article>
);

const ProfileCard = () => (
  <div className="flex flex-col items-start lg:items-start">
    <div className="flex lg:flex-col gap-4 items-center lg:items-start">
      <div className="w-16 h-16 rounded-full bg-gray-300"></div>
      <div className="lg:mt-4 lg:mt-0 flex flex-col lg:gap-3">
        <h2 className="text-xl font-semibold">Torsten Walbaum</h2>
        <h2 className="text-[18px] text-gray-600">300 Followers</h2>
        <p className="text-gray-500  text-[15px] hidden lg:flex">Used to lead Strategy & Analytics teams at Uber, Meta and Rippling. Now writing on Medium and Substack (OperatorsHandbook.com)</p>
        <button className="mt-2 hidden px-4 py-2 lg:flex lg:justify-center bg-[#EF4444] text-white rounded-full">Follow</button>
      </div>
    </div>
    <div className="mt-6 w-full hidden lg:flex lg:flex-col">
      <h3 className="text-lg font-semibold flex gap-4">Following <span className='text-[15px] text-gray-600'>14</span> </h3>
      <ul className="mt-2 space-y-2">
        <li>Entrepreneurship Handbook</li>
        <li>Towards Data Science</li>
        <li>Tessa Xie</li>
        <li>simon rothman</li>
        <li>Greylock Perspectives</li>
      </ul>
    </div>
    <button className="mt-4 mb-3 lg:hidden w-full justify-center flex px-4 py-2 bg-green-500 text-white rounded-full">Follow</button>
  </div>
);

export default MediumProfile;
