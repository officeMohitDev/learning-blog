import React from 'react'

const ContactPage = () => {
    return (
        <div className="max-w-[45rem] mx-auto p-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Contact</h1>
            <p className="text-lg mb-8">
                Explore Kahi Suni for captivating blog posts, juicy gossips, heartfelt rants, and candid confessions. Join our vibrant community and share your voice today!
            </p>
            <form>
                <div className="mb-4 text-left">
                    <label htmlFor="name" className="block mb-2 font-bold">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4 text-left">
                    <label htmlFor="email" className="block mb-2 font-bold">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4 text-left">
                    <label htmlFor="message" className="block mb-2 font-bold">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        className="w-full p-2 border border-gray-300 rounded h-32"
                    ></textarea>
                </div>
                <div className='flex w-full justify-start'>

                    <button
                        type="submit"
                        className="bg-[#000C2D] hover:bg-[#E71319] text-white py-2 px-6 rounded-full"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ContactPage