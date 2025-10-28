'use client'

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
//card Login
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";


export default function LoginPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {login } = useAuth()
    const router = useRouter()

    const handleLogin = async () => {
        try{
            const success = await login(email, password)
            if(success) {
                toast.success('Login successful!')

                router.push("/")
            }else{
                toast.error("Invalid credentials. Please try again.")
            }
        } catch (err) {
            toast.error(String(err))
        }
    }

    return(
    <main className="flex items-center justify-center h-screen bg-[#1e272e]">
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Entre para Jornada do Leitor</CardTitle>
                <CardDescription>Acompanhe seu progresso na leitura de mangás e compartilhe com a comunidade.</CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Input 
                    id="email" 
                    type="email" 
                    placeholder="seu@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Input 
                    id="password" 
                    type="password" 
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                </div>
            </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 justify-between">
                <Button className="bg-[#455a64] w-full cursor-pointer hover:bg-[#569cbcff] " onClick={handleLogin}>Entrar</Button>
                <div className="flex items-center space-x-2 "> 
                    <p className="m-0">
                        Primeira vez aqui?
                    </p>
                    <Button className="p-2 border-none cursor-pointer " variant="outline" onClick={() => router.push("/register")}>
                        Cadastre-se
                    </Button>
                </div>
            </CardFooter>
        </Card>
</main>   
    );
}