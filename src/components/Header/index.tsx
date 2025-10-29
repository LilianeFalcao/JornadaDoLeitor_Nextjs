'use client'

import Image from "next/image";
import Logo from "../../assets/Logo.png"
import Link from "next/link";
import { HeaderContainer } from "./styles";
import { AddMangaModal } from "../AddMangaModal/AddMangaModal";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
// 💡 Importe o useCallback
import { useCallback } from "react"; 

export function Header() {
  const {user, logout} = useAuth();
  const router = useRouter();

  // 🚀 Usando useCallback para memorizar a função handleLogout
  // A função só é recriada se 'logout' ou 'router' mudarem.
  const handleLogout = useCallback(() => {
      logout();
      router.push('/login');
  }, [logout, router]);

  return (
    <HeaderContainer>
      {/* 💡 Boa prática: href="/" para a home page */}
      <Link href="/">
          <Image 
            src={Logo} alt="Logo do site Jornada do Leitor" 
            height={50} />
      </Link>

      <nav>
        <div>
          {user ? (
            <ul>
              <li>
                {/* 💡 Uso de encadeamento opcional para segurança */}
                <span>Olá, {user.nickname?.value}</span> 
              </li>
              <li>
                <Link href="/">Feed</Link>
              </li>
              <li>
                {/* 💡 Recomendo prefixar o link com '/' para ser absoluto, ex: "/myProgress" */}
                <Link href="/myProgress">Meu Progresso</Link>
              </li>
              <li>
                <AddMangaModal />
              </li>
              <li>
                {/* O botão agora usa a função memorizada */}
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          ):(
            <Link href="/login">Login</Link>
          )}
        </div>


        
      </nav>
    </HeaderContainer>
  );
}