// DesignCard.jsx
import React from 'react';
import useAuthStore from '../Store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, Paintbrush, LogIn, Sparkles } from 'lucide-react';

const DesignCard = ({ design }) => {
  const navigate = useNavigate();
  const { authUser, userInfo } = useAuthStore();
  const id = authUser?._id || '';

  if (!design) {
    return null;
  }

  const handleStaticRouting = () => {
    window.open(`${design.htmlFileUrl}`, '_blank');
  };

  const handleDynamicRouting = () => {
    if (!authUser || !userInfo) {
      toast.error('Please login and fill your information first to use this design');
      return;
    }
    navigate(`/portfolio_preview/${id}/${design.designId}`);
  };

  const handleLoginRouting = () => {
    navigate('/signin');
  };

  return (
    <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:bg-slate-800/80 transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={design.imageUrl || 'https://via.placeholder.com/400x240'}
          alt={design.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Preview Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleStaticRouting}
            className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/30 transition-all duration-200"
          >
            <Eye className="w-4 h-4" />
            Quick Preview
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Description */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
            {design.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
            {design.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleStaticRouting}
            className="flex-1 bg-slate-700 border border-slate-600 text-white px-2 py-2.5 rounded-lg hover:bg-slate-600 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
          >
            <Eye className="w-4 h-4" />
            View Design
          </button>
          
          {authUser ? (
            <button
              onClick={handleDynamicRouting}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2.5 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-purple-500/25"
            >
              <Paintbrush className="w-4 h-4" />
              Use This Design
            </button>
          ) : (
            <button
              onClick={handleLoginRouting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-blue-500/25"
            >
              <LogIn className="w-4 h-4" />
              Login to Use
            </button>
          )}
        </div>

        {/* Premium Badge (optional) */}
        {design.isPremium && (
          <div className="mt-4 inline-flex items-center gap-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-3 py-1">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            <span className="text-yellow-300 text-xs font-medium">Premium</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignCard;
