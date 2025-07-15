import { create } from "zustand";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

const useDesignStore = create((set) => ({
    designs: [],
    isFetchingDesigns: false,
    isCreatingDesign: false,
    
    fetchDesigns: async () => {
        set({ isFetchingDesigns: true });
        try {
        const response = await axiosInstance.get("/get-designs");
        set({ designs: response.data });
        } catch (error) {
        console.error("Error fetching designs:", error);
        toast.error("Failed to fetch designs.");
        } finally {
        set({ isFetchingDesigns: false });
        }
    },
    
    createDesign: async (designData) => {
        set({ isCreatingDesign: true });
        try {
        const response = await axiosInstance.post("/create-designs", designData);
        set((state) => ({
            designs: [...state.designs, response.data],
        }));
        toast.success("Design created successfully.");
        } catch (error) {
        console.error("Error creating design:", error);
        toast.error("Failed to create design.");
        } finally {
        set({ isCreatingDesign: false });
        }
    },

})
);

export default useDesignStore;