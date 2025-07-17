// Designs.jsx
import React, { useEffect } from 'react';
import DesignCard from '../components/DesignCard';
import useDesignStore from '../Store/useDesignStore';
import { Palette, Sparkles, Grid3X3, Search } from 'lucide-react';

const Designs = () => {
  const { FetchDesigns, designs, isFetchingDesigns } = useDesignStore();

  useEffect(() => {
    FetchDesigns();
  }, [FetchDesigns]);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 py-15 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
              <Palette className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Premium Design Collection</span>
            </div>

            {/* Main heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Choose Your Perfect
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Design
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-md lg:text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Explore our curated collection of stunning, responsive portfolio designs. 
              Each template is crafted to make your work shine.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">{designs.length}+</div>
                <div className="text-gray-400">Premium Designs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">100%</div>
                <div className="text-gray-400">Responsive</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">Modern</div>
                <div className="text-gray-400">Clean Code</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Designs Grid Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Grid3X3 className="w-6 h-6 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">
                Browse All Designs
              </h2>
            </div>
            <p className="text-gray-400 text-lg">
              Click on any design to preview it, or log in to customize it with your information
            </p>
          </div>

          {/* Loading State */}
          {isFetchingDesigns ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400 text-lg">Loading amazing designs...</p>
            </div>
          ) : (
            <>
              {/* Designs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {designs.map((design) => (
                  <DesignCard key={design._id} design={design} />
                ))}
              </div>

              {/* Empty State */}
              {designs.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No designs found</h3>
                  <p className="text-gray-400">Check back later for new designs!</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Designs;
