"use client"
import { baseURL } from '@/constants';
import { TrashIcon } from 'lucide-react'
import React from 'react'

const DeleteBlogButton = ({ blogId, userId }: { blogId: string; userId: String }) => {
    const handleDeleteBlog = async () => {
        try {
            console.log("ids===========", blogId, userId);
            const res = await fetch(`${baseURL}/blog/delete/${blogId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other common headers here
                    'Authorization': `Bearer ${userId}`,
                }
            });
            if (!res.ok) {
                const data = await res.json();
                throw Error(data.message || "Error while fetching Data")
            }
            const data = await res.json();
            console.log("real user", data)
            return
        } catch (error) {
            console.log(error)
            throw new Error("error")
        }
    }
    return (
        <button onClick={handleDeleteBlog} className='flex gap-2 items-center'><TrashIcon color='#EF4444' /></button>)
}

export default DeleteBlogButton