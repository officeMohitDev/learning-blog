export const tags = [
    {
        id: 1,
        name: "Rant",
        path: "/rant"
    },
    {
        id: 2,
        name: "Gossip",
        path: "/gossip"
    },
    {
        id: 3,
        name: "Stories",
        path: "/stories"
    },
    {
        id: 4,
        name: "Community",
        path: "/community"
    },
    {
        id: 5,
        name: "Buzz",
        path: "/buzz"
    },
    {
        id: 6,
        name: "Confessions",
        path: "/confessions"
    },
    {
        id: 7,
        name: "Personal",
        path: "/personal"
    },
    {
        id: 8,
        name: "Experiences",
        path: "/experiences"
    }
];

export const links = [
    { id: "home-link", href: "/", text: "Home" },
    { id: "about-link", href: "/about", text: "About" },
    { id: "contact-link", href: "/contact", text: "Contact" },
    { id: "authors-link", href: "/authors", text: "Authors" },
    { id: "tags-link", href: "/tags", text: "Tags" },
    { id: "signin-link", href: "/signin", text: "Log In" }
];


export const baseURL = process.env.BASE_URL