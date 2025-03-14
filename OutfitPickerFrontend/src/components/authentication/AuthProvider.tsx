import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (jwtToken: string, uname : string, uid: number) => void;
  logout: () => void;
  user: User | null;
}

type User = { id: number; name: string};

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

  const login = (jwtToken: string, uname: string, uid: number) => {
    setIsAuthenticated(true);
    const user = {id: uid , name: uname}
    setUser(user);
    localStorage.setItem("jwtToken", jwtToken);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
  };

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  }

  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout , user}}>
      {children}
    </AuthContext.Provider>
  );
};
