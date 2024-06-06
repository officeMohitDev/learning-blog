import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center bg-[#EEF1F0] py-14 px-12">
          <div className="max-w-[700px] flex flex-col gap-4">
            <h1 className="text-5xl font-bold">Welcome to Kahi Suni</h1>
            <h1 className="text-4xl font-bold">Rant. Gossip. Connect.</h1>
            <p className="text-xl text-gray-700">Dive into a community where every voice is heard and every story matters.</p>
          </div>
          <div>
            <Image src={"/images/heroImg.png"} height={500} width={500} alt="hero" />
          </div>
        </div>
        <div className="flex gap-4 mx-12">
          <Link href={"/"} className="hover:text-red-700 transition ease-in duration-200">Rant</Link>
          <Link href={"/"} className="hover:text-red-700 transition ease-in duration-200">Gossip</Link>
          <Link href={"/"} className="hover:text-red-700 transition ease-in duration-200">Stories</Link>
          <Link href={"/"} className="hover:text-red-700 transition ease-in duration-200">Community</Link>
          <Link href={"/"} className="hover:text-red-700 transition ease-in duration-200">Buzz</Link>
          <Link href={"/"} className="hover:text-red-700 transition ease-in duration-200">Confessions</Link>
          <Link href={"/"} className="hover:text-red-700 transition ease-in duration-200">Personal</Link>
          <Link href={"/"} className="hover:text-red-700 transition ease-in duration-200">Experiences</Link>
        </div>
        <div className="grid grid-cols-2 mx-12 gap-14 bg-[#FEFEFE]">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  );
}
