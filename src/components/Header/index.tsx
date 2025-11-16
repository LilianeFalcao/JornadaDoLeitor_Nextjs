'use client'

import Image from "next/image";
import Logo from "../../assets/Logo.png"
import Link from "next/link";
import { HeaderContainer } from "./styles";
import { AddMangaModal } from "../AddMangaModal/AddMangaModal";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { useCallback } from "react"; 

export function Header() {

  const {user, logout} = useAuth();
  const router = useRouter();

  const handleLogout = useCallback(() => {
      logout();
      router.push('/login');
  }, [logout, router]);

  return (
    <HeaderContainer>
      <Link href="/">
          <Image 
            src={Logo} alt="Logo do site Jornada do Leitor" 
            height={50} />
      </Link>
      <nav>
        <input type="checkbox" id="menu-toggle" hidden /> 

        <label htmlFor="menu-toggle" aria-label="Abrir Menu de Navegação">
            <span></span>
            <span></span>
            <span></span>
        </label>

        <div className="nav-menu">
          {user ? (
            <ul>
              <li>
                <span>Olá, {user.nickname?.value}</span> 
              </li>
              <li>
                <Link href="/">Feed</Link>
              </li>
              <li>
                <Link href="/myProgress">Meu Progresso</Link>
              </li>
              <li>
                <AddMangaModal />
              </li>
              <li>
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