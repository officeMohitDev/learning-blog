"use client"
import Link from 'next/link';
import { motion } from "framer-motion"
import React, { FormEvent, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { loginUser, loginWithGoogle } from '@/actions';
import GoogleButton from '@/components/GoogleButton';
import GithubButton from '@/components/GithubButton';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

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
      const res = await loginUser(formData);
      console.log("formdata", res)
    } catch (error) {
      // Handle fetch errors
      console.error('Error submitting form:', error);
    }

  }

  return (
    <motion.div
      initial="initial"
      animate={isMounted ? "animate" : "initial"}
      variants={pageVariants}
    >
      <div className="flex items-center justify-between w-full mb-6 px-12 mt-6">
        <Link href={"/"} className="text-gray-500">&larr; Back</Link>
        <button className="text-gray-500">&times;</button>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-4">
        <div className="w-full max-w-3xl bg-white rounded-lg p-8 flex flex-col gap-5">
          <h1 className="text-4xl font-bold text-center mb-8">Kahi Suni 💮 - Sign in</h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="mb-1 text-left">
              <label htmlFor="email" className="block mb-2 font-bold">Email</label>
              <input
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-1 text-left">
              <label htmlFor="password" className="block mb-2 font-bold">Password</label>
              <input
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <Button className='w-full hover:bg-[#DC2626] bg-[#DC2626]'>Sign In</Button>

            <p className="text-center mt-6">
              Dont have an Account? <Link href="/signup" className="text-red-600">Sign up</Link>
            </p>
          </form>
          <div className='flex gap-2'>
            <GithubButton />
            <GoogleButton />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SignInPage