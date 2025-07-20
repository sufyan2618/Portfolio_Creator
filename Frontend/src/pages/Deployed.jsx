// Deployed.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useDesignStore from '../Store/useDesignStore'; 
import useAuthStore from '../Store/useAuthStore';
import { 
  Rocket, 
  ExternalLink, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  ArrowLeft,
  Sparkles,
  Globe,
  Share2,
  Eye,
  RefreshCw
} from 'lucide-react';

const Deployed = () => {
    const { id, designId } = useParams();
    const navigate = useNavigate();
    const { GetPortfolioPage } = useAuthStore();
    const { isDeployingDesign, DeployDesign } = useDesignStore();
    const [deployUrl, setDeployUrl] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const [deploymentProgress, setDeploymentProgress] = useState(0);

    useEffect(() => {
        const performDeployment = async () => {
            if (deployUrl) return;

            try {
                // Simulate progress updates for better UX
                const progressInterval = setInterval(() => {
                    setDeploymentProgress(prev => {
                        if (prev >= 90) return prev;
                        return prev + Math.random() * 10;
                    });
                }, 800);

                const htmlContent = await GetPortfolioPage(id, designId);
                setDeploymentProgress(30);
                
                const res = await DeployDesign(htmlContent,  id);
                
                clearInterval(progressInterval);
                setDeploymentProgress(100);
                
                if (res?.url) {
                    setDeployUrl(res.url);
                } else {
                    throw new Error("Deployment did not return a valid URL.");
                }
            } catch (err) {
                console.error("Error during deployment process:", err);
                setError(err.message || "An unexpected error occurred during deployment.");
                setDeploymentProgress(0);
            }
        };

        performDeployment();
    }, [id, designId, deployUrl, GetPortfolioPage, DeployDesign]);

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const sharePortfolio = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Check out my portfolio!',
                    text: 'I just created my portfolio with Portfola',
                    url: deployUrl
                });
            } catch (err) {
                copyToClipboard(deployUrl);
            }
        } else {
            copyToClipboard(deployUrl);
        }
    };

    const retryDeployment = () => {
        setError('');
        setDeployUrl('');
        setDeploymentProgress(0);
        // Component will re-run deployment effect
    };

    return (
        <div className="min-h-screen bg-slate-900 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-2xl">
                    {/* Deploying State */}
                    {isDeployingDesign && !error && (
                        <div className="text-center">
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 space-y-8">
                                {/* Rocket Animation */}
                                <div className="relative">
                                    <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                        <Rocket className="w-12 h-12 text-white" />
                                    </div>
                                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full animate-ping"></div>
                                </div>

                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2">
                                        <Sparkles className="w-4 h-4 text-purple-400" />
                                        <span className="text-purple-300 text-sm font-medium">Deployment in Progress</span>
                                    </div>

                                    <h1 className="text-4xl font-bold text-white mb-4">
                                        Launching Your
                                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                            {" "}Portfolio
                                        </span>
                                    </h1>

                                    <p className="text-gray-400 text-lg mb-8">
                                        We're deploying your portfolio to the cloud. This usually takes 30-60 seconds.
                                    </p>

                                    {/* Progress Bar */}
                                    <div className="space-y-3">
                                        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out"
                                                style={{ width: `${deploymentProgress}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-400">
                                            <span>Preparing files...</span>
                                            <span>{Math.round(deploymentProgress)}%</span>
                                        </div>
                                    </div>

                                    {/* Deployment Steps */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                                        <div className={`p-4 rounded-lg transition-all duration-500 ${deploymentProgress > 20 ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-slate-800 border border-slate-700'}`}>
                                            <div className="flex items-center gap-2 mb-2">
                                                {deploymentProgress > 20 ? (
                                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                                ) : (
                                                    <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                                                )}
                                                <span className="text-sm font-medium text-white">Building</span>
                                            </div>
                                            <p className="text-xs text-gray-400">Processing your portfolio</p>
                                        </div>
                                        
                                        <div className={`p-4 rounded-lg transition-all duration-500 ${deploymentProgress > 60 ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-slate-800 border border-slate-700'}`}>
                                            <div className="flex items-center gap-2 mb-2">
                                                {deploymentProgress > 60 ? (
                                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                                ) : deploymentProgress > 20 ? (
                                                    <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                                                ) : (
                                                    <Globe className="w-4 h-4 text-gray-400" />
                                                )}
                                                <span className="text-sm font-medium text-white">Deploying</span>
                                            </div>
                                            <p className="text-xs text-gray-400">Uploading to servers</p>
                                        </div>
                                        
                                        <div className={`p-4 rounded-lg transition-all duration-500 ${deploymentProgress >= 100 ? 'bg-green-500/20 border border-green-500/30' : 'bg-slate-800 border border-slate-700'}`}>
                                            <div className="flex items-center gap-2 mb-2">
                                                {deploymentProgress >= 100 ? (
                                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                                ) : deploymentProgress > 60 ? (
                                                    <Loader2 className="w-4 h-4 text-pink-400 animate-spin" />
                                                ) : (
                                                    <Rocket className="w-4 h-4 text-gray-400" />
                                                )}
                                                <span className="text-sm font-medium text-white">Going Live</span>
                                            </div>
                                            <p className="text-xs text-gray-400">Final preparations</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Success State */}
                    {!isDeployingDesign && deployUrl && !error && (
                        <div className="text-center">
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 space-y-8">
                                {/* Success Animation */}
                                <div className="relative">
                                    <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto animate-in zoom-in-50 duration-500">
                                        <CheckCircle className="w-12 h-12 text-white" />
                                    </div>
                                    <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full animate-ping"></div>
                                </div>

                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2">
                                        <Rocket className="w-4 h-4 text-green-400" />
                                        <span className="text-green-300 text-sm font-medium">Deployment Successful</span>
                                    </div>

                                    <h1 className="text-4xl font-bold text-white mb-4">
                                        🚀 Portfolio is
                                        <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                            {" "}Live!
                                        </span>
                                    </h1>

                                    <p className="text-gray-400 text-lg">
                                        Congratulations! Your portfolio is now live and accessible worldwide.
                                    </p>

                                    {/* URL Display */}
                                    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Globe className="w-5 h-5 text-purple-400" />
                                            <span className="text-sm font-medium text-gray-300">Your Portfolio URL</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <code className="flex-1 bg-slate-800 text-green-400 px-3 py-2 rounded text-sm break-all font-mono">
                                                {deployUrl}
                                            </code>
                                            <button
                                                onClick={() => copyToClipboard(deployUrl)}
                                                className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
                                                title="Copy URL"
                                            >
                                                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        {copied && (
                                            <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3" />
                                                URL copied to clipboard!
                                            </p>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <a
                                            href={deployUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View Portfolio
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                        
                                        <button
                                            onClick={sharePortfolio}
                                            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
                                        >
                                            <Share2 className="w-4 h-4" />
                                            Share Portfolio
                                        </button>
                                    </div>

                                    {/* Additional Actions */}
                                    <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-slate-700">
                                        <button
                                            onClick={() => navigate('/designs')}
                                            className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                                        >
                                            Create Another Portfolio
                                        </button>
                                        <button
                                            onClick={() => navigate(`/profile/${id}`)}
                                            className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                                        >
                                            View My Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {!isDeployingDesign && error && (
                        <div className="text-center">
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 space-y-8">
                                {/* Error Animation */}
                                <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                                    <AlertCircle className="w-12 h-12 text-white" />
                                </div>

                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2">
                                        <AlertCircle className="w-4 h-4 text-red-400" />
                                        <span className="text-red-300 text-sm font-medium">Deployment Failed</span>
                                    </div>

                                    <h1 className="text-4xl font-bold text-white mb-4">
                                        Deployment
                                        <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                                            {" "}Failed
                                        </span>
                                    </h1>

                                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                                        <p className="text-red-300 text-sm">{error}</p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <button
                                            onClick={retryDeployment}
                                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300"
                                        >
                                            <RefreshCw className="w-4 h-4" />
                                            Try Again
                                        </button>
                                        
                                        <button
                                            onClick={() => navigate(-1)}
                                            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
                                        >
                                            <ArrowLeft className="w-4 h-4" />
                                            Go Back
                                        </button>
                                    </div>

                                    <div className="text-center pt-4 border-t border-slate-700">
                                        <p className="text-gray-500 text-sm">
                                            If the problem persists, please contact our support team.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Deployed;
