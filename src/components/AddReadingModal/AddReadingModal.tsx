"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { toast } from "sonner";
import { makeReadingUseCases } from "@/core/factories/makeReadingUseCases";
import { Readings } from "@/core/domain/entity/Readings";
import Image from "next/image";
import { useRouter } from "next/navigation";



interface ReadingInput {
  id_user: string;
  id_manga: string;
  _current_chapter: number;
  progress: number;
  notes?: string;
}

interface Manga {
  id: string;
  img_URL: string;
  title: string;
  author_name: string;
  gender: string;
  total_chapters: number;
}

interface AddReadingModalProps {
  isOpen: boolean;
  manga: Manga;
  idUser: string;
  onClose: () => void;
  onAddReading: (reading: Readings) => void;
}
export function AddReadingModal({
  isOpen,
  onClose,
  manga,
  idUser,
  onAddReading,
}: AddReadingModalProps) {

  const [chaptersRead, setChaptersRead] = useState(0);
  const [notes, setNotes] = useState("");
  const router = useRouter()


  const progresso = Number((chaptersRead / manga.total_chapters) * 100).toFixed(2);
  // Função de validação de inteiro
  const isInteger = (num: number) => num % 1 === 0;

  const handleChapterChange = (value: string) => {
    const num = Number(value);
    // Permite que o usuário apague o campo (value=0) e impede a entrada de floats
    if (
      value === "" ||
      (isInteger(num) && num >= 0 && num <= manga.total_chapters)
    ) {
      setChaptersRead(num);
    }
  };

  const handleSubmit = async () => {
    if (
      !isInteger(chaptersRead) ||
      chaptersRead < 0 ||
      chaptersRead > manga.total_chapters
    ) {
      toast.success(
        "O capítulo atual deve ser um número inteiro entre 0 e " +
          manga.total_chapters +
          "."
      );
      return;
    }

    // Objeto de entrada (Input) para o Use Case
    const readingInput = {
      id_user: idUser,
      id_manga: manga.id,
      current_chapter: chaptersRead, // ✅ nome certo
      notes: notes || "",
    };

    try {
      const readingUseCases = makeReadingUseCases();
      const newReading = await readingUseCases.addReading.execute(readingInput);

      onAddReading(newReading);
      onClose();
      toast.success("Leitura adicionada com sucesso!");
      router.refresh();
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col max-w-md">
        <DialogHeader className="space-y-2 text-center">
          <DialogTitle className="text-lg font-medium">
            Defina seu progresso de leitura atual
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Adicionar <strong>{manga.title}</strong> à Leitura
          </p>
        </DialogHeader>

        <section className="flex flex-col max-w-md">
          {/* ... Informações do Mangá ... */}
          <div className="space-y-3 flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition">
            <Image
              src={manga.img_URL}
              alt={`Capa de ${manga.title}`}
              width={150}
              height={200}
              className="rounded-md mx-auto object-cover"
            />

            <div>
              <p>
                <strong>Autor:</strong> {manga.author_name}
              </p>
              <p>
                <strong>Gênero:</strong> {manga.gender}
              </p>
              <p>
                <strong>Capítulos:</strong> {manga.total_chapters}
              </p>
            </div>
          </div>
          {/* Fim das Informações do Mangá */}

          {/* Capítulo atual - ATUALIZADO */}
          <div className="space-y-2 mt-4">
            <Label htmlFor="currentChapter">Capítulo atual:</Label>
            <Input
              id="currentChapter"
              type="number" // Mantido como number, mas com tratamento no onChange
              value={chaptersRead === 0 ? "" : chaptersRead} // Mostra vazio se for 0
              onChange={(e) => handleChapterChange(e.target.value)}
              placeholder={`Indique seu capítulo atual entre 0 e ${manga.total_chapters}`}
              min={0}
              max={manga.total_chapters}
            />
          </div>

          {/* Campo de notas com scroll */}
          <div className="space-y-2 mt-4">
            <Label htmlFor="notes">Notas:</Label>
            <ScrollArea className="h-32 w-full rounded-md border p-2">
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Comentários sobre a leitura..."
                className="w-full h-28 resize-none bg-transparent outline-none text-sm"
              />
            </ScrollArea>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            Progresso estimado: {progresso}%
          </p>

          <Button onClick={handleSubmit} className="w-full mt-4">
            Adicionar em minhas leituras
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  );
}
