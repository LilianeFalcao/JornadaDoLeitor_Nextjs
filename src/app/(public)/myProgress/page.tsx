import {
  MainContainer,
  Filtros,
  Search,
  FiltrosContainder,
} from "@/components/MainIndex/styles";
import { makeReadingUseCases } from "@/core/factories/makeReadingUseCases";
import { makeMangaUseCases } from "@/core/factories/makeMangaUseCases";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function MyProgress() {
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
                  <p  >
                    <strong>Status:</strong>
                    <span
                      className={`font-medium m-3 ${
                        reading.status === "completed"
                          ? "bg-emerald-600 p-1 text-[#ffffff] rounded-md "
                          : reading.status === "reading"
                          ? "bg-amber-600 p-1 text-[#ffffff] rounded-md "  
                          : "bg -gray-600 p-1 text-[#ffffff] rounded-md "
                      }`}
                    >
                      {reading.status}
                    </span>
                  </p>
                </div>

                <div className="flex justify-between gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 rounded-lg transition">
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white rounded-lg shadow-xl">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-gray-800">
                          Editar progresso de {manga?.title}
                        </DialogTitle>
                        <p className="text-gray-500 text-sm mt-1">
                          Atualize o capítulo atual para manter seu progresso
                          sincronizado.
                        </p>
                      </DialogHeader>
                      <form className="flex flex-col gap-4 mt-4">
                        <label className="text-gray-700 font-medium text-sm">
                          Capítulo Atual
                        </label>
                        <input
                          type="number"
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 outline-none"
                        />
                        <div className="flex justify-end gap-3">
                          <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition"
                          >
                            Atualizar
                          </button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition">
                        Deletar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white rounded-lg shadow-xl">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-gray-800">
                          Remover {manga?.title}?
                        </DialogTitle>
                        <p className="text-gray-500 text-sm mt-1">
                          Esta ação é irreversível. Deseja realmente excluir
                          este mangá da sua lista?
                        </p>
                      </DialogHeader>
                      <div className="flex justify-end gap-3 mt-6">
                        <button
                          type="button"
                          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                        >
                          Deletar
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            );
          })
        )}
      </section>
    </MainContainer>
  );
}
