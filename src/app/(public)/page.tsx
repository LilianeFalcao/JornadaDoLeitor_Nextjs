import {
  MainContainer,
  CardsContainer,
} from "@/components/MainIndex/styles";

import Image from "next/image";
import { makeReadingUseCases } from "@/core/factories/makeReadingUseCases";
import { makeMangaUseCases } from "@/core/factories/makeMangaUseCases";

export default async function Home() {

  const readingsUseCases = makeReadingUseCases();
  const mangaUseCases = makeMangaUseCases();
  const userId = "user-1";

  const readings = await readingsUseCases.listUserReading.execute({
    id_user: userId,
  });
  const mangas = await mangaUseCases.findAll.execute();

  const getMangaById = (id_manga: string) =>
    mangas.find((manga) => manga.id === id_manga) || null;

  return (
    <>
      <MainContainer>
        <h1>
          Veja o que a comunidade está lendo e compartilhe seu próprio progresso
        </h1>
        <CardsContainer>
          <section className="flex items-center gap-5 mt-8 space-y-4">
            {readings.length === 0 ? (
              <p className="text-gray-500">Nenhuma leitura encontrada.</p>
            ) : (
              readings.map((reading) => {
                const manga = getMangaById(reading.id_manga); 

                return (
                  <div
                    key={reading.id_manga}
                    className="border rounded-lg p-4 hover:bg-muted/30 transition"
                  >
                    {manga && (
                      <>
                        <h3><strong>{manga.title}</strong></h3>
                        <Image
                          src={manga.img_URL}
                          alt={manga.title}
                          width={160}
                          height={160}
                          style={{ objectFit: "cover" }}
                        />
                      </>
                    )}
                    <h2 className="mt-3">{reading.notes}</h2>
                  </div>
                );
              })
            )}
          </section>
        </CardsContainer>
      </MainContainer>
    </>
  );
}
