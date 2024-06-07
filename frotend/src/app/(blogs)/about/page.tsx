import React from 'react'

const AboutPage = () => {
    return (
        <div className='mx-12'>
            <div className=''>
                <div>
                    <div className=''>
                        <img src='/images/aboutImg.jpeg' className='md:h-[600px] md:w-full rounded-lg w-80 h-40 object-contain' alt='about her' />
                    </div>
                </div>
                <section className="text-center px-4 py-8 md:py-12 max-w-[45rem] mx-auto">
                    <h1 className="text-4xl font-bold mb-6">About</h1>
                    <p className="max-w-2xl mx-auto mb-6 text-lg text-gray-700">
                        Welcome to Kahi Suni, your go-to platform for sharing and discovering captivating stories from around the world. At Kahi Suni, we believe that everyone has a story to tell, and every story has the power to inspire, educate, and connect people from different walks of life.
                    </p>
                </section>

                <section className="text-center px-4 py-8 md:py-12 max-w-[45rem] mx-auto">
                    <h1 className="text-4xl font-bold mb-6">What is Kahi Suni?</h1>
                    <p className="max-w-2xl mx-auto mb-6 text-lg text-gray-700">
                        Kahi Suni is a vibrant online community where users can create, share, and explore a wide variety of content, ranging from personal anecdotes and travel experiences to in-depth articles and thought-provoking essays. Our platform provides a seamless and engaging experience for both writers and readers, fostering a space where creativity and authenticity thrive.
                    </p>

                </section>
                <section className="text-center px-4 py-8 md:py-12 max-w-[45rem] mx-auto">
                    <h1 className="text-4xl font-bold mb-6">Our Mission</h1>
                    <p className="max-w-2xl mx-auto mb-6 text-lg text-gray-700">
                        Our mission is to empower individuals to share their unique perspectives and stories with a global audience. We aim to create a diverse and inclusive community where every voice is heard and valued. By facilitating the exchange of ideas and experiences, we hope to promote understanding, empathy, and inspiration among our users.
                    </p>

                </section>
            </div>
        </div>
    )
}

export default AboutPage