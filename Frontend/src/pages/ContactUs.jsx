import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  MessageCircle, 
  Send, 
  CheckCircle,
  X,
  Sparkles,
  Clock,
  ArrowRight
} from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowDialog(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 2000);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
              <MessageCircle className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Get In Touch</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Let's Start a
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Conversation
              </span>
            </h1>
            
            <p className="text-md lg:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have a question, feedback, or just want to say hello? We'd love to hear from you. 
              Our team is here to help you create amazing portfolios.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Methods */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-gray-400 text-sm">hello@portfola.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Phone</p>
                      <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Location</p>
                      <p className="text-gray-400 text-sm">Lahore, Punjab, Pakistan</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">Response Time</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call us directly.
                </p>
              </div>

              {/* Quick Links */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <a href="/designs" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                    <span className="text-sm">Browse Designs</span>
                  </a>
                  <a href="/portfolio_info" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                    <span className="text-sm">Create Portfolio</span>
                  </a>
                  <a href="/about" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                    <span className="text-sm">About Us</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Send us a Message</h2>
                  <p className="text-gray-400">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                {/* Name Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {/* Privacy Notice */}
                <div className="text-center pt-4 border-t border-slate-700">
                  <p className="text-gray-500 text-sm">
                    By submitting this form, you agree to our privacy policy. We'll never share your information.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 max-w-md w-full transform animate-in zoom-in-95 duration-300">
            <div className="text-center">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              
              {/* Success Message */}
              <h3 className="text-2xl font-bold text-white mb-3">
                Message Sent Successfully!
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Thank you for reaching out to us. We've received your message and will get back to you within 24 hours.
              </p>
              
              {/* Features */}
              <div className="bg-slate-900/50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-purple-400 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">What's Next?</span>
                </div>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• We'll review your message carefully</li>
                  <li>• Our team will respond within 24 hours</li>
                  <li>• Check your email for our reply</li>
                </ul>
              </div>
              
              {/* Close Button */}
              <button
                onClick={closeDialog}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Continue Exploring</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* Close X Button */}
            <button
              onClick={closeDialog}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
