const HeaderSkeleton = () => {
    return (
        <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 shadow-lg animate-pulse">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Skeleton */}
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-700 rounded-xl"></div>
                        <div className="h-6 w-32 bg-gray-700 rounded"></div>
                    </div>

                    {/* Desktop Navigation Skeleton */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="h-6 w-16 bg-gray-700 rounded"></div>
                        <div className="h-6 w-20 bg-gray-700 rounded"></div>
                        <div className="h-6 w-24 bg-gray-700 rounded"></div>
                    </div>

                    {/* Desktop Auth Section Skeleton */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex items-center space-x-3 bg-gray-700 px-4 py-2 rounded-xl">
                            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                            <div className="h-4 w-20 bg-gray-600 rounded"></div>
                        </div>
                    </div>

                    {/* Mobile Menu Button Skeleton */}
                    <div className="md:hidden w-10 h-10 bg-gray-700 rounded-lg"></div>
                </div>
            </div>
        </nav>
    )
}

export default HeaderSkeleton
