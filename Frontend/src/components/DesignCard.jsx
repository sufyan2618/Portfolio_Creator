import React from 'react'
import useAuthStore from '../Store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useDesignStore from '../Store/useDesignStore';

const DesignCard = () => {

  const navigate = useNavigate();

  const { authUser, GetPortfolioPage, isCreatingPortfolio } = useAuthStore();
  const { designs} = useDesignStore();

  const id = authUser?._id || '';

  const handleStaticRouting = () => {
    // Navigate to the design details page
    window.open('/designs/design2/index.html', '_blank')
  }

  const handleDynamicRouting = async () => {
    const htmlString = await GetPortfolioPage(id, 'design2');
    try {

      if (typeof htmlString !== 'string') {
        throw new Error("Received invalid data from the server.");
      }

      const blob = new Blob([htmlString], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error opening design:', error);
      toast.error('Failed to open design. Please try again later.');
    }
  }
  const handleLoginRouting = () => {
    navigate('/signin');
  }


  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto">
      <img
        src={designs[0].imageUrl || 'https://via.placeholder.com/300'}
        alt="Design Thumbnail"
        className="w-full h-40 object-cover rounded-t-lg mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{ designs[0].title}</h2>
      <p className="text-gray-600 mb-4">
        { designs[0].description}
      </p>
      <div className='flex justify-between items-center'>
        <button onClick={handleStaticRouting} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
          View Design
        </button>
        {authUser ? (<button onClick={handleDynamicRouting} disabled={isCreatingPortfolio} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
          {isCreatingPortfolio ? 'Loading...' : 'Use this Design'}
        </button>) : (<button onClick={handleLoginRouting} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
          Login to use this Design
        </button>)}
      </div>
    </div>
  )
}

export default DesignCard