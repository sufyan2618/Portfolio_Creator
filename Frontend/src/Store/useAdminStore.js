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
            toast.success("Admin login successful");
            return response.data;
        } catch (error) {
            toast.error(`Admin login failed. ${error.response?.data?.message}.`);
            throw error; 
        } finally {
            set({ isLoggingIn: false });
        }
    },

    Logout: async () => {
        set({ isLoggingOut: true });
        try {
            const response = await axiosInstance.post("/admin/logout");
            toast.success("Admin logout successful");
            set({ adminUser: null }); \
        } catch (error) {
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
            set({ adminUser: null });
            throw error; 
        } finally {
            set({ isCheckingAdminAuth: false });
        }
    },
})
);
export default useAdminStore;