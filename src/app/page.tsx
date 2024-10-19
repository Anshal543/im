import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto px-4 py-16">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Welcome to <span className="text-yellow-300">Amazing Platform</span>
        </h1>
        
        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-100 mb-10">
          Join our community and explore a world of opportunities. Connect, learn, and grow with us!
        </p>

        {/* Login Button */}
        <Link href="/login">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105">
            Login Now
          </button>
        </Link>
      </div>

      {/* Image Section */}
      {/* <div className="relative w-full h-64 md:h-80 lg:h-96">
        <Image
          src="/images/hero-image.jpg" // Replace with the path of your own image
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-xl"
        />
      </div> */}
      
      {/* Footer Section */}
      <div className="mt-16 text-center">
        <p className="text-gray-200">
          Discover new horizons with <span className="font-bold text-white">Amazing Platform</span>. 
          Let’s make things happen.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
