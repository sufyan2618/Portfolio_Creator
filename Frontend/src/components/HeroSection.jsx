// HeroSection.jsx
import React from 'react'
import { ArrowRight, Sparkles, Code } from 'lucide-react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-3 py-2 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">AI-Powered Portfolio Creator</span>
          </div>

          {/* Main heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Create Stunning
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Portfolios
            </span>
            <br />
            in Minutes
          </h1>

          {/* Subheading */}
          <p className="text-md lg:text-lg text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Transform your professional story into a beautiful, responsive portfolio. 
            Choose from premium designs, customize with your info, and deploy instantly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-13">
            <Link
              to="/designs"
              className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1"
            >
              <Code className="w-5 h-5" />
              Explore Designs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">5+</div>
              <div className="text-gray-400">Premium Templates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10+</div>
              <div className="text-gray-400">Portfolios Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-gray-400">User Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
