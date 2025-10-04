'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/lib/placeholder-data';
import { defaultUsers } from '@/lib/user-data';

type UserContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  isInitialized: boolean;
  handleLogin: (email: string, pass: string) => boolean;
  handleLogout: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(defaultUsers);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Simulate checking for a logged-in user in localStorage
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
    }
    setIsInitialized(true);
  }, []);

  const handleLogin = (email: string, pass: string): boolean => {
    const user = users.find(u => u.email === email && u.password === pass);
    if (user) {
      const userToStore = { ...user };
      delete userToStore.password; // Don't store password
      
      try {
        localStorage.setItem('currentUser', JSON.stringify(userToStore));
      } catch (error) {
          console.error("Failed to save user to localStorage", error);
      }
      
      setCurrentUser(userToStore);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('currentUser');
    } catch (error) {
        console.error("Failed to remove user from localStorage", error);
    }
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, users, setUsers, isInitialized, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
