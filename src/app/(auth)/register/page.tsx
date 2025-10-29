'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"
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
import { LoginContainer } from "../login/styles"

export default function RegisterPage() {
  const [nick, setNick] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { register } = useAuth()
  const router = useRouter()

  const handleRegister = async () => {
    if (!nick || !email || !password) {
      toast.error("All fields are required.")
      return
    }
    try {
      const success = await register(nick, email, password)
      if (success) {
        toast.success("Registration complete!")
        router.push("/login")
      } else {
        toast.error("This email address is already in use.")
      }
    } catch (error) {
      console.log(error)
      toast.error(String(error))
    }
  }

  return (
    <LoginContainer>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Criar Conta</CardTitle>
          <CardDescription>
            Crie sua conta para começar a colecionar.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="nick"
                  placeholder="Seu Apelido"
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

        <CardFooter className="flex flex-col items-center gap-3">
          <div className="flex justify-between w-full">
            <Button className="bg-[#455a64] w-75" onClick={handleRegister}>
              Criar
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            Já possui conta?{" "}
            <Button
              className="text-blue-500 hover:underline border-none"
              variant="outline"
              onClick={() => router.push("/login")}
            >
              Entre aqui
            </Button>
          </p>
        </CardFooter>
      </Card>
    </LoginContainer>
  )
}
