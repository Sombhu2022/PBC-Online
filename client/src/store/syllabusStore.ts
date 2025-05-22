// store/syllabusStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../api/axiosInstance";
import { toast } from "sonner";

interface SyllabusState {
  syllabuses: any[];
  isLoading: boolean;
  fetchSyllabuses: (filter: { department: string }) => Promise<void>;
  createSyllabus: (formData: FormData) => Promise<void>;
}

export const useSyllabusStore = create<SyllabusState>()(
  persist(
    (set) => ({
      syllabuses: [],
      isLoading: false,

      fetchSyllabuses: async ({ department }) => {
        try {
          set({ isLoading: true });
          const res = await axiosInstance.get("/syllabus", {
            params: { department },
          });
          set({ syllabuses: res.data.data || [], isLoading: false });
        } catch (err: any) {
          toast.error(
            err.response?.data?.message || "Failed to fetch syllabuses"
          );
          set({ isLoading: false });
        }
      },

      createSyllabus: async (formData) => {
        try {
          set({ isLoading: true });
          const res = await axiosInstance.post("/syllabus", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          set((state) => ({
            syllabuses: [...state.syllabuses, res.data.data],
            isLoading: false,
          }));
          toast.success("Syllabus created successfully");
        } catch (err: any) {
          toast.error(
            err.response?.data?.message || "Failed to create syllabus"
          );
          set({ isLoading: false });
        }
      },
    }),
    { name: "syllabus-store" }
  )
);
