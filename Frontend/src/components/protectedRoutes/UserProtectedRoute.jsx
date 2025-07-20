import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../Store/useAuthStore";
import { Loader } from "lucide-react";

const UserProtectedRoute = () => {
    const { authUser, isCheckingAuth } = useAuthStore();
    
    // If authUser is null, it means the user is not authenticated
    if (isCheckingAuth) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Loader className="animate-spin h-8 w-8 text-blue-500" />
        </div>;
    }

    return authUser ? <Outlet /> : <Navigate to="/signin" />;
}

export default UserProtectedRoute;