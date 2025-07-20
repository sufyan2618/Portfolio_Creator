import { Outlet, Navigate } from "react-router-dom";
import useAdminStore from "../../Store/useAdminStore";
import AddDesignSkeleton from "../skeletons/AddDesignSkeleton";

const AdminProtectedRoute = () => {
    const { adminUser, isCheckingAdminAuth } = useAdminStore();

    if (isCheckingAdminAuth) {
        return <AddDesignSkeleton />;
    }


    return adminUser ? <Outlet /> : <Navigate to="/admin/admin_login" />;
}

export default AdminProtectedRoute;