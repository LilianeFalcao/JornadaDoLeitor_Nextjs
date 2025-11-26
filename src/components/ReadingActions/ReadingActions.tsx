"use client";

import { useState, FormEvent, Fragment, ReactNode, MouseEvent } from "react";
import { toast } from "sonner";

/* ============================================================
   MOCKS DE COMPONENTES (para funcionar fora do projeto real)
   Em produção, substitua pelos imports corretos.
   ============================================================*/

// --- Button (Mock) ---
interface MockButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
  asChild?: boolean;
}

const Button = ({
  children,
  className = "",
  onClick,
  type = "button",
  asChild = false,
}: MockButtonProps) => {
  if (asChild) return <>{children}</>;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition ${className}`}
    >
      {children}
    </button>
  );
};

// --- Dialog (Mock) ---
interface MockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

const Dialog = ({ open, onOpenChange, children }: MockDialogProps) => {
  if (!open) return null;

  const closeOnBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onOpenChange(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={closeOnBackdrop}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

const DialogHeader = ({ children }: { children: ReactNode }) => (
  <header className="mb-4">{children}</header>
);

const DialogTitle = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;

/* ============================================================
   MOCK DOS USE CASES TIPADOS
   ============================================================*/

interface UpdateReadingParams {
  id_user: string;
  id_manga: string;
  new_current_chapter: number;
  total_chapters: number;
}

interface DeleteReadingParams {
  id_user: string;
  id_manga: string;
}

const mockUseCases = {
  updateReading: {
    execute: async (params: UpdateReadingParams) => {
      console.log("MOCK UPDATE:", params);
      await new Promise((res) => setTimeout(res, 500));
    },
  },
  deleteReading: {
    execute: async (params: DeleteReadingParams) => {
      console.log("MOCK DELETE:", params);
      await new Promise((res) => setTimeout(res, 500));
    },
  },
};

/* ============================================================
   COMPONENTE PRINCIPAL
   ============================================================*/

interface ReadingActionsProps {
  readingId: string;
  mangaTitle: string;
  id_user: string;
  id_manga: string;
  initialChapter: number;
  totalChapters: number;
}

export function ReadingActions({
  mangaTitle,
  id_user,
  id_manga,
  initialChapter,
  totalChapters,
}: ReadingActionsProps) {
  const [currentChapter, setCurrentChapter] = useState(initialChapter);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const readingsUseCases = mockUseCases;

  const refreshData = () => {
    console.log("MOCK refresh()");
  };

  /* ------------------------ UPDATE ------------------------ */
  const handleUpdateReading = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await readingsUseCases.updateReading.execute({
        id_user,
        id_manga,
        new_current_chapter: currentChapter,
        total_chapters: totalChapters,
      });

      setIsEditDialogOpen(false);
      refreshData();
      toast.success("Progresso atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar progresso.");
    }
  };

  /* ------------------------ DELETE ------------------------ */
  const handleDeleteReading = async () => {
    try {
      await readingsUseCases.deleteReading.execute({
        id_user,
        id_manga,
      });

      setIsDeleteDialogOpen(false);
      refreshData();
      toast.success(`${mangaTitle} removido com sucesso!`);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar mangá.");
    }
  };

  /* ============================================================
     RENDER
     ============================================================*/

  return (
    <div className="flex justify-between gap-3">
      {/* --- Botão Editar --- */}
      <Button
        className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-xl shadow-sm"
        onClick={() => {
          setCurrentChapter(initialChapter);
          setIsEditDialogOpen(true);
        }}
      >
        Editar
      </Button>

      {/* --- Modal Editar --- */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-6 max-w-md">
          <DialogHeader>
            <DialogTitle>
              Editar progresso de{" "}
              <span className="text-cyan-700">{mangaTitle}</span>
            </DialogTitle>
            <p className="text-gray-500 text-sm mt-1">
              Atualize o capítulo atual e mantenha o progresso sincronizado.
            </p>
          </DialogHeader>

          <form className="flex flex-col gap-4 mt-4" onSubmit={handleUpdateReading}>
            <label className="text-gray-700 font-medium text-sm">
              Capítulo Atual{" "}
              <span className="text-gray-500">(Máx: {totalChapters})</span>
            </label>

            <input
              type="number"
              value={currentChapter}
              min={0}
              max={totalChapters}
              onChange={(e) => setCurrentChapter(Number(e.target.value) || 0)}
              className="border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-cyan-500 bg-gray-50"
            />
            <label className="text-gray-700 font-medium text-sm">
                Notas
            </label>
                <textarea 
                id="notas" 
                name="notas"
                placeholder="Adicione notas sobre seus momentos favoritos">
            </textarea>
            <label className="text-gray-700 font-medium text-sm">
                Status de Leitura
            </label>
            <select 
                id="statusLeitura" 
                name="statusLeitura">
                <option value="Completo">Completo</option>
                <option value="Lendo">Lendo</option>
            </select>
            <div className="flex justify-end gap-3 pt-3">
              <Button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow-sm"
              >
                Atualizar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* --- Botão Deletar --- */}
      <Button
        className="flex flex-row justify-center bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl shadow-sm"
        onClick={() => setIsDeleteDialogOpen(true)}
      >
        Deletar
      </Button>

      {/* --- Modal Deletar --- */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl p-6 max-w-md">
          <DialogHeader>
            <DialogTitle>
              Remover <span className="text-red-600">{mangaTitle}</span>?
            </DialogTitle>
            <p className="text-gray-500 text-sm mt-1">
              Esta ação é permanente e não poderá ser desfeita.
            </p>
          </DialogHeader>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>

            <Button
              type="button"
              onClick={handleDeleteReading}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm"
            >
              Deletar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
