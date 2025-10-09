import Image from "next/image";
import Logo from "../../assets/Logo.png"
import Link from "next/link";
import { HeaderContainer } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <Link href="#">
          <Image 
            src={Logo} alt="Logo do site Jornada do Leitor" 
            height={50} />
      </Link>

      <nav>
        <ul>
          <li>
            <Link href="/">Feed</Link>
          </li>
          <li>
            <Link href="myProgress">Meu Progresso</Link>
          </li>
          <li>
            <Link className="btn" href="#">
              + Adicionar Progresso
            </Link>
          </li>
        </ul>
      </nav>
    </HeaderContainer>
  );
}