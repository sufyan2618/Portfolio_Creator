import React from 'react';
import useAuthStore from '../Store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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

  const handleDynamicRouting =  () => {
    if (!authUser || !userInfo) {
      toast.error('Please login and Fill your information first to use this design');
      return;
    }
    navigate(`/portfolio_preview/${id}/${design.designId}`);
  };

  const handleLoginRouting = () => {
    navigate('/signin');
  };

  return (
    <div className="bg-white h-auto w-sm shadow-md rounded-lg p-6 mx-auto">
      <img
        src={design.imageUrl || 'https://via.placeholder.com/300'}
        alt={design.title}
        className="w-full h-40 object-cover rounded-t-lg mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{design.title}</h2>
      <p className="text-gray-600 mb-4">{design.description}</p>
      <div className='flex justify-between items-center'>
        <button onClick={handleStaticRouting} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
          View Design
        </button>
        {authUser ? (
          <button onClick={handleDynamicRouting}  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
             Use this Design
          </button>
        ) : (
          <button onClick={handleLoginRouting} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
            Login to use this Design
          </button>
        )}
      </div>
    </div>
  );
};

export default DesignCard;
