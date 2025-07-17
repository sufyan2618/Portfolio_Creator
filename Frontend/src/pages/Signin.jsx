import React, { useState } from 'react';
import useAuthStore from '../Store/useAuthStore';
import { Navigate, Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const Signin = () => {
    const [redirect, setRedirect] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { Login, isLoggingIn } = useAuthStore();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await Login(formData);
            if (res) {
                setRedirect(true);
            }
        } catch (error) {
            setRedirect(false);
        }
    };

    if (redirect) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 w-full py-10 max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8 flex items-center flex-col space-y-2">
                    <div className="mb-4 border-2 rounded-full w-25 h-25 border-slate-700/50 pb-4">
                    <img
                        src="/logo.webp"
                        alt="Logo"
                        className="w-22 h-22 mx-auto mb-2 object-cover"
                    />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400">
                        Sign in to continue creating amazing portfolios
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 space-y-6"
                >
                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-12 pr-12 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-300 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        {isLoggingIn ? (
                            <>
                                <ClipLoader color="white" size={20} />
                                <span>Signing In...</span>
                            </>
                        ) : (
                            <>
                                <LogIn className="w-5 h-5" />
                                <span>Sign In</span>
                            </>
                        )}
                    </button>

                    {/* Sign Up Link */}
                    <div className="text-center pt-4 border-t border-slate-700">
                        <span className="text-gray-400">Don't have an account?</span>
                        <Link 
                            to="/signup" 
                            className="ml-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200 inline-flex items-center gap-1"
                        >
                            Sign Up
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </form>

                {/* Additional Features */}
                <div className="text-center mt-8">
                    <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-300 text-sm font-medium">Secure & Fast Login</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
