import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../api/axiosInstance";
import { toast } from "sonner";

interface AuthState {
    departments: Record<string, any>[]; // Array of departments
    selectedDepartment: Record<string, any> | null;
    semesters: Record<string, any>[]; // Array of semesters
    selectedSemester: Record<string, any> | null;
    isLoading: boolean;
    message: string | null;

    addDepartment: (body: Record<string, any>) => Promise<void>;
    fetchDepartments: () => Promise<void>;
    fetchDepartmentById: (id: string) => Promise<void>;
    updateDepartment: (id: string, body: Record<string, any>) => Promise<void>;
    deleteDepartment: (id: string) => Promise<void>;
    setSelectedDepartment: (department: Record<string, any> | null) => void;

    
    addSemester: (body:any) => Promise<void>;
    fetchSemesters: (departmentId?: string) => Promise<void>;
    fetchSemesterById: (id: string) => Promise<void>;
    updateSemester: (id: string, body: any) => Promise<void>;
    deleteSemester: (id: string) => Promise<void>;
    setSelectedSemester: (semester: any | null) => void;
}

export const useDepartmentStore = create<AuthState>()(
    persist(
        (set, get) => ({
            departments: [],
            selectedDepartment: null,
            semesters: [],
            selectedSemester: null,
            isLoading: false,
            message: null,

            // Add a new department
            addDepartment: async (body: Record<string, any>) => {
                set({ isLoading: true, message: null });
                try {
                    const response = await axiosInstance.post("/department", body);
                    const newDepartment = response.data.data;
                    set((state) => ({
                        departments: [...state.departments, newDepartment],
                        message: "Department created successfully",
                        isLoading: false,
                    }));
                    toast.success("Department created successfully");
                } catch (error: any) {
                    console.log("===========error" , error);
                    
                    set({
                        message: error.response?.data?.message || "Failed to create department",
                        isLoading: false,
                    });
                    toast.error(error.response?.data?.message || "Failed to create department");
                }
            },

            // Fetch all departments or a specific one
            fetchDepartments: async () => {
                set({ isLoading: true, message: null });
                try {
                    const response = await axiosInstance.get("/department/all");
                    set({
                        departments: response.data.data,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        message: error.response?.data?.message || "Failed to fetch departments",
                        isLoading: false,
                    });
                    toast.error(error.response?.data?.message || "Failed to fetch departments");
                }
            },

            // Fetch department by ID
            fetchDepartmentById: async (id: string) => {
                set({ isLoading: true, message: null });
                try {
                    const response = await axiosInstance.get(`/department/${id}`);
                    set({
                        selectedDepartment: response.data.data,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        message: error.response?.data?.message || "Failed to fetch department",
                        isLoading: false,
                    });
                    toast.error(error.response?.data?.message || "Failed to fetch department");
                }
            },

            // Update a department
            updateDepartment: async (id: string, body: Record<string, any>) => {
                set({ isLoading: true, message: null });
                try {
                    const response = await axiosInstance.put(`/department/${id}`, body);
                    set((state) => ({
                        departments: state.departments.map((dept) =>
                            dept._id === id ? response.data.data : dept
                        ),
                        selectedDepartment: response.data,
                        message: "Department updated successfully",
                        isLoading: false,
                    }));
                    toast.success("Department updated successfully");
                } catch (error: any) {
                    set({
                        message: error.response?.data?.message || "Failed to update department",
                        isLoading: false,
                    });
                    toast.error(error.response?.data?.message || "Failed to update department");
                }
            },

            // Delete a department
            deleteDepartment: async (id: string) => {
                set({ isLoading: true, message: null });
                try {
                    await axiosInstance.delete(`/department/${id}`);
                    set((state) => ({
                        departments: state.departments.filter((dept) => dept._id !== id),
                        selectedDepartment: state.selectedDepartment?._id === id ? null : state.selectedDepartment,
                        message: "Department deleted successfully",
                        isLoading: false,
                    }));
                    toast.success("Department deleted successfully");
                } catch (error: any) {
                    set({
                        message: error.response?.data?.message || "Failed to delete department",
                        isLoading: false,
                    });
                    toast.error(error.response?.data?.message || "Failed to delete department");
                }
            },



            // Set selected department
            setSelectedDepartment: (department: Record<string, any> | null) => {
                set({ selectedDepartment: department });
            },


            // semester 

              // Add a new semester
            addSemester: async (body) => {
                set({ isLoading: true, message: null });
                try {
                    const response = await axiosInstance.post("/semester", body);
                    const newSemester = response.data.data;
                    set((state) => ({
                        semesters: [...state.semesters, newSemester],
                        message: "Semester created successfully",
                        isLoading: false,
                    }));
                    toast.success("Semester created successfully");
                } catch (error: any) {
                    set({
                        message: error.response?.data?.message || "Failed to create semester",
                        isLoading: false,
                    });
                    toast.error(error.response?.data?.message || "Failed to create semester");
                }
            },

            // Fetch all semesters or by departmentId
            fetchSemesters: async (departmentId?: string) => {
                set({ isLoading: true, message: null });
                try {
                    const url = departmentId 
                        ? `/semester/${departmentId}`
                        : "/semester";
                    const response = await axiosInstance.get(url);
                    set({
                        semesters: response.data.data,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        message: error.response?.data?.message || "Failed to fetch semesters",
                        isLoading: false,
                    });
                    toast.error(error.response?.data?.message || "Failed to fetch semesters");
                }
            },

            // Fetch semester by ID
            fetchSemesterById: async (id: string) => {
                set({ isLoading: true, message: null });
                try {
                    const response = await axiosInstance.get(`/semester/${id}`);
                    set({
                        selectedSemester: response.data.data,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        message: error.response?.data?.message || "Failed to fetch semester",
                        isLoading: false,
                    });
                    toast.error(error.response?.data?.message || "Failed to fetch semester");
                }
            },

            // Update a semester
            updateSemester: async (id: string, body) => {
                set({ isLoading: true, message: null });
                try {
                    const response = await axiosInstance.put(`/semester/${id}`, body);
                    set((state) => ({
                        semesters: state.semesters.map((sem) =>
                            sem.id === id ? response.data.data : sem
                        ),
                        selectedSemester: state.selectedSemester?.id === id ? response.data.data : state.selectedSemester,
                        message: "Semester updated successfully",
                        isLoading: false,
                    }));
                    toast.success("Semester updated successfully");
                } catch (error: any) {
                    set({
                        message: error.response?.data?.message || "Failed to update semester",
                        isLoading: false,
                    });
                    toast.error(error.response?.data?.message || "Failed to update semester");
                }
            },

            // Delete a semester
            deleteSemester: async (id: string) => {
                set({ isLoading: true, message: null });
                try {
                    await axiosInstance.delete(`/semesters/${id}`);
                    set((state) => ({
                        semesters: state.semesters.filter((sem) => sem.id !== id),
                        selectedSemester: state.selectedSemester?.id === id ? null : state.selectedSemester,
                        message: "Semester deleted successfully",
                        isLoading: false,
                    }));
                    toast.success("Semester deleted successfully");
                } catch (error: any) {
                    set({
                        message: error.response?.data?.message || "Failed to delete semester",
                        isLoading: false,
                    });
                    toast.error(error.response?.data?.message || "Failed to delete semester");
                }
            },

            // Set selected semester
            setSelectedSemester: (semester: any | null) => {
                set({ selectedSemester: semester });
            },

             
        }),
        {
            name: "department-storage",
        }
    )
);