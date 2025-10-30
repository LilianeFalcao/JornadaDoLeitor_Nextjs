import {  
    MainContainer,
    CardsContainer,
    Card,
    CardText,
    CardImage,
    Progress,
    Actions 
} from "@/components/MainIndex/styles";

import Vinland from "../../assets/Manga_Vinland_Saga.jpg"
import Kimetsu from "../../assets/Manga_Kimetsu_No_Yaiba.jpg"
import Image from "next/image";

export default function Home() {
  return (
  <>
      <MainContainer>
        <h1>Veja o que a comunidade está lendo e compartilhe seu próprio progresso</h1>
        <CardsContainer>
            <Card>
                <CardImage>
                    <Image 
                    src={Vinland} 
                    alt="Capa do Mangá Vinland Saga" 
                    width={160} 
                    height={160}
                    style={{ objectFit: "cover" }}
                    />
                </CardImage>
                <CardText>
                    <h4>Vinland Saga</h4>
                    <p>Capítulos 120 de 220</p>
                    <label htmlFor="progresso-vinland">Progresso</label>
                    <Progress id="progresso-vinland" value="120" max="220">59%</Progress>

                    <Actions>
                        <button aria-label="Curtir Vinland Saga">Curtir</button>
                        <button aria-label="Comentar Vinland Saga">Comentar</button>
                    </Actions>
                </CardText>
            </Card>

            <Card>
                <CardImage>
                    <Image
                        src={Kimetsu} 
                        alt="Capa do Mangá Kimetsu no Yaiba" 
                        width={160} 
                        height={160} 
                        style={{ objectFit: "cover" }}
                    />
                </CardImage>
                <CardText>
                    <h4>Kimetsu no Yaiba</h4>
                    <p>Capítulos 205 de 205</p>
                    
                    <label htmlFor="progresso-kimetsu">Progresso</label>
                    <Progress id="progresso-kimetsu" value="205" max="205">100%</Progress>

                    <Actions>
                        <button aria-label="Curtir Kimetsu no Yaiba">Curtir</button>
                        <button aria-label="Comentar Kimetsu no Yaiba">Comentar</button>
                    </Actions>
                </CardText>
            </Card>

        </CardsContainer>
    </MainContainer>
  </>
  );
}
