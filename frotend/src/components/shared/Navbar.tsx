"use client"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SearchIcon, SunIcon, NotebookPen } from "lucide-react"
import { usePathname } from "next/navigation"
import { links } from "@/constants"
import { getCurrentUser, getUserDetails } from "@/actions"
import { useEffect, useState } from "react"
import { User } from "next-auth"

export interface ExtendedUser extends User {
  username: string;
  location: string;
  website: string;
  about: string;
  github: string;
  twitter: string;
  instagram: string;
  medium: string;
}



export default function Navbar({ data }: { data: ExtendedUser | undefined }) {
  const [user, setUser] = useState<any>();
  const [userDB, setUserDB] = useState<any>()
  const getUser = async () => {
    const user: any = await getCurrentUser()
    console.log(user, "user comming from db")
    setUser(user)
  }


  useEffect(() => {
    getUser()
  }, [])

  console.log("userDB", data)

  const pathname = usePathname();
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 lg:px-24">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="grid gap-2 py-6">
            {
              links.map((link: any) => (
                <Link key={link.id} id={link.id} href={link.href} className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                  {link.text}
                </Link>
              ))
            }
            <button
              className="bg-transparent flex items-start justify-start -ml-4 p-3"
            >
              <NotebookPen color="black" size={20} />
            </button>
            <button
              className="bg-transparent flex items-start justify-start -ml-4 p-3 "
            >
              <SearchIcon color="black" size={20} />
            </button>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="mr-6 ml-6 hidden lg:flex lg:items-center gap-5 font-bold" prefetch={false}>
        <img src="/images/logo.png" alt="" className="w-14" />
        {/* <span className="sr-only">Acme Inc</span>
        <span className="">Kahi Suni</span> */}
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        {
          links.map((link) => {
            if (link.text === "Log In" && data) {
              return data ? (
                <Link
                  href={`/profile/${data?.username}`}
                  key={25}
                  className={`group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50`}
                  prefetch={false}
                >
                  <img className="w-8 h-8 rounded-full ring-4 ring-white" src={data?.image || "/images/noprofile.png"} alt={data.name || "image"} />
                </Link>
              ) : (
                <Link
                  href={link.href}
                  key={link.id}
                  className={`group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 ${pathname === link.href ? "bg-gray-100 text-gray-900 dark:focus:bg-gray-800 dark:focus:text-gray-50 outline-none disabled:pointer-events-none" : "bg-white disabled:opacity-50 dark:bg-gray-950"}  focus: focus:  data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50  dark:hover:bg-gray-800 dark:hover:text-gray-50   dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50`}
                  prefetch={false}
                >
                  {link.text}
                </Link>
              )
            }
            return <Link
              href={link.href}
              key={link.id}
              className={`group inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 ${pathname === link.href ? "bg-gray-100 text-gray-900 dark:focus:bg-gray-800 dark:focus:text-gray-50 outline-none disabled:pointer-events-none" : "bg-white disabled:opacity-50 dark:bg-gray-950"}  focus: focus:  data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50  dark:hover:bg-gray-800 dark:hover:text-gray-50   dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50`}
              prefetch={false}
            >
              {link.text}
            </Link>
          })
        }

        <Link
          href={"/write"}
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
        >
          <NotebookPen color="black" size={20} />
        </Link>
        <Button
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
        >
          <SearchIcon color="black" size={20} />
        </Button>
      </nav>
    </header>
  )
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}