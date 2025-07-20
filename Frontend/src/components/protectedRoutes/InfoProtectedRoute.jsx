import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../../Store/useAuthStore";
import { Loader } from "lucide-react";

const InfoProtectedRoute = () => {
    const { userInfo, isGettingInfo } = useAuthStore();

    if (isGettingInfo) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Loader className="animate-spin h-8 w-8 text-blue-500" />
            </div>
        );
    }

    return  userInfo ? <Outlet /> : <Navigate to="/portfolio_info" />;
}

export default InfoProtectedRoute;