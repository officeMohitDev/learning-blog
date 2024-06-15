"use client"
import React, { useState, useEffect, FormEvent } from 'react';
import LikeUnlikeButton from '../buttons/LikeUnlikeButton';
import { MessageCircleIcon } from 'lucide-react';
import { baseURL } from '@/constants';
import { toast } from 'sonner';
import { formateBlogDate } from '@/utils/datefun';
import { formatComments } from '@/lib/utils';
import { Button } from '../ui/button';

const BlogStat = ({ blog: blogData, user }: { blog: any, user: any }) => {
    const [isLiked, setIsLiked] = useState(blogData.likes.find((like: any) => like._id === user._id));
    const [blog, setBlog] = useState(blogData);
    const [formattedComments, setFormattedComments] = useState<any[]>([]);
    const [replyBox, setReplyBox] = useState(false);
    const [topCommentId, setTopCommentId] = useState("")
    const [commentMsg, setCommentMsg] = useState("");
    const [replyMsg, setReplyMsg] = useState("")

    useEffect(() => {
        if (blog.comments) {
            const formatted = formatComments(blog.comments);
            setFormattedComments(formatted);
        }
    }, [blog]);

    const likeBlogPost = async () => {
        try {
            const res = await fetch(`${baseURL}/blog/like/${blog._id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?._id}`,
                }
            });
            if (!res.ok) {
                toast.error("Unexpected error");
            }
            const data = await res.json();
            setBlog(data.blog);
            setIsLiked(data.message === "Blog Liked" ? true : false);
            toast.success(data.message === "Blog Liked" ? "Post Liked 💘" : "Post Unliked 💔");
            return res;
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }

    };

    const sendComment = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch(`${baseURL}/comment/create/${blog._id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?._id}`,
                },
                body: JSON.stringify({
                    commentMsg,
                    pinned: false,
                    isNested: false
                })
            })
            if (res.ok) {
                toast.success("comment added");
                const data = await res.json();
                console.log("commented blog", data)
                setBlog(data.blog);
                setCommentMsg("")
            }
            return
        } catch (error) {
            console.log(error)
        }
    }
    const sendReply = async (e: FormEvent) => {
        e.preventDefault();
        if (replyMsg === "") return
        try {
            const res = await fetch(`${baseURL}/comment/create/${blog._id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?._id}`,
                },
                body: JSON.stringify({
                    topCommentId,
                    isNested: true,
                    commentMsg: replyMsg,
                    pinned: false
                })
            })
            if (res.ok) {
                toast.success("reply added");
                const data = await res.json();
                console.log("commented blog", data)
                setBlog(data.blog);
                setReplyMsg("");
                setTopCommentId("");
                setReplyBox(false);
            }
            return
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="flex items-center space-x-2 pb-4 border-b">
                {/* Placeholder for user avatars */}
                {blog.likes.map((user: any) => (
                    <img key={user._id} src={user?.image || "/images/noprofile.png"} alt="User avatar" className="w-8 h-8 rounded-full" />
                ))}
                <span className="text-sm">{blog.likes.length} Likes • {blog.comments.length} Comments</span>
            </div>
            <div className="mt-4 flex space-x-4 pb-4 border-b">
                <LikeUnlikeButton blog={blog} likeBlogPost={likeBlogPost} isLiked={isLiked} />
                <button className="text-gray-500 flex border border-gray-500 gap-2 rounded-full py-2 px-3 items-center">
                    <span> <MessageCircleIcon size={20} /> </span> {blog.comments.length}
                </button>
            </div>
            <div className="mt-4 flex justify-between items-center pb-4 border-b">
                <button className="bg-gray-200 px-4 py-2 rounded">Previous</button>
                <button className="bg-gray-200 px-4 py-2 rounded">Next</button>
            </div>
            <div className="mt-4 pb-4 border-b">
                <h2 className="text-xl font-bold">{blog.comments.length} Comment</h2>
                <div className="mt-2 flex items-start space-x-2">
                    <img src={user.image} alt="User avatar" className="w-12 h-12 rounded-full" />
                    <form className='w-full flex flex-col gap-3 items-end ml-4' onSubmit={sendComment}>
                        <textarea
                            className="flex-1 border w-full rounded p-2"
                            placeholder="Write a comment..."
                            value={commentMsg}
                            onChange={e => setCommentMsg(e.target.value)}
                        />
                        <Button type='submit' className=''>Comment</Button>
                    </form>

                </div>
            </div>
            <div className="mt-4">
                {formattedComments?.map((comment: any) => (
                    <div key={comment._id} className="flex space-x-2 py-4 border-b">
                        <img src={comment?.commentor?.image} alt="User avatar" className="w-12 h-12 rounded-full" />
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="font-bold">{comment?.commentor?.name}</span>{' '}
                                    <span className="text-gray-500">@{comment?.commentor?.username}</span>{' '}
                                    <span className="text-gray-500 text-sm">{formateBlogDate(comment?.createdAt)}</span>
                                </div>
                                <div className="flex space-x-2 text-gray-500">
                                    <button>Like</button>
                                    <button onClick={() => {
                                        setReplyBox(!replyBox);
                                        setTopCommentId(comment._id)
                                    }}>Reply</button>
                                    <button>Share</button>
                                </div>
                            </div>
                            <p className="mt-2">{comment?.comment}</p>
                            {
                                replyBox && topCommentId === comment._id && (
                                    <form className='w-full flex flex-col gap-3 items-end ml-4' onSubmit={sendReply}>
                                        <textarea
                                            className="flex-1 border w-full rounded p-2"
                                            placeholder="Write a Reply..."
                                            value={replyMsg}
                                            onChange={e => setReplyMsg(e.target.value)}
                                        />
                                        <Button type="submit">Reply</Button>
                                    </form>
                                )
                            }
                            {comment?.replies?.length > 0 && (
                                <div className="ml-1 mt-2 space-y-2">
                                    {comment?.replies?.map((reply: any) => (
                                        <div key={reply._id} className="flex space-x-2 mt-6">
                                            <img src={reply?.commentor?.image} alt="User avatar" className="w-10 h-10 rounded-full" />
                                            <div>
                                                <div>
                                                    <span className="font-bold">{reply?.commentor?.name}</span>{' '}
                                                    <span className="text-gray-500">@{reply?.commentor?.username}</span>{' '}
                                                    <span className="text-gray-500 text-sm">{formateBlogDate(reply?.createdAt)}</span>
                                                </div>
                                                <p className="mt-1">{reply?.comment}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogStat;
