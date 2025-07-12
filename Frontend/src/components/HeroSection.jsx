import React from 'react'

const HeroSection = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Portfola
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Create you portfolio with ease.
        </p>
        <a
          href="/designs"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Explore Designs
        </a>
      </div>
    </div>
  )
}

export default HeroSection