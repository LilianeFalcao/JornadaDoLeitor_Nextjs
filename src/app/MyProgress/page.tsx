import Image from "next/image";
//Images
import Kimetsu from "@/assets/Manga_Kimetsu_No_Yaiba.jpg"
import Lixeira from "@/assets/Icon_Delete.png"
import Up from "@/assets/Icon_Edit.png"
import Doll from "@/assets/SonoBisqueDoll_Manga.jpg"
import { Card, CardsContainer,CardImage , CardText, MainContainer , Progress, Filtros, Search, FiltrosContainder} from "@/components/MainIndex/styles";


export default function MyProgress ( ) {
    return (
        <>
           <MainContainer>
                <h1>Meu Progresso de Leitura</h1>
                <p>Acompanhe e gerencie sua coleção de mangás</p>

                <FiltrosContainder>
                    <Search>
                        <input type="search" 
                        placeholder="Buscar Mangás" />
                    </Search>
                    <Filtros>
                        <button type="button">Todos</button>
                        <button type="button">Completos</button>
                        <button type="button">Lendo...</button>
                    </Filtros>
                </FiltrosContainder>

                <CardsContainer>
                    <Card>
                        <CardImage>
                            <Image 
                                src= {Kimetsu} 
                                alt="Capa do Mangá Kimetsu no Yaiba" />
                        </CardImage>
                        <CardText>
                            <h4>Kimetsu no Yaiba</h4>
                            <p>Completo</p>
                            <p>Capítulos 205 de 205</p>
                            <label htmlFor="progresso">Progresso</label>
                            <Progress id="progresso" value="205" max="205">100%</Progress>
                            <p>Atualizado em: 28-08-2025</p>
                            <nav>
                                <button>
                                    <Image 
                                        src= {Up} 
                                        alt="Editar" />
                                </button>
                                <button>
                                    <Image 
                                        src={Lixeira} 
                                        alt="Excluir" />
                                </button>
                            </nav>
                        </CardText>
                    </Card>

                    <Card>
                        <CardImage>
                            <Image 
                                src={Doll} 
                                alt="Capa do Mangá Sono Bisque Doll wa Koi wo Suru" />
                        </CardImage>
                        <CardText>
                            <h4>Sono Bisque Doll wa Koi wo Suru</h4>
                            <p>Completo</p>
                            <p>Capítulos 115.50 de 115.50</p>
                            <label htmlFor="progresso1">Progresso</label>
                            <Progress id="progresso1" value="115.50" max="115.50">
                                100%
                            </Progress>
                            <p>Atualizado em: 01-09-2025</p>
                            <nav>
                                <a href="#abrirModal">
                                    <Image 
                                        src={Up} 
                                        alt="Editar" />
                                </a>
                                <a>
                                    <Image 
                                        src={Lixeira}
                                        alt="Excluir" />
                                </a>
                            </nav>
                        </CardText>
                    </Card>
                </CardsContainer>
            </MainContainer>
        </>
    );
}