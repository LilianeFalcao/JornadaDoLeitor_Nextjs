'use client'

import { createContext, useState, useContext, ReactNode } from "react"
import { makeUserUseCases } from "@/core/factories/makeUserUseCases"
import { User } from "@/core/domain/entity/User"

//Define tipo do context
interface AuthContextType {
    user: User | null;
    login: (email: string, pass: string) => Promise<boolean>;
    logout: () => void;
    register: (nick: string, email: string, pass: string) => Promise<boolean>;
}

//Cria o context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//Criando o component Provider
export function AuthProvider({children}: {children: ReactNode}){
    const [user, setUser] = useState<User | null>(null);
    const userUseCases = makeUserUseCases();

    const login = async(email: string, pass: string) => {
        console.log(login)
         
        const foundUser = await userUseCases.loginUser.execute({ email, password: pass });
        if (foundUser) {
        setUser(foundUser);
        return true;
        }
        return false;
    }

    const logout = () => {
        setUser(null);
    };
    
    const register = async (nick: string, email: string, pass: string) => {
        const existingUser = await userUseCases.findByEmail.execute({ email })
        if (existingUser) {
        return false; // User already exists
        }
        await userUseCases.registerUser.execute({ nickname: nick, email, password: pass })
        return true;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
        {children}
        </AuthContext.Provider>
    );
}
// Crie um hook personalizado para usar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}