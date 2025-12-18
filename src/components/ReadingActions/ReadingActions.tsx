"use client";

import React, { useState, FormEvent, ReactNode } from "react";
import { toast } from "sonner";

/* ============================================================
   INTERFACES DE TIPAGEM (Substituindo o 'any')
   ============================================================*/

interface MockButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

interface MockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

interface ReadingActionsProps {
  readingId: string;
  mangaTitle: string;
  id_user: string;
  id_manga: string;
  initialChapter: number;
  initialStatus?: string;
  initialNotes?: string;
  totalChapters: number;
}

/* ============================================================
   COMPONENTES MOCKADOS (Tipados)
   ============================================================*/

const Button = ({ 
  children, 
  className = "", 
  onClick, 
  type = "button", 
  disabled = false 
}: MockButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg transition-all active:scale-95 disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);

const Dialog = ({ open, onOpenChange, children }: MockDialogProps) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={() => onOpenChange(false)} 
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
        {children}
      </div>
    </div>
  );
};

/* ============================================================
   COMPONENTE PRINCIPAL
   ============================================================*/

export function ReadingActions({
  mangaTitle,
  initialChapter,
  initialStatus = "reading",
  initialNotes = "",
  totalChapters,
}: ReadingActionsProps) {
  
  // Estados tipados corretamente
  const [currentChapter, setCurrentChapter] = useState<number>(initialChapter);
  const [notes, setNotes] = useState<string>(initialNotes);
  const [status, setStatus] = useState<string>(initialStatus);
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Reseta os dados ao abrir o modal para evitar glitches entre mangás diferentes
  const openEditModal = () => {
    setCurrentChapter(initialChapter);
    setNotes(initialNotes);
    setStatus(initialStatus);
    setIsEditDialogOpen(true);
  };

  const handleUpdateReading = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulação de delay de rede
      await new Promise((resolve) => setTimeout(resolve, 600)); 
      
      setIsEditDialogOpen(false);
      toast.success(`${mangaTitle} atualizado!`);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar progresso.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-between gap-3 w-full">
      {/* Botão Editar */}
      <Button
        className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-medium shadow-md"
        onClick={openEditModal}
      >
        Editar
      </Button>

      {/* Modal Editar */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Editar <span className="text-cyan-600">{mangaTitle}</span>
          </h2>
          <p className="text-gray-500 text-sm">Ajuste seu progresso de leitura.</p>
        </div>

        <form className="space-y-4" onSubmit={handleUpdateReading}>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Capítulo Atual</label>
            <input
              type="number"
              value={currentChapter}
              min={0}
              max={totalChapters}
              onChange={(e) => setCurrentChapter(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-cyan-500 outline-none bg-gray-50 text-gray-900"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Notas</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Momentos favoritos..."
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-cyan-500 outline-none bg-gray-50 resize-none text-sm text-gray-900"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-cyan-500 outline-none bg-gray-50 text-sm text-gray-900 cursor-pointer"
            >
              <option value="reading">Lendo</option>
              <option value="completed">Completo</option>
              <option value="dropped">Parei de ler</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              className="bg-gray-100 hover:bg-gray-200 text-gray-700"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-cyan-600 text-white shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Botão Remover */}
      <Button
        className="bg-red-50 text-red-600 hover:bg-red-100 font-medium"
        onClick={() => setIsDeleteDialogOpen(true)}
      >
        Remover
      </Button>

      {/* Modal Deletar */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <h2 className="text-lg font-bold text-gray-800 mb-2">Remover da lista?</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Isso apagará permanentemente seu registro de <strong>{mangaTitle}</strong>.
        </p>
        <div className="flex justify-end gap-3">
          <Button className="bg-gray-100 text-gray-700" onClick={() => setIsDeleteDialogOpen(false)}>Voltar</Button>
          <Button className="bg-red-600 text-white shadow-md">Confirmar Exclusão</Button>
        </div>
      </Dialog>
    </div>
  );
}