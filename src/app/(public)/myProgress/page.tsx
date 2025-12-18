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

// Definindo os tipos para garantir consistência
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

export default async function MyProgress() {
  const readingsUseCases = makeReadingUseCases();
  const mangaUseCases = makeMangaUseCases();
  const userId = "user-1"; // Idealmente viria de uma sessão/auth

  // Carregamento de dados no lado do servidor
  const readingsRaw = await readingsUseCases.listUserReading.execute({
    id_user: userId,
  });
  
  // Tipagem segura dos dados vindos do Use Case
  const readings = readingsRaw as Reading[];
  const mangas = (await mangaUseCases.findAll.execute()) as Manga[];

  const getMangaById = (id_manga: string) =>
    mangas.find((manga) => manga.id === id_manga) || null;

  return (
    <MainContainer className="px-6 py-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Meu Progresso de Leitura
        </h1>
        <p className="text-gray-600">
          Acompanhe e gerencie sua coleção de mangás
        </p>
      </header>

      <FiltrosContainder className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 rounded-2xl p-4 min-[386px]:p-5 bg-white shadow-sm">
      <Search className="relative flex-1 w-full">
        <input
          type="search"
          placeholder="Buscar Mangás"
          className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none shadow-sm text-gray-700"
        />
      </Search>

      {/* Ajuste nos botões para não estourarem em telas menores que 386px */}
      <Filtros className="flex flex-wrap gap-2 min-[386px]:gap-3">
        <button className="flex-1 min-[386px]:flex-none px-3 min-[386px]:px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition shadow-sm text-sm min-[386px]:text-base">
          Todos
        </button>
        <button className="flex-1 min-[386px]:flex-none px-3 min-[386px]:px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition text-sm min-[386px]:text-base">
          Completos
        </button>
        <button className="flex-1 min-[386px]:flex-none px-3 min-[386px]:px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition text-sm min-[386px]:text-base">
          Lendo...
        </button>
      </Filtros>
    </FiltrosContainder>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {readings.length === 0 ? (
          <div className="text-gray-500 text-center col-span-full py-20 border-2 border-dashed border-gray-200 rounded-2xl">
            Nenhuma leitura encontrada.
          </div>
        ) : (
          readings.map((reading) => {
            const manga = getMangaById(reading.id_manga);
            const totalChapters = manga?.total_chapters || 1;

            return (
              <div
                key={reading.id}
                className="flex flex-col border border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                {manga && (
                  <>
                    <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-gray-100">
                      <Image
                        src={manga.img_URL}
                        alt={manga.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform hover:scale-105 duration-300"
                        priority={false}
                      />
                    </div>
                    <h2 className="text-lg font-bold text-gray-800 truncate mb-3">
                      {manga.title}
                    </h2>
                  </>
                )}

                <div className="text-sm text-gray-600 space-y-3 mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Progresso</span>
                    <span className="text-cyan-600 font-bold">{reading.progress.toFixed(0)}%</span>
                  </div>
                  
                  {/* Barra de progresso visual */}
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-cyan-500 h-2 rounded-full" 
                      style={{ width: `${Math.min(reading.progress, 100)}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-medium">Status:</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-semibold uppercase tracking-wider ${
                        reading.status === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {reading.status === "completed" ? "Concluído" : "Lendo"}
                    </span>
                  </div>

                  {/* IMPORTANTE: Passando todas as props para o Client Component */}
                  <div className="pt-4 border-t border-gray-50">
                    <ReadingActions
                      readingId={reading.id}
                      mangaTitle={manga?.title || "Mangá"}
                      id_user={reading.id_user}
                      id_manga={reading.id_manga}
                      initialChapter={reading.current_chapter}
                      initialStatus={reading.status}
                      initialNotes={reading.notes}
                      totalChapters={totalChapters}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>
    </MainContainer>
  );    
}