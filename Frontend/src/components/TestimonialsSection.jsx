import React from 'react'
import { Star, Quote } from 'lucide-react'

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer",
      image: "/api/placeholder/60/60",
      rating: 4,
      text: "Online Identity made creating my portfolio incredibly easy! The templates are modern and the deployment feature is a game-changer."
    },
    {
      name: "Muhammad Arslan",
      role: "Electrical Engineer",
      image: "/api/placeholder/60/60",
      rating: 5,
      text: "I love how quickly I can iterate on designs. The platform is really helpful for non-developers to create their online identity."
    },
    {
      name: "Emily Rodriguez",
      role: "Full Stack Developer",
      image: "/api/placeholder/60/60",
      rating: 5,
      text: "The one-click deployment saved me hours of work. My portfolio was live in minutes, not days!"
    }
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied creators who've built amazing portfolios
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="relative mb-6">
                <Quote className="w-8 h-8 text-purple-600 dark:text-purple-400 opacity-50 absolute -top-2 -left-2" />
                <p className="text-gray-700 dark:text-gray-300 italic pl-6">
                  "{testimonial.text}"
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
