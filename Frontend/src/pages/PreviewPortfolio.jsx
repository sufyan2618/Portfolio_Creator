import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuthStore from '../Store/useAuthStore';
import {
  Download,
  Eye,
  ArrowLeft,
  Sparkles,
  Code,
  Loader2,
  Menu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PortfolioPreview = () => {
  const { userId, designId } = useParams();
  const { GetPortfolioPage, isCreatingPortfolio } = useAuthStore();
  const navigate = useNavigate();
  const [htmlContent, setHtmlContent] = useState('');
  const [downloadStatus, setDownloadStatus] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const fetchPortfolioPage = async () => {
      try {
        const data = await GetPortfolioPage(userId, designId);
        if (data) {
          setHtmlContent(data);
        } else {
          setHtmlContent('<h1>Portfolio data not found.</h1>');
        }
      } catch (error) {
        console.error('Error fetching portfolio page:', error);
        setHtmlContent('<h1>Error loading portfolio preview.</h1>');
      }
    };

    fetchPortfolioPage();
  }, [userId, designId, GetPortfolioPage]);

  const handleDownload = () => {
    setDownloadStatus('downloading');
    setShowMobileMenu(false);

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio_preview.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadStatus('success');
    setTimeout(() => setDownloadStatus(null), 3000);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handledeployRoute = () => {
    navigate(`/deploy/${userId}/${designId}`);
  }

  if (isCreatingPortfolio) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="text-center max-w-sm mx-auto">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-6"></div>
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">Creating Portfolio</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Loading Preview...</h2>
          <p className="text-gray-400 text-sm">Please wait while we generate your portfolio</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Desktop Header */}
      <div className="hidden md:block bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleGoBack}
                className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-gray-300 hover:text-white rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Portfolio Preview</h1>
                  <p className="text-sm text-gray-400">Review your portfolio before downloading</p>
                </div>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                disabled={downloadStatus === 'downloading'}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg ${
                  downloadStatus === 'downloading'
                    ? 'bg-purple-600/50 text-white cursor-not-allowed'
                    : downloadStatus === 'success'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                }`}
              >
                {downloadStatus === 'downloading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Downloading...
                  </>
                ) : downloadStatus === 'success' ? (
                  <>
                    <Download className="w-4 h-4" />
                    Downloaded!
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download Portfolio
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handledeployRoute}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200"
              >
                <Code className="w-4 h-4" />
                Deploy Portfolio
              </button>
              </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Mobile Left */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleGoBack}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-gray-300 hover:text-white rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white">Portfolio Preview</h1>
              </div>
            </div>

            {/* Mobile Right */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 bg-slate-700 hover:bg-slate-600 text-gray-300 hover:text-white rounded-lg transition-all duration-200"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {showMobileMenu && (
          <div className="absolute top-full left-0 right-0 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700/50 p-4 space-y-3">
            <button
              onClick={handleDownload}
              disabled={downloadStatus === 'downloading'}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                downloadStatus === 'downloading'
                  ? 'bg-purple-600/50 text-white cursor-not-allowed'
                  : downloadStatus === 'success'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
              }`}
            >
              {downloadStatus === 'downloading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Downloading...</span>
                </>
              ) : downloadStatus === 'success' ? (
                <>
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download Portfolio</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Portfolio Preview */}
      <div className="relative">
        {/* Preview Frame */}
        <div 
          className="portfolio-container bg-white shadow-2xl" 
          style={{ 
            width: '100%', 
            height: 'calc(100vh - 64px)',
            minHeight: '400px'
          }}
        >
          <iframe
            srcDoc={htmlContent}
            title="Portfolio Preview"
            style={{ width: '100%', height: '100%', border: 'none' }}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>

        {/* Floating Action Button for Mobile (Alternative) */}
        <div className="fixed bottom-6 right-4 md:hidden z-40">
          <button
            onClick={handleDownload}
            disabled={downloadStatus === 'downloading'}
            className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
              downloadStatus === 'downloading'
                ? 'bg-purple-600/50 cursor-not-allowed'
                : downloadStatus === 'success'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-purple-500/30'
            }`}
          >
            {downloadStatus === 'downloading' ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : downloadStatus === 'success' ? (
              <Download className="w-5 h-5 text-white" />
            ) : (
              <Download className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* Success Message */}
        {downloadStatus === 'success' && (
          <div className="fixed top-20 left-4 right-4 md:top-24 md:right-6 md:left-auto bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-300 z-50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-sm font-medium">Portfolio downloaded successfully!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPreview;
