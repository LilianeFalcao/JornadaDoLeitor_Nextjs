<<<<<<< HEAD
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
                    <p className="text-sm text-gray-700">
                        Primeira vez aqui?
                    </p>
                    <Button className="text-blue-400 hover:underline border-none cursor-pointer " variant="outline" onClick={() => router.push("/register")}>
                        Cadastre-se
                    </Button>
                </div>
            </CardFooter>
        </Card>
</main>   
    );
=======
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
>>>>>>> 55a7e8956e83ca4fef89d7bec2cbce7faed2f279
}