import {
  CardsContainer,
  MainContainer,
  Filtros,
  Search,
  FiltrosContainder,
} from "@/components/MainIndex/styles";
//import {  useState } from "react";
import { Readings } from "@/core/domain/entity/Readings";
import { Mangas } from "@/core/domain/entity/Mangas";
import { makeReadingUseCases } from "@/core/factories/makeReadingUseCases";
import { makeMangaUseCases } from "@/core/factories/makeMangaUseCases";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
//import { toast } from "sonner";

//import Image from "next/image";

export default async function MyProgress() {
  // const [readings, setReadings] = useState<Readings[]>([]);
  // const [mangas, setMangas] = useState<Mangas[]>([]);
  // const [selectedReading, setSelectedReading] = useState<Readings | null>(null);
  // const [selectedManga, setSelectedManga] = useState<Mangas | null>(null);
  // const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);

  const readingsUseCases = makeReadingUseCases();
  const mangaUseCases = makeMangaUseCases();
  const userId = "user-1";

  // const loadReadingsAndMangas = useCallback(async () => {
  //   try {
  const readings = await readingsUseCases.listUserReading.execute({
    id_user: userId,
  });
  const mangas = await mangaUseCases.findAll.execute();
  // setReadings(data);
  // setMangas(dataMangas);
  //   } catch (error) {
  //     console.error("Erro ao carregar leituras ou mangás:", error);
  //     setReadings([]);
  //     setMangas([]);
  //   }
  // }, [readingsUseCases, mangaUseCases, userId]);

  // useEffect(() => {
  //     loadReadingsAndMangas();
  // }, [loadReadingsAndMangas]);

  const getMangaById = (id_manga: string) =>
    mangas.find((manga) => manga.id === id_manga) || null;

  // const openModal = (reading: Readings, type: "edit" | "delete") => {
  //   const manga = getMangaById(reading.id_manga);
  //   if (!manga) return toast.error("Mangá não encontrado.");
  //   setSelectedReading(reading);
  //   setSelectedManga(manga);
  //   setModalType(type);
  // };

  // const closeModal = () => {
  //   setModalType(null);
  //   setSelectedManga(null);
  //   setSelectedReading(null);
  // };

  return (
    <MainContainer>
      <h1>Meu Progresso de Leitura</h1>
      <p>Acompanhe e gerencie sua coleção de mangás</p>

      <FiltrosContainder>
        <Search>
          <input type="search" placeholder="Buscar Mangás" />
        </Search>
        <Filtros>
          <button type="button">Todos</button>
          <button type="button">Completos</button>
          <button type="button">Lendo...</button>
        </Filtros>
      </FiltrosContainder>

      <CardsContainer>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {readings.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 text-lg italic">
              Nenhuma leitura encontrada.
            </p>
          ) : (
            readings.map((reading) => {
              const manga = getMangaById(reading.id_manga);
              return (
                <div
                  key={reading.id_manga}
                  className="flex flex-col items-center bg-white border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  {manga && (
                    <>
                      <img
                        src={manga.img_URL}
                        alt={manga.title}
                        width={150}
                        height={200}
                        className="w-32 h-44 object-cover rounded-lg mb-4 shadow-sm"
                      />
                      <p className="text-center text-gray-800 font-semibold text-lg mb-2">
                        {manga.title}
                      </p>
                    </>
                  )}
                  <div className="w-full text-sm text-gray-600 mb-4">
                    <p className="flex justify-between">
                      <span>Progresso:</span>
                      <span className="font-medium text-gray-800">
                        {reading.progress.toFixed(1)}%
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span>Status:</span>
                      <span className="font-medium text-gray-800">
                        {reading.status}
                      </span>
                    </p>
                  </div>

                  <div className="flex justify-center gap-3 mt-auto">
                    <button className="px-4 py-2 text-sm font-medium rounded-xl bg-indigo-500 text-white hover:bg-blue-600 transition">
                      Editar
                    </button>
                    <button className="px-4 py-2 text-sm font-medium rounded-xl bg-red-500 text-white hover:bg-red-600 transition">
                      Excluir
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </section>
      </CardsContainer>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Adicionar Progresso</Button>
        </DialogTrigger>
        
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Mangá à sua Lista</DialogTitle>
            <p>Procure um título de mangá para adicionar à sua lista de leitura</p>
          </DialogHeader>
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <h2 className="text-lg font-bold mb-3">Editar progresso de</h2>
              <form className="flex flex-col gap-3">
                <label>Capítulo Atual</label>
                <input type="number" className="border rounded px-2 py-1" />
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    className="px-3 py-1 bg-gray-300 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Atualizar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MainContainer>
  );
}
