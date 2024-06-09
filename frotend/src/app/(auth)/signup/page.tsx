"use client"
import Link from 'next/link';
import { motion } from "framer-motion"
import React, { FormEvent, useEffect, useState } from 'react'
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import '../index.css'
import GoogleButton from '@/components/GoogleButton';
import { Button } from '@/components/ui/button';
import GithubButton from '@/components/GithubButton';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { baseURL } from '@/constants';

const SignUpPage = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",

  })
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${baseURL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        // Handle response errors 

        const data = await res.json();
        console.log('Failed to submit form:', data);
        toast.error(data.errors.message || "Error while registering")
        return;
      }

      const data = await res.json();
      console.log('Server response:', data);
      router.push("/signin");
    } catch (error) {
      // Handle fetch errors
      console.error('Error submitting form:', error);
    }

    console.log("formData", formData)
  }


  return (
    <motion.div
      className="flex flex-col items-center justify-center h-fit w-full p-4"
      initial="initial"
      animate={isMounted ? "animate" : "initial"}
      variants={pageVariants}
    >
      <div className="flex items-center justify-between w-full mb-1">
        <Link href={"/"} className="text-gray-500">&larr; Back</Link>
        <button className="text-gray-500">&times;</button>
      </div>
      <div className="w-full max-w-3xl bg-white rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Kahi Suni 💮 - Register</h1>
        <p className='text-2xl font-semibold text-center'></p>
        <form onSubmit={handleSubmit} className="space-y-3 w-full ">
          <div className='flex gap-3 w-full'>
            <div className="mb-1 text-left w-full">
              <Label htmlFor="email">Name</Label>
              <Input required type="text" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="name" className='outline-none w-full' />
            </div>
            <div className="mb-1 text-left w-full">
              <Label htmlFor="email">Username</Label>
              <Input required type="text" id="username" placeholder="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className='outline-none w-full' />
            </div>
          </div>
          <div className='flex gap-3 w-full'>
            <div className="mb-1 text-left w-full">
              <Label htmlFor="email">Email</Label>
              <Input required type="email" id="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className='outline-none w-full' />
            </div>
            <div className="mb-1 text-left w-full">
              <Label htmlFor="password">Password</Label>
              <Input required type="password" id="password" placeholder="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className='outline-none w-full' />
            </div>
          </div>
          {/* <div className="flex items-center justify-center space-x-4 mb-6">
            <button
              type="button"
              className={`px-4 py-2 rounded-full ${isMonthly ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => setIsMonthly(true)}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-full ${!isMonthly ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => setIsMonthly(false)}
            >
              Yearly
            </button>
          </div> */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 text-start">
              <h2 className="text-xl font-bold text-red-600">Free</h2>
              <p className="text-2xl font-bold mt-2">$0</p>
              <p className="text-gray-600 mt-2">Free preview</p>
              <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md">Choose</button>
            </div>
            <div className="border rounded-lg p-6 text-start">
              <h2 className="text-xl font-bold text-red-600">Pro</h2>
              <p className="text-2xl font-bold mt-2">$5 <span className="text-sm text-gray-600">/month</span></p>
              <p className="text-gray-600 mt-2">Full access</p>
              <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md">Continue</button>
            </div>
          </div> */}
          <Button className='w-full hover:bg-[#DC2626] bg-[#DC2626] mt-5'>Create a account</Button>
          <p className="text-center mt-6">
            Dont have an Account? <Link href="/signin" className="text-red-600">Sign In</Link>
          </p>
        </form>
        <div className='w-full h-[0.2px] bg-gray-300 my-5'></div>
        <div className='flex items-center gap-4'>
          <GoogleButton />
          <GithubButton />
        </div>
      </div>
    </motion.div>
  )
}

export default SignUpPage