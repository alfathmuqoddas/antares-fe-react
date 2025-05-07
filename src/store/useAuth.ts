import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  user: {
    accessToken: string;
    additionalInfo: { roles: string; name: string; email: string };
  } | null;
  login: (user: any) => void;
  logout: () => void;
}

const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      login: (user: any) => set({ isLoggedIn: true, user }),
      logout: () =>
        set({
          isLoggedIn: false,
          user: null,
        }),
    }),
    {
      name: "auth", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // default (can be omitted)
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }), // you can "blacklist" properties and so much more from the storage
    }
  )
);

export default useAuth;
