import Image from "next/image";
import Jujustsu from "../../../assets/Manga_Jujutsu_Kaisen.jpg"

export default function LoginPage(){
    return(
        <>
            <figure>
                <Image 
                    src={Jujustsu} 
                    alt="Jujutsu_Kaisen_Cap22"
                    />
            </figure>
            <section>
                <h1>Entre para Jornada do Leitor</h1>
                <p> Acompanhe seu progresso na leitura de mangás e compartilhe com a comunidade </p>
            </section>
        </>
    );
}