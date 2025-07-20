import { create } from "zustand";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

const useDesignStore = create((set) => ({
    designs: [],
    isFetchingDesigns: false,
    isCreatingDesign: false,
    isDeployingDesign: false,

    FetchDesigns: async () => {
        set({ isFetchingDesigns: true });
        try {
            const response = await axiosInstance.get("/design/get-designs");
            set({ designs: response.data });
        } catch (error) {
            toast.error("Failed to fetch designs.");
        } finally {
            set({ isFetchingDesigns: false });
        }
    },
    
    CreateDesign: async (designData) => {
        set({ isCreatingDesign: true });
        try {
            const formData = new FormData();

            formData.append('title', designData.title);
            formData.append('description', designData.description);
            formData.append('image', designData.image);
            formData.append('hbsfile', designData.hbsfile);
            formData.append('htmlFile', designData.htmlFile); 

            const response = await axiosInstance.post("/design/create-design", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            set((state) => ({
                designs: [...state.designs, response.data.design], 
            }));
            toast.success("Design created successfully.");
            return response.data; 

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create design.");
            throw error; // Propagate the error to the component
        } finally {
            set({ isCreatingDesign: false });
        }
    },
    DeployDesign: async (htmlContent, userId) => {
        set({ isDeployingDesign: true });
        try {
            const response = await axiosInstance.post("/deploy/deploy-portfolio", {
                htmlContent,
                userId
            });
            toast.success("Design deployed successfully.");
            return response.data; 

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to deploy design.");
            throw error; // Propagate the error to the component
        } finally {
            set({ isDeployingDesign: false });
        }
    },

}));

export default useDesignStore;
