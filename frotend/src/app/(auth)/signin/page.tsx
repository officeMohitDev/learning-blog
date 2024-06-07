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
      initial="initial"
      animate={isMounted ? "animate" : "initial"}
      variants={pageVariants}
    >
      <div className="flex items-center justify-between w-full mb-6 px-12 mt-6">
        <Link href={"/"} className="text-gray-500">&larr; Back</Link>
        <button className="text-gray-500">&times;</button>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-4">
        <div className="w-full max-w-3xl bg-white rounded-lg p-8">
          <h1 className="text-4xl font-bold text-center mb-8">Kahi Suni 💮 - Sign in</h1>
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

            <p className="text-center mt-6">
              Dont have an Account? <Link href="/signup" className="text-red-600">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default SignInPage