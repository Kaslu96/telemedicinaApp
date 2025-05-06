
export function login() {
    localStorage.setItem("auth", "true");
    localStorage.setItem("rol", "admin");
    localStorage.setItem("idUser", 1);
  }
  
  export function logout() {
    localStorage.removeItem("auth");
    localStorage.removeItem("rol");
  }
  
  export function isAuthenticated() {
    if (typeof window === "undefined") return false; // evita error en SSR
    return localStorage.getItem("auth") === "true";
  }