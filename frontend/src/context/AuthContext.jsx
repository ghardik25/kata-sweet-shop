import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function safeParse(key) {
  try {
    const value = localStorage.getItem(key);
    if (!value || value === "undefined") return null;
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(safeParse("user"));

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
