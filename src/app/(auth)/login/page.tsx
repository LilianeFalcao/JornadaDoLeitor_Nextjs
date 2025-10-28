<<<<<<< HEAD
import Image from "next/image";
import Jujustsu from "@/assets/Manga_Jujutsu_Kaisen.jpg"
import { LoginForm } from "@/components/Forms/LoginForm";
import { LoginContainer } from "./styles";
import Link from "next/link";

export default function LoginPage(){
    return(
        <LoginContainer>
            <figure>
                <Image 
                    src={Jujustsu} 
                    alt="Jujutsu_Kaisen_Cap22"
                    />
            </figure>
            <section>
                <h1>Entre para Jornada do Leitor</h1>
                <p> Acompanhe seu progresso na leitura de mangás e compartilhe com a comunidade </p>
                <LoginForm />
                <p>
                    Sua primeira vez aqui? 
                    <Link href="/register"> Cadastre-se</Link>
                </p>
            </section>
        </LoginContainer>
    );
=======
'use client'

import Image from "next/image";
import Jujustsu from "@/assets/Manga_Jujutsu_Kaisen.jpg"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner"
import { LoginContainer } from "./styles";

export default function LoginPage() {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login } = useAuth()
    const router = useRouter()

    const handleLogin = async () => {
        try {
        const success = await login(email, password)
        
        if (success) {
            toast.success("Login Realizado!")
            router.push("/")
        } else {
            toast("Credenciais inválidas. Tente novamente.")
        }
        } catch (error) {
        toast.error(String(error))
        }
    }

  return (
    <LoginContainer>
        <Card className="flex flex-col justify-center">
            <CardHeader className="flex flex-col items-center gap-3">
            <CardTitle >Entre para Jornada do Leitor</CardTitle>
            <CardDescription>Acompanhe seu progresso na leitura de mangás e compartilhe com a comunidade.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center">
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
                <div className="flex flex-col items-center w-75 space-y-1.5">
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
            <CardFooter className="flex flex-col items-center w-100 gap-3">
                <Button className="cursor-pointer bg-[#455a64] w-75" onClick={handleLogin}>Entre</Button>
                <p className="text-sm text-black" >Sua primeira vez aqui?
                    <Button className="border-none cursor-pointer text-blue-600 hover:underline" variant="outline" onClick={() => router.push("/register")}> Cadastre-se</Button>
                </p>
            </CardFooter>
        </Card>
        <figure>
            <Image src={Jujustsu} alt="Capa jujutsu kaisen cap.22"/>
        </figure>
    </LoginContainer>
  );
>>>>>>> 58dbd8af2c8968391a73ea820dc1f7d8434abfc8
}