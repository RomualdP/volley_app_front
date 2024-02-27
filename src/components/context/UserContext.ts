'use client'
import React, { createContext, useContext} from 'react';
import { User } from '@supabase/supabase-js'

interface UserContextType {
  userData: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};