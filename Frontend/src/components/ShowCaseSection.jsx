import React from 'react'
import { ExternalLink, Star } from 'lucide-react'

const ShowcaseSection = () => {
  const showcases = [
    {
      title: "Modern Developer",
      image: "/api/placeholder/300/400",
      category: "Developer",
      rating: 4.9,
      preview: "https://example.com"
    },
    {
      title: "Creative Designer",
      image: "/api/placeholder/300/400",
      category: "Designer",
      rating: 4.8,
      preview: "https://example.com"
    },
    {
      title: "Business Executive",
      image: "/api/placeholder/300/400",
      category: "Business",
      rating: 4.9,
      preview: "https://example.com"
    },
    {
      title: "Photographer",
      image: "/api/placeholder/300/400",
      category: "Creative",
      rating: 4.7,
      preview: "https://example.com"
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Portfolio Showcase
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See what others have created with our platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {showcases.map((item, index) => (
            <div key={index} className="group bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-all">
              <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <a
                    href={item.preview}
                    className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-full font-medium inline-flex items-center gap-2 transition-opacity"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Preview
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{item.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShowcaseSection
