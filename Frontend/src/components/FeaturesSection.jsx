// FeaturesSection.jsx
import React from 'react'
import { Eye, Download, Globe, Zap, Palette, Shield } from 'lucide-react'

const FeaturesSection = () => {
  const features = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Preview First",
      description: "Browse through our collection of stunning designs before making your choice."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Easy Customization",
      description: "Simply enter your information and watch it seamlessly integrate into your chosen design."
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Download HTML",
      description: "Get the complete HTML code of your portfolio for self-hosting or further customization."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "One-Click Deploy",
      description: "Deploy your portfolio instantly and receive your live link in seconds."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Create professional portfolios in minutes, not hours or days."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security and reliability."
    }
  ]

  return (
    <div className="bg-slate-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything You Need to
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Shine Online
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Powerful features that make creating your perfect portfolio effortless and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/80 transition-all duration-300 group hover:border-purple-500/50"
            >
              <div className="text-purple-400 mb-4 group-hover:text-purple-300 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection
