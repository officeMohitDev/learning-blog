
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
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import React, { FormEvent, useState } from 'react'



interface FormData {
    username: string;
    name: string;
    role: string;
    location: string;
    date?: Date;
    about: string;
    github: string;
    linkedin: string;
    medium: string;
    instagram: string;
    twitter: string;
    website: string;
}



const UserEdirForm = ({ data }: { data: any }) => {
    const [date, setDate] = useState<Date>();
    const { } = data
    const [formData, setFormData] = useState<FormData>({
        username: data?.username,
        name: data?.name,
        role: data?.role,
        location: data?.location,
        date: data?.date,
        about: data?.about,
        github: data?.socialLinks?.github,
        linkedin: data?.socialLinks?.linkedin,
        medium: data?.socialLinks?.medium,
        instagram: data?.socialLinks?.instagram,
        twitter: data?.socialLinks?.twitter,
        website: data?.website
    })

    console.log("data", data)

    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();
        try {
            console.log("formData", formData)
        } catch (error) {

        }
    }


    return (
        <div className='lg:px-28 px-4 flex gap-4'>
            <div className='flex-[2] mt-6 px-5 flex flex-col gap-3'>
                <Button className='bg-transparent text-black hover:bg-gray-300 items-center justify-start'>Profile</Button>
                <Button className='bg-transparent text-black hover:bg-gray-300 items-center justify-start'>Account</Button>
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
                                <Input value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
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
                                <Select onValueChange={(e) => setFormData({ ...formData, role: e })}>
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
                            <Popover>
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
                                        mode="single"
                                        selected={formData.date}
                                        onSelect={(e) => setFormData({ ...formData, date: e })}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

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
                                <Input value={formData.github} onChange={(e) => setFormData({ ...formData, github: e.target.value })} />
                            </div>
                            <div>
                                <Label>Instagram</Label>
                                <Input value={formData.instagram} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} />
                            </div>
                            <div>
                                <Label>Twitter</Label>
                                <Input value={formData.twitter} onChange={(e) => setFormData({ ...formData, twitter: e.target.value })} />
                            </div>
                            <div>
                                <Label>Linkedin</Label>
                                <Input value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} />
                            </div>
                            <div>
                                <Label>Medium</Label>
                                <Input value={formData.medium} onChange={(e) => setFormData({ ...formData, medium: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <Button variant={"destructive"}>Save Changes</Button>
                </form>
            </div>
        </div>
    )
}

export default UserEdirForm