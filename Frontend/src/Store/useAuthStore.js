import { create } from 'zustand';
import axiosInstance from '../utils/axios';
import toast from 'react-hot-toast';

const useAuthStore = create((set) => ({
    authUser: null,
    userInfo: null,
    isGettingInfo: false,
    isSavingData: false,
    isLoggingIn: false,
    isSigningUp: false,
    isLoggingOut: false,
    isCheckingAuth: false,

    Signup: async (userData) =>{
        set({ isSigningUp: true });
        try {
            const response = await axiosInstance.post('/auth/signup', userData);
            toast.success('User created successfully');
            return response.data; 
        } catch (error) {
            console.error('Signup error:', error);
            toast.error(`Signup failed. ${error.response?.data?.message || 'An error occurred.'}`);
            throw error; // Propagate the error to the component
        }
        finally{
            set({ isSigningUp: false });
        }
    },
    Login: async(data) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosInstance.post('/auth/login', data);
            set({ authUser: response.data }); // Store the user data in the store
            toast.success('Login successful');
            return response.data; // Return the user data to the component
        } catch (error) {
            console.error('Login error:', error);
            toast.error(`Login failed. ${error.response?.data?.message}.`);
            throw error; // Propagate the error to the component
        }
        finally{
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
            console.error('Logout error:', error);
            toast.error(`Logout failed. ${error.response?.data?.message}.`);
            throw error; // Propagate the error to the component
        }
        finally{
            set({ isLoggingOut: false });
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axiosInstance.get('/auth/check-auth')
            set({ authUser: res.data })
        } catch (error) {
            console.error(error)
            set({authUser: null})
        }
        finally{
            set({isCheckingAuth: false})
        }

    },
    SaveData: async (data, id) => {
        set({ isSavingData: true });
        try {
            const response = await axiosInstance.post('/info/store-info',{id, data});
            toast.success('Information saved successfully');
            return response.data; // Return the saved data to the component
        } catch (error) {
            console.error('SaveData error:', error);
            toast.error(`Failed to save data. ${error.response?.data?.message || 'An error occurred.'}`);
            throw error; // Propagate the error to the component
        }
        finally {
            set({ isSavingData: false });
        }
    },

    UpdateInfo : async (data, id) => {
        set({ isSavingData: true });
        try {
            const response = await axiosInstance.post('/info/update-info', { id, data });
            toast.success('Information updated successfully');
            return response.data; // Return the updated data to the component
        } catch (error) {
            console.error('UpdateInfo error:', error);
            toast.error(`Failed to update information. ${error.response?.data?.message || 'An error occurred.'}`);
            throw error; // Propagate the error to the component
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
            console.error('GetInfo error:', error);
            throw error; // Propagate the error to the component
        } finally {
            set({ isGettingInfo: false });
        }
    }





})
)
export default useAuthStore;
