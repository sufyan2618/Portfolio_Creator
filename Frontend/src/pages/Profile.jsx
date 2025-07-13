import React from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../Store/useAuthStore';

const Profile = () => {

    const {userInfo} = useAuthStore();
    const navigate = useNavigate();
    

    const handleUpdataRoute = () => {
        navigate('/update_info');
    }

  return (
    <div>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526]">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
            <h1 className="text-2xl font-bold text-center mb-6">Profile</h1>
            <p className="text-gray-700 text-center mb-4">This is your profile page.</p>
            <p className="text-gray-500 text-center">More features coming soon!</p>
            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">User Information</h2>
                <p className="text-gray-700">Name: {userInfo?.personalInfo?.name || 'N/A'}</p>
                <p className="text-gray-700">Email: {userInfo?.email || 'N/A'}</p>
                <p className="text-gray-700">Bio: {userInfo?.about || 'N/A'}</p>
                <p className="text-gray-700">Profile Picture: {userInfo?.profilePicture || 'N/A'}</p>
            </div>
            <button onClick={handleUpdataRoute} className='border text-center p-1'>Update You profile</button>
            </div>
        </div>
    </div>
  )
}

export default Profile