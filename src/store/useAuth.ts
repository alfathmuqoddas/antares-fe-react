import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TUser {
  accessToken: string;
  additionalInfo: {
    roles: string;
    name: string;
    email: string;
    userId: string;
  };
}

interface AuthState {
  isLoggedIn: boolean;
  user: TUser | null;
  login: (user: TUser) => void;
  logout: () => void;
}

const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      login: (user) => set({ isLoggedIn: true, user }),
      logout: () =>
        set({
          isLoggedIn: false,
          user: null,
        }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
    },
  ),
);

export default useAuth;
