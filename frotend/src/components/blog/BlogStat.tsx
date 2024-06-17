"use client"
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import LikeUnlikeButton from '../buttons/LikeUnlikeButton';
import { Bookmark, HeartIcon, MessageCircleIcon, MoreHorizontalIcon, MoreVerticalIcon, ThumbsUp } from 'lucide-react';
import { baseURL } from '@/constants';
import { toast } from 'sonner';
import { formateBlogDate } from '@/utils/datefun';
import { formatComments } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { getCurrentUser } from '@/actions';

const BlogStat = ({ blog: blogData, user: userData }: { blog: any, user: any }) => {
    const [user, setUser] = useState(userData)
    const [isLiked, setIsLiked] = useState(user ? blogData.likes.find((like: any) => like._id === user._id) : false);
    const [blog, setBlog] = useState(blogData);
    const [formattedComments, setFormattedComments] = useState<any[]>([]);
    const [replyReplyBox, setReplyReplyBox] = useState(false)
    const [loaderReply, setLoaderReply] = useState(false)
    const [loaderComment, setLoaderComment] = useState(false);
    const [replyerUsername, setReplyerUsername] = useState("")
    const [repliedCommentId, setRepliedCommentId] = useState("");
    const [topComment, setTopComment] = useState("")
    const [loaderLike, setLoaderLike] = useState(false)
    const [replyBox, setReplyBox] = useState(false);
    const [loaderLikeComment, setLoaderLikeComment] = useState(false)
    const [topCommentId, setTopCommentId] = useState("")
    const [commentMsg, setCommentMsg] = useState("");
    const [replyMsg, setReplyMsg] = useState("");
    const [replyId, setReplyId] = useState("");
    const [loaderSavedPost, setLoaderSavedPost] = useState(false)
    const replyBoxRef = useRef<HTMLFormElement | null>(null); // Create a ref for the reply box
    const replyReplyBoxRef = useRef<HTMLFormElement | null>(null); // Create a ref for the reply box

    // Function to handle clicks outside the reply box
    const handleClickOutside = (event: MouseEvent) => {
        if (replyBoxRef.current && !replyBoxRef.current.contains(event.target as Node)) {
            setReplyBox(false);
        }
    };
    const replyclickOutside = (event: MouseEvent) => {
        if (replyReplyBoxRef.current && !replyReplyBoxRef.current.contains(event.target as Node)) {
            setReplyReplyBox(false);
        }
    };

    useEffect(() => {
        if (replyBox) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [replyBox]);

    useEffect(() => {
        if (replyReplyBox) {
            document.addEventListener('mousedown', replyclickOutside);
        } else {
            document.removeEventListener('mousedown', replyclickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', replyclickOutside);
        };
    }, [replyReplyBox]);

    // fetch blogs
    const fetchSingleBlogData = async (id: string) => {
        try {
            const res = await fetch(`${baseURL}/blog/${id}`, { cache: "no-store" });
            if (!res.ok) {
                const data = await res.json()
                console.log(data)
                toast.error("Something went wrong")
                return null
            }

            const data = await res.json()
            setBlog(data)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (blog.comments) {
            const formatted = formatComments(blog.comments);
            setFormattedComments(formatted);
        }
    }, [blog]);

    console.log("blogdata", formattedComments);

    const likeBlogPost = async () => {
        setLoaderLike(true)
        if (!user) {
            toast.error("You need to log in to like this post.");
            return;
        }
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
            console.log("like dtaa", data.blog);
            fetchSingleBlogData(blog._id);
            setIsLiked(data.message === "Blog Liked" ? true : false);
            toast.success(data.message === "Blog Liked" ? "Post Liked 💘" : "Post Unliked 💔");
            setLoaderLike(false)
            return res;
        } catch (error) {
            console.log(error);
            setLoaderLike(false)
            toast.error("Something went wrong");
        }

    };

    const sendComment = async (e: FormEvent) => {
        e.preventDefault()
        setLoaderComment(true)
        if (!user) {
            toast.error("You need to log in to comment.");
            return;
        }
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
            setLoaderComment(false)
            return
        } catch (error) {
            console.log(error)
            setLoaderComment(false)
        }
    }


    const sendReply = async (e: FormEvent) => {
        e.preventDefault();
        setLoaderReply(true)
        if (!user) {
            toast.error("You need to log in to reply.");
            return;
        }
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
                    commentMsg: `@${replyerUsername} ${replyMsg}`,
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
                setReplyReplyBox(false)
                setLoaderReply(false)
            }
            setLoaderReply(false)
            return
        } catch (error) {
            setLoaderReply(false)
            console.log(error)
        }
    }

    const likOrUnlikeComment = async (id: string) => {
        if (!user) {
            toast.error("Please login")
            return
        }
        setLoaderLikeComment(true)
        try {
            const res = await fetch(`${baseURL}/comment/like/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?._id}`,
                },
            })

            const data = await res.json();
            if (!res.ok) {
                console.log(data);
                toast.error("Error occured")
                return
            }
            fetchSingleBlogData(blog._id);
            toast.success("Comment Liked!!")
            setLoaderLikeComment(false)
            return
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!!")
            setLoaderLikeComment(false)
        }
    }

    const deleteComment = async (id: string) => {
        if (!user) {
            toast.error("Please login")
            return
        }
        try {
            const res = await fetch(`${baseURL}/comment/delete/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?._id}`,
                },
            })

            const data = await res.json();
            if (!res.ok) {
                console.log(data);
                toast.error("Error Occured")
            }

            console.log(data);
            fetchSingleBlogData(blog._id)
            toast.success("Comment deleted")
            return

        } catch (error) {
            console.log(error);
            return
        }
    }


    const addBlogTotheBookmark = async () => {
        if (!user) {
            toast.error("Please login")
            return
        }
        setLoaderSavedPost(true)

        try {
            const res = await fetch(`${baseURL}/blog/save/${blog._id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?._id}`,
                },
            });

            const data = await res.json()

            if (!res.ok) {
                toast.error("Error occured")
                console.log(data);
                return
            }

            fetchSingleBlogData(blog._id)
            const userinfo = await getCurrentUser()
            setUser(userinfo)
            setLoaderSavedPost(false)
            return

        } catch (error) {
            console.log(error);
            setLoaderSavedPost(false)
            return
        }
    }

    return (
        <div className="max-w-[56rem] mx-auto p-4">
            <div className="flex items-center space-x-2 pb-4 border-b">
                {/* Placeholder for user avatars */}
                {blog?.likes?.map((user: any) => (
                    <img key={user._id} src={user?.image || "/images/noprofile.png"} alt="User avatar" className="w-8 h-8 rounded-full" />
                ))}
                <span className="text-sm">{blog.likes.length} Likes • {blog.comments.length} Comments</span>
            </div>
            <div className="mt-4 flex space-x-4 pb-4 border-b">
                <LikeUnlikeButton loaderLike={loaderLike} blog={blog} likeBlogPost={likeBlogPost} isLiked={isLiked} />
                <button onClick={addBlogTotheBookmark} disabled={loaderSavedPost} className="text-gray-500 flex border border-gray-500 gap-2 rounded-full py-2 px-3 items-center">
                    <Bookmark size={20} fill={user?.savedPosts.includes(blog._id) ? '#EF4444' : "#fff"} color='#EF4444' />
                </button>
            </div>
            <div className="mt-4 flex justify-between items-center pb-4 border-b">
                <button className="bg-gray-200 px-4 py-2 rounded">Previous</button>
                <button className="bg-gray-200 px-4 py-2 rounded">Next</button>
            </div>
            <div className="mt-4 pb-4 border-b">
                <h2 className="text-xl font-bold">{blog.comments.length} Comment</h2>
                <div className="mt-2 flex items-start space-x-2">
                    {user ? (
                        <>
                            <img src={user.image} alt="User avatar" className="w-12 h-12 rounded-full" />
                            <form className='w-full flex flex-col gap-3 items-end ml-4' onSubmit={sendComment}>
                                <textarea
                                    className="flex-1 border w-full rounded p-2"
                                    placeholder="Write a comment..."
                                    value={commentMsg}
                                    onChange={e => setCommentMsg(e.target.value)}
                                />
                                <Button type='submit' className='' disabled={loaderComment} >Comment</Button>
                            </form>
                        </>
                    ) : (
                        <p className="text-gray-500">You need to log in to comment.</p>
                    )}
                </div>
            </div>
            <div className="mt-4">
                {formattedComments?.map((comment: any) => (
                    <div key={comment._id} className="flex space-x-2 py-4 border-b">
                        <img src={comment?.commentor?.image} alt="User avatar" className="w-12 h-12 rounded-full" />
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <div>
                                    <Link href={`/profile/${comment?.commentor?.username}`} className="font-bold hover:text-[#EF4444]">{comment?.commentor?.name}</Link>{' '}
                                    <span className="text-gray-500">@{comment?.commentor?.username}</span>{' '}
                                    <span className="text-gray-500 text-sm">{formateBlogDate(comment?.createdAt)}</span>
                                </div>
                                {
                                    (user?._id === comment?.commentor._id || user?._id === blog?.author?._id) && (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button><MoreVerticalIcon /> </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-fit flex flex-col gap-3">
                                                {
                                                    user?._id === comment?.commentor?._id && (
                                                        <Button variant={"secondary"}>Edit</Button>
                                                    )
                                                }
                                                <Button onClick={() => deleteComment(comment?._id)} variant={"destructive"}>Delete</Button>
                                            </PopoverContent>
                                        </Popover>
                                    )
                                }
                            </div>
                            <p className="">{comment?.comment}</p>
                            <div className="flex space-x-2 text-gray-500">
                                <div className='flex items-center gap-2'>
                                    <button disabled={loaderLikeComment} onClick={() => likOrUnlikeComment(comment._id)}>
                                        {
                                            comment?.likes?.find((like: any) => like === user?._id) ? (
                                                <HeartIcon fill='#EF4444' color='#EF4444' />
                                            ) :
                                                <HeartIcon fill='#fff' color='#000' />
                                        }
                                    </button>
                                    <span>{comment?.likes?.length}</span>
                                </div>

                                {user ? (
                                    <button onClick={() => {
                                        setReplyBox(!replyBox);
                                        setTopCommentId(comment._id);
                                        setTopComment(comment._id);
                                        setReplyerUsername(comment?.commentor?.username)
                                    }}>Reply</button>
                                ) : (
                                    <button onClick={() => toast.error("You need to log in to reply.")}>Reply</button>
                                )}
                            </div>
                            {
                                (replyBox && topComment === comment._id) && (
                                    <form ref={replyBoxRef} className='w-full flex flex-col gap-3 items-end ml-4' onSubmit={sendReply}>
                                        <textarea
                                            className="flex-1 border w-full rounded p-2"
                                            placeholder="Write a Reply..."
                                            value={replyMsg}
                                            onChange={e => setReplyMsg(e.target.value)}
                                        />
                                        <Button type="submit" disabled={loaderReply} >Reply</Button>
                                    </form>
                                )
                            }
                            {comment?.replies?.length > 0 && (
                                <div className="ml-1 mt-2 space-y-2">
                                    {comment?.replies?.map((reply: any) => (
                                        <div key={reply._id} className="flex w-full space-x-2 mt-6">
                                            <img src={reply?.commentor?.image} alt="User avatar" className="w-10 h-10 rounded-full" />
                                            <div className='w-full'>
                                                <div className='flex justify-between w-full items-center'>
                                                    <div>
                                                        <Link href={`/profile/${reply?.commentor?.username}`} className="font-bold hover:text-[#EF4444]" >{reply?.commentor?.name}</Link>{' '}
                                                        <span className="text-gray-500">@{reply?.commentor?.username}</span>{' '}
                                                        <span className="text-gray-500 text-sm">{formateBlogDate(reply?.createdAt)}</span>
                                                    </div>
                                                    {
                                                        (user?._id === reply?.commentor._id || user?._id === blog?.author?._id) && (
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <button><MoreVerticalIcon /> </button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-fit flex flex-col gap-3">
                                                                    {
                                                                        user?._id === comment?.commentor._id && (
                                                                            <Button variant={"secondary"}>Edit</Button>
                                                                        )
                                                                    }
                                                                    <Button onClick={() => deleteComment(reply?._id)} variant={"destructive"}>Delete</Button>
                                                                </PopoverContent>
                                                            </Popover>
                                                        )
                                                    }

                                                </div>
                                                <p className="mt-1">{reply?.comment}</p>
                                                <div className='flex gap-3 mt-2 items-center'>
                                                    <div className='flex items-center gap-2'>
                                                        <button disabled={loaderLikeComment} onClick={() => likOrUnlikeComment(reply._id)}>
                                                            {
                                                                reply?.likes?.find((like: any) => like === user?._id) ? (
                                                                    <HeartIcon fill='#EF4444' color='#EF4444' />
                                                                ) :
                                                                    <HeartIcon fill='#fff' color='#000' />
                                                            }
                                                        </button>
                                                        <span>{reply?.likes?.length}</span>
                                                    </div>
                                                    <button onClick={() => {
                                                        setReplyReplyBox(!replyReplyBox);
                                                        setReplyId(reply?._id)
                                                        setTopCommentId(comment?._id)
                                                        setReplyerUsername(reply?.commentor?.username)

                                                    }}>Reply</button>
                                                </div>
                                                {
                                                    (replyReplyBox && replyId === reply?._id) && (
                                                        <form ref={replyReplyBoxRef} className='w-full flex flex-col gap-3 items-end ml-4' onSubmit={sendReply}>
                                                            <textarea
                                                                className="flex-1 border w-full rounded p-2"
                                                                placeholder="Write a Reply..."
                                                                value={replyMsg}
                                                                onChange={e => setReplyMsg(e.target.value)}
                                                            />
                                                            <Button type="submit" disabled={loaderReply} >Reply</Button>
                                                        </form>
                                                    )
                                                }
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
