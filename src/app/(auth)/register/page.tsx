//import Image from "next/image";

import { LoginForm } from "@/components/Forms/LoginForm"
import { LoginContainer } from "../login/styles";
import Link from "next/link";

export default function RegisterPage(){
    return(
        <>
           <LoginContainer>
                <figure>
                </figure>
                <section>
                    <h1>Crie uma conta</h1>
                    <p> Acompanhe seu progresso na leitura de mangás e compartilhe com a comunidade </p>
                        <LoginForm />
                    <p>
                        Já tem conta? 
                        <Link href="/login" > Entre </Link>
                    </p>
                </section>
            </LoginContainer>
        </>
    );
}