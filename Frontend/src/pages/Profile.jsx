import React from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
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
            <button onClick={handleUpdataRoute} className='border text-center p-1'>Update You profile</button>
            </div>
        </div>
    </div>
  )
}

export default Profile