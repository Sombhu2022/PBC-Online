import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    user: Record<string, any> | null;
    role: string | null;
    isAuthenticated: boolean;
    login: (user: Record<string, any>) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            role: null,
            isAuthenticated: false,
            login: (user) =>
                set({
                    user,
                    role: user.role,
                    isAuthenticated: true,
                }),
            logout: () =>
                set({
                    user: null,
                    isAuthenticated: false,
                    role: null,
                }),
        }),
        {
            name: "auth-storage",
        }
    )
);
