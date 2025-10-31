import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"

interface Manga {
  id: string
  img_URL: string
  title: string
  author_name: string
  gender: string
  total_chapters: number
}

interface AddReadingModalProps {
  isOpen: boolean
  onClose: () => void
  manga: Manga
}

export function AddReadingModal({ isOpen, onClose, manga }: AddReadingModalProps) {
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
          <div className="space-y-3 flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition">
            <img
              src={manga.img_URL}
              alt={`Capa de ${manga.title}`}
              width={150}
              height={200}
              className="rounded-md mx-auto object-cover"
            />

            <div>
              <p><strong>Autor:</strong> {manga.author_name}</p>
              <p><strong>Gênero:</strong> {manga.gender}</p>
              <p><strong>Capítulos:</strong> {manga.total_chapters}</p>
            </div>
          </div>

          <form className="space-y-2 mt-3">
            <Label htmlFor="currentChapter">Capítulo atual:</Label>
            <Input
              id="currentChapter"
              type="number"
              placeholder={`Indique seu capítulo atual entre 1 e ${manga.total_chapters}`}
              min={1}
              max={manga.total_chapters}
            />
          </form>

          <Button onClick={onClose} className="w-full mt-4">
            Adicionar em minhas leituras
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  )
}
