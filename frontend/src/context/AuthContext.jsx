import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const token = localStorage.getItem('token');
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
  }, []);
  const value = { user, setUser: (u) => { setUser(u); localStorage.setItem('user', JSON.stringify(u)); } };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
