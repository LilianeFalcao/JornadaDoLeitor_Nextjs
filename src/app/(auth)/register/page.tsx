'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function RegisterPage() {
  const [nick, setNick] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { register } = useAuth()
  const router = useRouter()

  const handleRegister = async () => {
    if (!nick || !email || !password) {
      toast.error("Todos os campos são obrigatórios.")
      return
    }
    try {
      const success = await register(nick, email, password)
      if (success) {
        toast.success("Cadastro Realizado!")
        router.push("/login")
      } else {
        toast.error("Este email já está em uso.")
      }
    } catch (error) {
      toast.error(String(error))
    }
  }

  return (
    <main className="flex items-center justify-center h-screen bg-[#1e272e]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Criar Conta</CardTitle>
          <CardDescription>Acompanhe seu progresso na leitura de mangás e compartilhe com a comunidade.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
            <div className="grid w-full items-center gap-4 m-2">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="nick"
                  placeholder="Insira seu apelido"
                  value={nick}
                  onChange={(e) => setNick(e.target.value)}
                  required
                />
              </div>
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
            <Button className="bg-[#455a64] w-full cursor-pointer hover:bg-[#569cbcff] " onClick={handleRegister}>Cadastre-se</Button>
            <div className="flex items-center space-x-2 "> 
                <p className="text-sm text-gray-700">
                    Já tem conta?
                </p>
                <Button className="text-blue-400 hover:underline border-none cursor-pointer " variant="outline" onClick={() => router.push("/login")}>
                    Entre
                </Button>
            </div>
        </CardFooter>
      </Card>
    </main>
  )
}