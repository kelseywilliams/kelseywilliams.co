import { create } from "zustand";

export const useSessionStore = create((set, get) => ({
    user: null,
    loggedIn: false,
    toasts: [],

    setUser: (user) => { 
        if (user) {
            sessionStorage.setItem("user", user);
        } else {
            sessionStorage.removeItem("user");
        }
        set({user});
    },
    setLoggedIn: (status) => {
        if (status === true) {
            sessionStorage.setItem("loggedIn", true);
            
        } else if (status === false) {
            sessionStorage.setItem("loggedIn", false);
        } else return;
        set({loggedIn: status});
    },

    addToast: (msg, status = 2, duration = 5000) => {
        const id = crypto.randomUUID();
        set((state) => ({ toasts: [...state.toasts, {id, msg, status}]}));
        setTimeout(() => get().removeToast(id), duration);
        return id;
    },

    removeToast: (id) => {
        set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id)}));
    }
}));