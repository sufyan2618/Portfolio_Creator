import { create } from 'zustand';
import axiosInstance from '../utils/axios';
import toast from 'react-hot-toast';

const useAuthStore = create((set) => ({
    authUser: null,
    userInfo: null,
    isGettingInfo: false,
    isCreatingPortfolio: false,
    isSavingData: false,
    isLoggingIn: false,
    isSigningUp: false,
    isLoggingOut: false,
    isCheckingAuth: false,

    Signup: async (userData) => {
        set({ isSigningUp: true });
        try {
            const response = await axiosInstance.post('/auth/signup', userData);
            toast.success('User created successfully');
            return response.data;
        } catch (error) {
            toast.error(`Signup failed. ${error.response?.data?.message || 'An error occurred.'}`);
            throw error; // Propagate the error to the component
        }
        finally {
            set({ isSigningUp: false });
        }
    },
    Login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosInstance.post('/auth/login', data);
            set({ authUser: response.data }); // Store the user data in the store
            toast.success('Login successful');
            return response.data; // Return the user data to the component
        } catch (error) {
            toast.error(`Login failed. ${error.response?.data?.message}.`);
            throw error; // Propagate the error to the component
        }
        finally {
            set({ isLoggingIn: false });
        }
    },
    Logout: async () => {
        set({ isLoggingOut: true });
        try {
            const response = await axiosInstance.post('/auth/logout');
            toast.success('Logout successful');
            set({ authUser: null }); // Clear the user data from the store
        } catch (error) {
            toast.error(`Logout failed. ${error.response?.data?.message}.`);
            throw error; // Propagate the error to the component
        }
        finally {
            set({ isLoggingOut: false });
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axiosInstance.get('/auth/check-auth')
            set({ authUser: res.data })
        } catch (error) {
            set({ authUser: null })
        }
        finally {
            set({ isCheckingAuth: false })
        }

    },
    SaveData: async (formData) => {
        set({ isSavingData: true });
        try {
            const response = await axiosInstance.post('/info/store-info', formData);
            toast.success('Information saved successfully');
            return response.data; 
        } catch (error) {
            toast.error(`Failed to save data. ${error.response?.data?.message || 'An error occurred.'}`);
            throw error; // Propagate the error to the component
        }
        finally {
            set({ isSavingData: false });
        }
    },


    UpdateInfo: async (formData) => { // It only needs the FormData object
        set({ isSavingData: true });
        try {
            const response = await axiosInstance.post("/info/update-info", formData);
            set({ userInfo: response.data.info });
            toast.success('Information updated successfully');
            return response.data;
        } catch (error) {
            toast.error(`Failed to update information. ${error.response?.data?.message || 'An error occurred.'}`);
            throw error;
        } finally {
            set({ isSavingData: false });
        }
    },


    GetInfo: async (id) => {
        set({ isGettingInfo: true });
        try {
            const response = await axiosInstance.get(`/info/${id}`);
            set({ userInfo: response.data }); // Store the fetched info in the store
            return response.data; // Return the fetched data to the component
        } catch (error) {
            throw error; // Propagate the error to the component
        } finally {
            set({ isGettingInfo: false });
        }
    },
    GetPortfolioPage: async (userId, designId) => {
        set({ isCreatingPortfolio: true })
        try {
            const response = await axiosInstance.get(`/info/portfolio/${userId}/${designId}`);
            return response.data; 
        } catch (error) {
            throw error; 
        } finally {
            set({ isCreatingPortfolio: false });
        }
    }
})
)
export default useAuthStore;
