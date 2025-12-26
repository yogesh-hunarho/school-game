import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            notification: null,

            setUser: (user) => set({ user }),
            setToken: (token) => {
                set({ token });
            },
            logout: () => {
                set({ user: null, token: null });
                localStorage.removeItem('ACCESS_TOKEN'); // Clean up specific key if needed, though persist handles state
            },
            setNotification: (message) => {
                set({ notification: message });
                setTimeout(() => {
                    set({ notification: null });
                }, 5000);
            },
        }),
        {
            name: 'auth-storage', // name of the item in the storage (must be unique)
            partialize: (state) => ({ token: state.token, user: state.user }), // only persist token and user
        }
    )
);
