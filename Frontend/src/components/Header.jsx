import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../Store/useAuthStore'
import { useNavigate } from 'react-router-dom'
const Header = () => {
    const { authUser, Logout, } = useAuthStore()
    const letter = authUser?.name?.charAt(0)?.toUpperCase() || '';
    const id = authUser?._id || '';
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await Logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }

    }

    const handleProfile = () => {
        navigate(`/profile/${id}`);

    }


    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">Portfola</div>
                <div className="flex space-x-4">
                    <Link to="/" className="text-white text-lg font-bold">Home</Link>
                    <Link to="/designs" className="text-white text-lg font-bold">Designs</Link>
                    <Link to={"/portfolio_info"} className="text-white text-lg font-bold">Complete you info</Link>
                    {authUser ? (
                        <>
                        <button onClick={handleProfile} className='text-white border-2 rounded-lg h-8 w-8 flex justify-center items-center cursor-pointer'>{letter}</button>
                        <button onClick={handleLogout} className='text-white text-lg font-bold cursor-pointer'>Logout</button>
                        </>
                    ): (
                        <Link to="/signin" className="text-white text-lg font-bold">Sign In</Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Header

