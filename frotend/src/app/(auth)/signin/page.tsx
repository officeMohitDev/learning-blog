"use client"
import Link from 'next/link';
import { motion } from "framer-motion"
import React, { useEffect, useState } from 'react'

const SignInPage = () => {
  const [isMonthly, setIsMonthly] = useState(true);
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

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen w-full p-4"
      initial="initial"
      animate={isMounted ? "animate" : "initial"}
      variants={pageVariants}
    >
      <div className="flex items-center justify-between w-full mb-6">
        <Link href={"/"} className="text-gray-500">&larr; Back</Link>
        <button className="text-gray-500">&times;</button>
      </div>
      <div className="w-full max-w-3xl bg-white rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Kahi Suni 💮</h1>
        <form className="space-y-3">
          <div className="mb-1 text-left">
            <label htmlFor="email" className="block mb-2 font-bold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-1 text-left">
            <label htmlFor="email" className="block mb-2 font-bold">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-center space-x-4 mb-6">
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
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 text-start">
              <h2 className="text-xl font-bold text-red-600">Free</h2>
              <p className="text-2xl font-bold mt-2">$0</p>
              <p className="text-gray-600 mt-2">Free preview</p>
              <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md">Choose</button>
            </div>
            <div className="border rounded-lg p-6 text-start">
              <h2 className="text-xl font-bold text-red-600">Penang</h2>
              <p className="text-2xl font-bold mt-2">$5 <span className="text-sm text-gray-600">/month</span></p>
              <p className="text-gray-600 mt-2">Full access</p>
              <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md">Continue</button>
            </div>
          </div>
          <p className="text-center mt-6">
            Dont have an Account? <Link href="/signup" className="text-red-600">Sign up</Link>
          </p>
        </form>
      </div>
    </motion.div>
  )
}

export default SignInPage