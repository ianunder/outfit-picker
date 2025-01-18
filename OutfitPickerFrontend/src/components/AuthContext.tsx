import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (jwtToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      return true;
    }
    return false;
  });

  const login = (jwtToken: string) => {
    setIsAuthenticated(true);
    localStorage.setItem("jwtToken", jwtToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("jwtToken");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
