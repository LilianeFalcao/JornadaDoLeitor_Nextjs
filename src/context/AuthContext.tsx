'use client'

import { createContext, useState, useContext, ReactNode } from 'react';
import { makeUserUseCases } from '@/core/factories/makeUserUseCases';
import { User } from '@/core/domain/entity/User';


// Define the context type
interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  register: (nickname: string, email: string, pass: string) => Promise<boolean>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const userUseCases = makeUserUseCases();

  const login = async (email: string, pass: string) => {
    console.log(email, pass)
    const foundUser = await userUseCases.loginUser.execute({ email, password: pass });
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (nickname: string, email: string, pass: string) => {
    const existingUser = await userUseCases.findByEmail.execute({ email })
    if (existingUser) {
      return false;
    }
    await userUseCases.registerUser.execute({ nickname, email, password: pass })
    return true;
  };

   return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context
}