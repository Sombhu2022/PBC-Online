import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../api/axiosInstance";
import { toast } from "sonner";

interface Notice {
  _id: string;
  title: string;
  description: string;
  department: string;
  document?: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateNoticeData {
  title: string;
  description: string;
  department: string;
  user: string;
  media?: {
    url: string;
    public_id: string;
  };
}

interface NoticeState {
  notices: Notice[];
  isLoading: boolean;
  error: string | null;
  fetchNotices: (departmentId: string) => Promise<void>;
  createNotice: (data: FormData | CreateNoticeData) => Promise<void>;
  deleteNotice: (id: string) => Promise<void>;
}

export const useNoticeStore = create<NoticeState>()(
  persist(
    (set, get) => ({
      notices: [],
      isLoading: false,
      error: null,

      fetchNotices: async (departmentId) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axiosInstance.get("/noticeboard", {
            params: { department: departmentId },
          });
          set({ notices: res.data.data || [], isLoading: false });
        } catch (error: any) {
          const message =
            error?.response?.data?.message || "Failed to fetch notices";
          set({ error: message, isLoading: false });
          toast.error(message);
        }
      },

      createNotice: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axiosInstance.post("/noticeboard", data, {
            headers: {
              "Content-Type":
                data instanceof FormData
                  ? "multipart/form-data"
                  : "application/json",
            },
          });
          set((state) => ({
            notices: [res.data.data, ...state.notices],
            isLoading: false,
          }));
          toast.success("Notice created successfully!");
        } catch (error: any) {
          const message =
            error?.response?.data?.message || "Failed to create notice";
          set({ error: message, isLoading: false });
          toast.error(message);
          console.error("Create notice error:", error?.response?.data);
        }
      },

      deleteNotice: async (id) => {
        try {
          await axiosInstance.delete(`/noticeboard/${id}`);
          set((state) => ({
            notices: state.notices.filter((n) => n._id !== id),
          }));
          toast.success("Notice deleted successfully!");
        } catch (error: any) {
          const message =
            error?.response?.data?.message || "Failed to delete notice";
          set({ error: message });
          toast.error(message);
        }
      },
    }),
    {
      name: "notice-storage",
    }
  )
);
