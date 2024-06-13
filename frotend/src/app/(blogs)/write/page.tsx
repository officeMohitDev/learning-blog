"use client";
import { Button } from '@/components/ui/button';
import React, { FormEvent, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const WritePage = () => {
    const [content, setContent] = useState("");

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown for font sizes
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
            [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
            ['link', 'image', 'video'],
            ['clean']  // remove formatting button
        ]
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("content", content);
    };

    return (
        <div className='min-h-screen md:px-24 mt-6'>
            <form onSubmit={handleSubmit}>
                <div className='h-[85vh]'>
                    {/* Ensure ReactQuill component is always visible */}
                    {typeof window !== 'undefined' && (
                        <ReactQuill
                            theme="snow"
                            value={content}
                            modules={modules}
                            onChange={setContent}
                            className='h-full border-none'
                        />
                    )}
                </div>
                <div className='mt-4'>
                    <Button type="submit">Publish</Button>
                </div>
            </form>
        </div>
    );
};

export default WritePage;
