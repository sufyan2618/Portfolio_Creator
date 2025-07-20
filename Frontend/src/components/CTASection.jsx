// CTASection.jsx
import React from 'react'
import { ArrowRight, Star } from 'lucide-react'
import { Link } from 'react-router'

const CTASection = () => {
  return (
    <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Create Your
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {" "}Dream Portfolio?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of professionals who've already created stunning portfolios. 
            Start building your online presence today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/designs"
              className="group bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-4 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-yellow-500/25 transform hover:-translate-y-1"
            >
              Explore Designs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
          </div>
          
          <div className="mt-12 text-gray-400 text-sm">
            <p>✨ No credit card required • ⚡ 30-day money-back guarantee • 🚀 Deploy in seconds</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CTASection
