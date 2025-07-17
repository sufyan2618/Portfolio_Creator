// HowItWorksSection.jsx
import React from 'react'
import { Search, User, Palette, Rocket } from 'lucide-react'

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Browse Designs",
      description: "Explore our curated collection of professional portfolio templates.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Add Your Info",
      description: "Fill in your details, experience, projects, and personal information.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Customize & Preview",
      description: "Watch your information seamlessly integrate into your chosen design.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Deploy or Download",
      description: "Launch your portfolio online instantly or download the HTML code.",
      color: "from-orange-500 to-red-500"
    }
  ]

  return (
    <div className="bg-slate-800 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Create your professional portfolio in just 4 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-slate-800">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HowItWorksSection
