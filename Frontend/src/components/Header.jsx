import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, User, LogOut, Settings, Home, Palette, Info, Plus, Sparkles } from 'lucide-react'
import useAuthStore from '../Store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const { authUser, Logout, userInfo, isLoggingOut } = useAuthStore()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
    const letter = authUser?.name?.charAt(0)?.toUpperCase() || ''
    const id = authUser?._id || ''
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = async () => {
        try {
            await Logout()
            navigate('/')
            setIsProfileDropdownOpen(false)
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    const handleProfile = () => {
        navigate(`/profile/${id}`)
        setIsProfileDropdownOpen(false)
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const isActive = (path) => {
        return location.pathname === path
    }

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.profile-dropdown')) {
                setIsProfileDropdownOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    const NavLink = ({ to, children, icon: Icon, mobile = false }) => (
        <Link
            to={to}
            className={`${
                mobile 
                    ? 'flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 group' 
                    : `relative px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-200 group ${
                        isActive(to) 
                            ? 'text-white' 
                            : ''
                    }`
            }`}
            onClick={() => setIsMenuOpen(false)}
        >
            {Icon && <Icon className={`w-5 h-5 ${isActive(to) && !mobile ? 'text-purple-400' : ''} group-hover:text-purple-400 transition-colors`} />}
            {children}
            {!mobile && isActive(to) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
            )}
            {!mobile && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            )}
        </Link>
    )

    return (
        <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300">
                                <span className="text-white font-bold text-lg">P</span>
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Sparkles className="w-3 h-3 text-white m-0.5" />
                            </div>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Portfola
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink to="/" icon={Home}>Home</NavLink>
                        <NavLink to="/designs" icon={Palette}>Designs</NavLink>
                        {authUser && userInfo ? (
                            <NavLink to="/update_info" icon={Settings}>Update Info</NavLink>
                        ) : (
                            <NavLink to="/portfolio_info" icon={Info}>Insert Info</NavLink>
                        )}
                        {authUser && (
                            <NavLink to="/add_design" icon={Plus}>Add Design</NavLink>
                        )}
                    </div>

                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {authUser ? (
                            <div className="relative profile-dropdown">
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5 border border-purple-500/30"
                                >
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                        <span className="font-semibold text-sm">{letter}</span>
                                    </div>
                                    <span className="font-medium">{authUser.name}</span>
                                </button>

                                {/* Profile Dropdown */}
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-slate-700/50 py-2 animate-in slide-in-from-top-2 duration-200">
                                        <div className="px-4 py-3 border-b border-slate-700/50">
                                            <p className="font-medium text-white">{authUser.name}</p>
                                            <p className="text-sm text-gray-400">{authUser.email}</p>
                                        </div>
                                        <button
                                            onClick={handleProfile}
                                            className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 group"
                                        >
                                            <User className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                                            Profile
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            disabled={isLoggingOut}
                                            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-200 disabled:opacity-50 group"
                                        >
                                            <LogOut className="w-4 h-4 group-hover:text-red-300 transition-colors" />
                                            {isLoggingOut ? 'Logging out...' : 'Logout'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    to="/signin"
                                    className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors duration-200 hover:bg-slate-800/50 rounded-lg"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 font-medium transform hover:-translate-y-0.5 border border-purple-500/30"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900/98 backdrop-blur-md border-b border-slate-800/50 shadow-2xl animate-in slide-in-from-top-2 duration-300">
                        <div className="px-4 py-6 space-y-2">
                            <NavLink to="/" icon={Home} mobile>Home</NavLink>
                            <NavLink to="/designs" icon={Palette} mobile>Designs</NavLink>
                            {authUser && userInfo ? (
                                <NavLink to="/update_info" icon={Settings} mobile>Update Info</NavLink>
                            ) : (
                                <NavLink to="/portfolio_info" icon={Info} mobile>Insert Info</NavLink>
                            )}
                            
                            {/* Mobile Auth Section */}
                            <div className="pt-4 border-t border-slate-800/50">
                                {authUser ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 rounded-lg">
                                            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                                                <span className="text-white font-semibold">{letter}</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{authUser.name}</p>
                                                <p className="text-sm text-gray-400">{authUser.email}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleProfile}
                                            className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 group"
                                        >
                                            <User className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
                                            Profile
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            disabled={isLoggingOut}
                                            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all duration-200 disabled:opacity-50 group"
                                        >
                                            <LogOut className="w-5 h-5 group-hover:text-red-300 transition-colors" />
                                            {isLoggingOut ? 'Logging out...' : 'Logout'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <Link
                                            to="/signin"
                                            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 group"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <User className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
                                            Sign In
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="flex items-center justify-center gap-3 mx-0 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg font-medium border border-purple-500/30"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <Sparkles className="w-5 h-5" />
                                            Get Started
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Header
