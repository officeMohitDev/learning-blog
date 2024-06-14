"use client"
import { Button } from "@/components/ui/button"
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
import ShadMultiSelect from "./ShadSelect"
import MultipleSelectorCreatable from "./ShadSelect"

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

export function PublishBlogModal({ open, setOpen }: { open: boolean | undefined; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <Dialog open={open} onOpenChange={() => setOpen(false)}>

            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Add Blog</DialogTitle>
                    <DialogDescription>
                        {"// eslint-disable-next-line react/no-unescaped-entities"}
                        Make changes to your Blog here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-5">
                    <div className="">
                        <Label htmlFor="name" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="name"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="username" className="text-right">
                            Subtitle
                        </Label>
                        <Input
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="posterImg" className="text-right">
                            Poster Image
                        </Label>
                        <Input id="posterImg" type="file" name="posterImg" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="username" className="">
                            Tags
                        </Label>
                        <MultipleSelectorCreatable />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
