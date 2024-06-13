"use client";
import { Button } from '@/components/ui/button';
import React, { FormEvent, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { PublishBlogModal } from './_component/page';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import MultipleSelectorCreatable from './_component/ShadSelect';
import { title } from 'process';
const FRAMEWORKS = [
    {
        value: "next.js",
        key: "Next.js",
    },
    {
        value: "sveltekit",
        key: "SvelteKit",
    },
    {
        value: "nuxt.js",
        key: "Nuxt.js",
    },
    {
        value: "remix",
        key: "Remix",
    },
    {
        value: "astro",
        key: "Astro",
    },
    {
        value: "wordpress",
        key: "WordPress",
    },
    {
        value: "express.js",
        key: "Express.js",
    },
    {
        value: "nest.js",
        key: "Nest.js",
    },
]

interface BlogData {
    title: string;
    subTitle: string;
    tags: {
        value: string;
        label: string
    }[],
    content: string;
    posterImg: File | null
}

const WritePage = () => {
    const [content, setContent] = useState("");
    const [open, setOpen] = useState(false);
    const [blogData, setBlogData] = useState<BlogData>({
        title: "",
        subTitle: "",
        tags: [],
        content: "",
        posterImg: null
    })
    const editorRef: any = useRef(null);
    const log = () => {
        if (editorRef.current) {
            setContent(editorRef.current.getContent())
            console.log(editorRef.current.getContent());
        }
    };

    const handleEditorChange = (content: any, editor: any) => {
        setBlogData({ ...blogData, content: content })
        setContent(content);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("content", blogData);
    };

    const printBlogObj = () => {
        console.log("blogData", blogData)
    }




    return (
        <div className='min-h-screen flex flex-col gap-4 md:px-24 mt-6'>
            <div className='w-full justify-end flex'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive" disabled={blogData.content.length > 200 ? false : true}>Publish</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                            <DialogTitle>Add Blog</DialogTitle>
                            <DialogDescription>
                                Make changes to your Blog here. Click save when you&apos;re done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-5">
                            <div className="">
                                <Label aria-required htmlFor="name" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    required
                                    id="name"
                                    value={blogData.title}
                                    onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                                    defaultValue="Pedro Duarte"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="">
                                <Label htmlFor="subTitle" className="text-right">
                                    Subtitle
                                </Label>
                                <Input
                                    required
                                    id="subTitle"
                                    value={blogData.subTitle}
                                    onChange={(e) => setBlogData({ ...blogData, subTitle: e.target.value })}
                                    defaultValue="@peduarte"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="">
                                <Label htmlFor="posterImg" className="text-right">
                                    Poster Image
                                </Label>
                                <Input required id="posterImg" type="file" name="posterImg" onChange={e => setBlogData({ ...blogData, posterImg: e.target.files[0] })} />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="username" className="">
                                    Tags
                                </Label>
                                <MultipleSelectorCreatable setBlogData={setBlogData} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleSubmit} >Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <Editor
                apiKey='71xbw8jhvu6pctdhf63buikt62zy3fjkenx7oc1qb35st8bl'
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    selector: 'textarea#open-source-plugins',
                    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks  fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
                    editimage_cors_hosts: ['picsum.photos'],
                    menubar: 'file edit view insert format tools table help',
                    toolbar: "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
                    autosave_ask_before_unload: true,
                    autosave_interval: '30s',
                    autosave_prefix: '{path}{query}-{id}-',
                    autosave_restore_when_empty: false,
                    autosave_retention: '2m',
                    image_advtab: true,
                    link_list: [
                        { title: 'My page 1', value: 'https://www.tiny.cloud' },
                        { title: 'My page 2', value: 'http://www.moxiecode.com' }
                    ],
                    image_list: [
                        { title: 'My page 1', value: 'https://www.tiny.cloud' },
                        { title: 'My page 2', value: 'http://www.moxiecode.com' }
                    ],
                    image_class_list: [
                        { title: 'None', value: '' },
                        { title: 'Some class', value: 'class-name' }
                    ],
                    importcss_append: true,
                    file_picker_callback: (callback, value, meta) => {
                        /* Provide file and text for the link dialog */
                        if (meta.filetype === 'file') {
                            callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
                        }

                        /* Provide image and alt text for the image dialog */
                        if (meta.filetype === 'image') {
                            callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
                        }

                        /* Provide alternative source and posted for the media dialog */
                        if (meta.filetype === 'media') {
                            callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
                        }
                    },
                    height: 600,
                    image_caption: true,
                    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                    noneditable_class: 'mceNonEditable',
                    toolbar_mode: 'sliding',
                    contextmenu: 'link image table',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
                }}
                onEditorChange={handleEditorChange}
            />
            <button onClick={log}>Log editor content</button>
            <PublishBlogModal open={open} setOpen={setOpen} />
        </div>
    );
};

export default WritePage;
