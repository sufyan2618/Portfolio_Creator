import { create } from "zustand";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

const useAdminStore = create((set) => ({
    adminUser: null,
    isLoggingIn: false,
    isCheckingAdminAuth: false,
    isLoggingOut: false,

    AdminLogin: async (data) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosInstance.post("/admin/login", data);
            set({ adminUser: response.data });
            console.log("Admin login response:", response.data);
            toast.success("Admin login successful");
            return response.data;
        } catch (error) {
            console.error("Admin login error:", error);
            toast.error(`Admin login failed. ${error.response?.data?.message}.`);
            throw error; // Propagate the error to the component
        } finally {
            set({ isLoggingIn: false });
        }
    },

    Logout: async () => {
        set({ isLoggingOut: true });
        try {
            const response = await axiosInstance.post("/admin/logout");
            toast.success("Admin logout successful");
            set({ adminUser: null }); // Clear the admin user data from the store
        } catch (error) {
            console.error("Admin logout error:", error);
            toast.error(`Admin logout failed. ${error.response?.data?.message}.`);
            throw error; // Propagate the error to the component
        } finally {
            set({ isLoggingOut: false });
        }
    },
    CheckAdminAuth: async () => {
        set({ isCheckingAdminAuth: true});
        try {
            const response = await axiosInstance.get("/admin/check-auth");
            set({ adminUser: response.data }); 
            return response.data; 
        } catch (error) {
            console.error("Check Admin Auth error:", error);
            throw error; 
        } finally {
            set({ isCheckingAdminAuth: false });
        }
    },
})
);
export default useAdminStore;