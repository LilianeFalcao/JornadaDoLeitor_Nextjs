import {
  MainContainer,
  Filtros,
  Search,
  FiltrosContainder,
} from "@/components/MainIndex/styles";
import { makeReadingUseCases } from "@/core/factories/makeReadingUseCases";
import { makeMangaUseCases } from "@/core/factories/makeMangaUseCases";
import Image from "next/image";
import { ReadingActions } from "@/components/ReadingActions/ReadingActions";
type Reading_Status = "reading" | "completed";

interface Reading {
  id: string;
  id_user: string;
  id_manga: string;
  progress: number;
  status: Reading_Status;
  current_chapter: number;
  notes: string;
}
interface Manga {
  id: string;
  title: string;
  img_URL: string;
  total_chapters: number;
}

// DEFINIÇÃO DA INTERFACE DO COMPONENTE CLIENTE DENTRO DO COMPONENTE SERVER
// ISSO É UM WORKAROUND PARA O ERRO DE TIPAGEM ENTRE MÓDULOS NO AMBIENTE DE COMPILAÇÃO
interface ReadingActionsProps {
  readingId: string;
  mangaTitle: string;
  id_user: string;
  id_manga: string;
  initialChapter: number;
  initialStatus: Reading_Status; // Tipo real do Use Case
  initialNotes: string;
  totalChapters: number;
}

export default async function MyProgress() {
  const readingsUseCases = makeReadingUseCases();
  const mangaUseCases = makeMangaUseCases();
  const userId = "user-1";

  // 1. Carregamento de dados (Tipagem explícita para forçar a compatibilidade)
  const readings: Reading[] = (await readingsUseCases.listUserReading.execute({
    id_user: userId,
  })) as Reading[]; // Asserção de tipo para corresponder à interface local

  const mangas: Manga[] = (await mangaUseCases.findAll.execute()) as Manga[];

  const getMangaById = (id_manga: string) =>
    mangas.find((manga) => manga.id === id_manga) || null;

  return (
    <MainContainer className="px-6 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Meu Progresso de Leitura
      </h1>
      <p className="text-gray-600 mb-8">
        Acompanhe e gerencie sua coleção de mangás
      </p>

      <FiltrosContainder className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <Search className="relative flex-1">
          <input
            type="search"
            placeholder="Buscar Mangás"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none shadow-sm"
          />
        </Search>
        <Filtros className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition">
            Todos
          </button>
          <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition">
            Completos
          </button>
          <button className="px-4 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition">
            Lendo...
          </button>
        </Filtros>
      </FiltrosContainder>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {readings.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">
            Nenhuma leitura encontrada.
          </p>
        ) : (
          readings.map((reading) => {
            const manga = getMangaById(reading.id_manga);
            const totalChapters = manga?.total_chapters || 1;

            // Asserção para o tipo do status na chamada do componente
            const status: Reading_Status = reading.status as Reading_Status;

            return (
              <div
                key={reading.id_manga}
                className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                {manga && (
                  <>
                    <div className="relative w-full h-56 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={manga.img_URL}
                        alt={manga.title}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-lg"
                      />
                    </div>

                    <p className="text-lg font-semibold text-gray-800 truncate mb-2">
                      {manga.title}
                    </p>
                  </>
                )}

                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p>
                    <strong>Progresso:</strong> {reading.progress.toFixed(1)}%
                  </p>
                  <p>
                    <strong>Status:</strong>
                    <span
                      className={`font-medium m-3 ${
                        reading.status === "completed"
                          ? "bg-emerald-600 p-1 text-[#ffffff] rounded-md "
                          : reading.status === "reading"
                          ? "bg-amber-600 p-1 text-[#ffffff] rounded-md "
                          : "bg-gray-600 p-1 text-[#ffffff] rounded-md "
                      }`}
                    >
                      {reading.status}
                    </span>
                  </p>
                  <ReadingActions
                    readingId={reading.id}
                    mangaTitle={manga?.title || "Mangá Desconhecido"}
                    id_user={reading.id_user}
                    id_manga={reading.id_manga}
                    initialChapter={reading.current_chapter}
                    totalChapters={totalChapters}
                  />
                </div>
              </div>
            );
          })
        )}
      </section>
    </MainContainer>
  );    
}
