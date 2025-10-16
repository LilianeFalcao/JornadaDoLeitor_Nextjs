'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 1. Defina o esquema de validação (Zod)
const formSchema = z.object({
  apelido: z.string().min(2, "O apelido deve ter pelo menos 2 caracteres."),
  email: z.string().email("Formato de e-mail inválido."),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
  // 2. Inicialize o formulário com useForm e o resolver do Zod
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apelido: "",
      email: "",
      senha: "",
    },
  });

  // 3. Função que será executada ao submeter o formulário
  function onSubmit(values: FormValues) {
    console.log("Dados do formulário:", values);
    // Aqui você faria a lógica de criação de conta (API call)
  }

  return (
    <Form {...form}>
      {/* 4. Passe a função de submissão para o onSubmit do elemento <form> */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Campo 1: Apelido */}
        <FormField
          control={form.control} // 'form' agora está definido!
          name="apelido"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* 5. Espalhe as propriedades 'field' no seu <Input> */}
                <Input placeholder="Apelido" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Campo 2: E-mail */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="E-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Campo 3: Senha */}
        <FormField
          control={form.control}
          name="senha"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Crie sua conta</Button>
      </form>
    </Form>
  );
}