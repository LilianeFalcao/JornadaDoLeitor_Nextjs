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
}