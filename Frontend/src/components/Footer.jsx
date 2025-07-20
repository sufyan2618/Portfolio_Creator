// Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { 
    Sparkles, 
    Heart,
    ArrowUp
} from 'lucide-react'

import useAuthStore from '../Store/useAuthStore'
import { SiInstagram, SiLinkedin, SiGithub } from 'react-icons/si'
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    const { authUser } = useAuthStore()

    const currentYear = new Date().getFullYear()

    const socialLinks = [
        { name: 'GitHub', href: 'https://github.com/sufyan2618', icon: SiGithub },
        { name: 'Twitter', href: 'https://twitter.com/sufyan', icon: FaSquareXTwitter }, 
        { name: 'LinkedIn', href: 'https://linkedin.com/in/sufyanliaqat2', icon: SiLinkedin },
        { name: 'Instagram', href: 'https://instagram.com/sufyan_liaquat1', icon: SiInstagram },
    ]

    return (
        <footer className="bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Brand */}
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <img
                                src="/logo.webp"
                                alt="Logo"
                                className="w-16 h-16 rounded-full border-2 border-slate-700/50"
                                style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
                            />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
                                <Sparkles className="w-2.5 h-2.5 text-white m-0.5" />
                            </div>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Online Identity
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
                        <Link to={authUser ? `/portfolio_info` : `/signin`} className="text-gray-400 hover:text-white transition-colors duration-200">
                            Create Portfolio
                        </Link>
                        <Link to="/contact_us" className="text-gray-400 hover:text-white transition-colors duration-200">
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
                            <span>© {currentYear} Online Identity. Made with</span>
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                            <span>for People.</span>
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
