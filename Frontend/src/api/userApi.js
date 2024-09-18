import create from "zustand";

// Define the Zustand store
const useUserStore = create((set) => ({
  username: "",
  role: "",
  token: "",

  // Action to set user
  setUser: (username, role, token) => set({ username, role, token }),

  // Action to clear user
  clearUser: () => set({ username: "", role: "", token: "" }),
}));

export default useUserStore;
