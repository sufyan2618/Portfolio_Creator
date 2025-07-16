import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuthStore from '../Store/useAuthStore';

const PortfolioPreview = () => {
  const { userId, designId } = useParams();
  const { GetPortfolioPage, isCreatingPortfolio } = useAuthStore()

  const [htmlContent, setHtmlContent] = useState('');
  useEffect( () => {

    const fetchPortfolioPage = async () => {
      try {
        const data = await GetPortfolioPage(userId, designId);
        if (data) {
          setHtmlContent(data); // Assuming data is the HTML content
        } else {
          setHtmlContent('<h1>Portfolio data not found.</h1>');
        }
      } catch (error) {
        console.error('Error fetching portfolio page:', error);
        setHtmlContent('<h1>Error loading portfolio preview.</h1>');
      }
    };

    fetchPortfolioPage();


  }, [ userId, designId, GetPortfolioPage]); // Rerun if these change

    const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio_preview.html'; // Name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the URL object
    alert('Portfolio downloaded successfully!');
    }


  if (isCreatingPortfolio) {
    return <div>Loading Preview...</div>;
  }

  return (
    <>
    <div className='flex  items-center justify-around bg-gray-100 '>
        <h1 className="text-center text-2xl font-bold my-4">Portfolio Preview</h1>
        <button onClick={handleDownload} className='text-center text-xl font-bold border-2'>Download this portfolio</button>
    </div>
    <div className="portfolio-container" style={{ width: '100%', height: '100vh' }}>
      <iframe
        srcDoc={htmlContent} // <-- The magic happens here!
        title="Portfolio Preview"
        style={{ width: '100%', height: '100%', border: 'none' }}
        // For added security, especially if the HTML contains scripts
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
    </>
  );
};

export default PortfolioPreview;
