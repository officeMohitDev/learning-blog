import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <div className="flex flex-col gap-6">
        <div className="flex md:flex-row flex-col justify-between items-center bg-[#EEF1F0] py-14 gap-6 md:px-24">
          <div className="max-w-[700px] flex flex-col gap-4 px-7">
            <h1 className="md:text-5xl text-3xl font-bold">Welcome to Kahi Suni</h1>
            <h1 className="md:text-4xl text-xl font-bold">Rant. Gossip. Connect.</h1>
            <p className="text-xl text-gray-700">Dive into a community where every voice is heard and every story matters.</p>
          </div>
          <div className="px-6">
            <img src={"/images/heroImg.png"} className="md:w-full md:h-full w-96 h-auto" alt="hero" />
          </div>
        </div>
        <div className="flex gap-4 px-6 md:px-24 flex-wrap">
          <Link href={"/"} className="hover:text-red-700 transition ease-in duration-200">Rant</Link>
          <Link href={"/"} className="hover:text-red-700 transition ease-in duration-200">Gossip</Link>
          <Link href={"/"} className="hover:text-red-700 transition ease-in duration-200">Stories</Link>
          <Link href={"/"} className="hover:text-red-700 transition ease-in duration-200">Community</Link>
          <Link href={"/"} className="hover:text-red-700 transition ease-in duration-200">Buzz</Link>
          <Link href={"/"} className="hover:text-red-700 transition ease-in duration-200">Confessions</Link>
          <Link href={"/"} className="hover:text-red-700 transition ease-in duration-200">Personal</Link>
          <Link href={"/"} className="hover:text-red-700 transition ease-in duration-200">Experiences</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 place-items-center md:place-items-start lg:grid-cols-3 md:px-24 px-3 gap-14 bg-[#FEFEFE]">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  );
}
