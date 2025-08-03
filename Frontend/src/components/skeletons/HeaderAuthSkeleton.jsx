const HeaderAuthkeleton = () => {
    return (
      <div className="relative inline-block px-4 py-3 rounded-xl shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse cursor-not-allowed">
        <div className="flex items-center space-x-2 opacity-0">
          {/* Placeholder for the circle (initials or icon) */}
          <div className="w-8 h-6 bg-gray-600 rounded-full"></div>
          {/* Placeholder for the text */}
          <div className="h-6 w-24 bg-gray-600 rounded"></div>
        </div>
      </div>
    );
  };
  
  export default HeaderAuthkeleton;