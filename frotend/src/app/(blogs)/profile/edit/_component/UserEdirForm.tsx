
"use client"
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { PopoverContent } from '@radix-ui/react-popover'
import { CalendarIcon, CameraIcon } from 'lucide-react'
import { format } from 'date-fns'
import "./comp.css"
import React, { FormEvent, useRef, useState } from 'react'
import { baseURL } from '@/constants'
import { SampleDatePicker } from './CustomDatePicker'
import { toast } from 'sonner'

interface SocialLinks {
    github: string;
    linkedin: string;
    medium: string;
    instagram: string;
    twitter: string;
}


interface FormData {
    username: string;
    name: string;
    role: string;
    image: File | string;
    location: string;
    date?: Date;
    about: string;
    socialLinks: SocialLinks
    website: string;
}



const UserEdirForm = ({ data }: { data: any }) => {
    const [date, setDate] = useState<Date>();
    const [isLoading, setIsLoading] = useState(false)
    const filRef: any = useRef(null);

    const handleClickOnImage = () => {
        if (filRef.current) {
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            filRef.current.dispatchEvent(clickEvent);
        }
    };
    const [formData, setFormData] = useState<FormData>({
        username: data?.username,
        name: data?.name,
        image: data?.image,
        role: data?.role,
        location: data?.location,
        date: data?.date,
        about: data?.about,
        socialLinks: {
            github: data?.socialLinks?.github,
            linkedin: data?.socialLinks?.linkedin,
            medium: data?.socialLinks?.medium,
            instagram: data?.socialLinks?.instagram,
            twitter: data?.socialLinks?.twitter,
        },
        website: data?.website
    })

    const handleFileChange = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            if (!e.target.files) {
                return
            }
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: e.target.files[0], // Set the selected file as the image
            }));
        }
    };

    console.log("user data", data)

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        const formValues = new FormData();

        // Append only if the value is not undefined or null
        if (formData.username) formValues.append("username", formData.username);
        if (formData.name) formValues.append("name", formData.name);
        if (formData.image) formValues.append("userPfp", formData.image);
        if (formData.role) formValues.append("role", formData.role);
        if (formData.location) formValues.append("location", formData.location);
        if (formData.date) formValues.append("date", formData.date.toISOString());
        if (formData.about) formValues.append("about", formData.about);
        if (formData.website) formValues.append("website", formData.website);
        formValues.append("userId", data._id)

        // Handling nested socialLinks object
        if (formData.socialLinks) {
            Object.keys(formData.socialLinks).forEach((key) => {
                if (formData.socialLinks[key as keyof typeof formData.socialLinks]) {
                    formValues.append(`socialLinks[${key}]`, formData.socialLinks[key as keyof typeof formData.socialLinks]);
                }
            });
        }

        // Log the FormData using forEach
        formValues.forEach((value, key) => {
            console.log(key, value);
        });

        try {
            const res = await fetch(`${baseURL}/user/update`, {
                method: "POST",
                body: formValues, // Pass formValues as the body of the request
            });

            if (!res.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await res.json();
            console.log("Success:", result);
            toast.success("Successfully updated!!")
            setIsLoading(false)
        } catch (error) {
            console.error("Error:", error);
            setIsLoading(false);
            toast.error("Error while updating")
        }
    }

    return (
        <div className='lg:px-28 px-4 flex gap-4'>
            <div className='flex-[2] px-5 flex flex-col gap-3 items-center mt-12'>
                <div onClick={handleClickOnImage} className='relative cursor-pointer group w-24 h-24'>
                    <img src={typeof formData.image === 'string' ? formData.image : (formData.image ? URL.createObjectURL(formData.image) : '')} className='w-32 h-3w-32 object-cover rounded-full' alt="" />
                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'>
                        <CameraIcon color='white' />
                    </div>
                </div>
                <p className='text-[16px]'>Edit Profile picture</p>
                <input className='hidden' onChange={handleFileChange} ref={filRef} type="file" name="" id="" />
            </div>
            <div className='mt-6 flex-[7]'>
                <div className='space-y-2'>
                    <h1 className='text-2xl font-bold'>Profile</h1>
                    <h4 className='text-[16px]'>This is how others will see you on the site.</h4>
                </div>
                <form onSubmit={handleUpdate} className='flex flex-col gap-8 mt-5'>
                    <div className='flex gap-7'>
                        <div className='flex flex-col gap-4'>
                            <Label>Username</Label>
                            <div className='flex flex-col gap-2'>
                                <Input disabled={true} value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                                <p className="text-[14px] text-gray-600">This is your public display name. It can be your real name or a pseudonym.</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Label>Name</Label>
                            <div className='flex flex-col gap-2'>
                                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                <p className="text-[14px] text-gray-600">This is your public display name. It can be your real name or a pseudonym.</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <Label>Website</Label>
                        <div className='flex flex-col gap-2'>
                            <Input value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />
                        </div>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <div className='flex flex-col gap-4'>
                            <Label>Role</Label>
                            <div>
                                <Select defaultValue={formData.role} onValueChange={(e) => setFormData({ ...formData, role: e })}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Role</SelectLabel>
                                            <SelectItem value="user">User</SelectItem>
                                            <SelectItem value="author">Author</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className='flex flex-col w-full gap-4'>
                            <Label>Location</Label>
                            <div className='flex flex-col gap-2'>
                                <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                            </div>
                        </div>
                        <div className='flex w-full flex-col gap-4'>
                            <Label>Birth Date</Label>
                            {/* <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[280px] justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData?.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto bg-white p-0">
                                    <Calendar
                                        captionLayout="dropdown-buttons"
                                        mode="single"
                                        selected={formData.date}
                                        onSelect={(e) => setFormData({ ...formData, date: e })}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover> */}
                            <SampleDatePicker date={date as Date} setDate={setDate} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <Label>About</Label>
                        <div className='flex flex-col gap-2'>
                            <Textarea value={formData.about} onChange={(e) => setFormData({ ...formData, about: e.target.value })} />
                            <p className="text-[14px] text-gray-600">You can @mention other users and organizations to link to them.</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <Label>URLs</Label>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <Label>Github</Label>
                                <Input value={formData.socialLinks.github} onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, github: e.target.value } })} />
                            </div>
                            <div>
                                <Label>Instagram</Label>
                                <Input value={formData.socialLinks.instagram} onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, instagram: e.target.value } })} />
                            </div>
                            <div>
                                <Label>Twitter</Label>
                                <Input value={formData.socialLinks.twitter} onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, twitter: e.target.value } })} />
                            </div>
                            <div>
                                <Label>Linkedin</Label>
                                <Input value={formData.socialLinks.linkedin} onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, linkedin: e.target.value } })} />
                            </div>
                            <div>
                                <Label>Medium</Label>
                                <Input value={formData.socialLinks.medium} onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, medium: e.target.value } })} />
                            </div>
                        </div>
                    </div>
                    <Button variant={"destructive"} disabled={isLoading}>Save Changes</Button>
                </form>
            </div>
        </div>
    )
}

export default UserEdirForm