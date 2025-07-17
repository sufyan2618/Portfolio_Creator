// Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { 
    Sparkles, 
    Github, 
    Twitter, 
    Linkedin, 
    Instagram,
    Heart,
    ArrowUp
} from 'lucide-react'

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const currentYear = new Date().getFullYear()

    const socialLinks = [
        { name: 'GitHub', href: 'https://github.com', icon: Github },
        { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
        { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
        { name: 'Instagram', href: 'https://instagram.com', icon: Instagram }
    ]

    return (
        <footer className="bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Brand */}
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">P</span>
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
                                <Sparkles className="w-2.5 h-2.5 text-white m-0.5" />
                            </div>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Portfola
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                            Home
                        </Link>
                        <Link to="/designs" className="text-gray-400 hover:text-white transition-colors duration-200">
                            Designs
                        </Link>
                        <Link to="/portfolio_info" className="text-gray-400 hover:text-white transition-colors duration-200">
                            Create Portfolio
                        </Link>
                        <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                            About
                        </Link>
                        <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                            Contact
                        </Link>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center space-x-3">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-slate-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <social.icon className="w-4 h-4" />
                            </a>
                        ))}
                        <button
                            onClick={scrollToTop}
                            className="w-9 h-9 bg-slate-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1 ml-2"
                        >
                            <ArrowUp className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-slate-800 mt-8 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-400">
                            <span>© {currentYear} Portfola. Made with</span>
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                            <span>for developers.</span>
                        </div>
                        <div className="text-gray-400 text-sm">
                            Create stunning portfolios in minutes
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
