import { MainContainer, CardsContainer } from "@/components/MainIndex/styles";

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
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14 w-full">
            {readings.length === 0 ? (
              <p className="text-gray-500 text-lg">
                Nenhuma leitura encontrada.
              </p>
            ) : (
              readings.map((reading) => {
                const manga = getMangaById(reading.id_manga);

                return (
                  <article
                    key={reading.id_manga}
                    className="
            group relative overflow-hidden rounded-3xl
            bg-neutral-950 border border-white/5 
            shadow-xl hover:shadow-3xl
            transition-all duration-300
          "
                  >
                    {manga && (
                      <div className="relative">
                        {/* Imagem com estilo cinematográfico */}
                        <div className="w-full h-72 overflow-hidden">
                          <Image
                            src={manga.img_URL}
                            alt={manga.title}
                            fill
                            className="
                    object-cover
                    grayscale group-hover:grayscale-0 
                    opacity-80 group-hover:opacity-100
                    transition-all duration-700
                  "
                          />
                        </div>

                        {/* Título sobreposto */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                          <h2 className="text-white font-semibold text-xl tracking-wide drop-shadow-lg">
                            {manga.title}
                          </h2>
                        </div>
                      </div>
                    )}

                    {/* Bloco de notas SUPER destacado */}
                    <div
                      className="
              p-6 flex flex-col gap-4 
              bg-neutral-900/80 backdrop-blur-xl
            "
                    >
                      <span className="text-xs font-medium text-blue-400 tracking-wider uppercase">
                        ✦ Comentário do Leitor
                      </span>

                      <div
                        className="
                p-5 rounded-2xl 
                bg-gradient-to-br from-neutral-800 to-neutral-900 
                border border-neutral-700/60
                shadow-md shadow-black/40
                text-gray-200 leading-relaxed font-light
                italic tracking-wide
                group-hover:border-neutral-500/50
                transition-all duration-300
              "
                      >
                        “{reading.notes}”
                      </div>
                    </div>
                    <footer
                      className="
                        px-6 py-4 text-xs 
                        border-t border-white/10 flex items-center justify-end
                        text-neutral-400
                      "
                      ></footer>
                  </article>
                );
              })
            )}
          </section>
        </CardsContainer>
      </MainContainer>
    </>
  );
}
