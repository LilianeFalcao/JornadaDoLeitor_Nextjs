'use client'

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
//import Image from "next/image"

import { makeMangaUseCases } from "@/core/factories/makeMangaUseCases"
import { AddReadingModal } from "../AddReadingModal/AddReadingModal"


export function AddMangaModal() {

  interface Manga {
  id: string;
  img_URL: string,
  title:string,
  author_name: string,
  gender: string,
  total_chapters: number
}
  const [mangas, setMangas] = useState<Manga[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function loadMangas() {
      const mangaUseCases = makeMangaUseCases()
      const data = await mangaUseCases.findAll.execute()
      if (Array.isArray(data)) setMangas(data)
    }

    loadMangas()
  }, [])

  const filtered = mangas.filter(m =>
    (m.title?.toLowerCase().includes(search.toLowerCase()) ||
      m.author_name?.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Adicionar Progresso</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar Mangá à sua Lista</DialogTitle>
          <p>Procure um título de mangá para adicionar à sua lista de leitura</p>
        </DialogHeader>

        <Input
          placeholder="Buscar títulos ou autores..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3"
        />

        <ScrollArea className="h-[400px]">
          {filtered.map((manga) => (
            <div
              key={manga.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition"
            >
              <div>
                <img 
                  src={manga.img_URL} 
                  alt={`Capa do mangá ${manga.title}`} 
                  width={100} 
                  height={150}
                  sizes="(max-width: 550px) 100px, 100px" 
              />
              </div>
              <div className="m-2 gap-10">
                <p className="font-medium">{manga.title}</p>
                <p className="text-sm text-muted-foreground">{manga.author_name}</p>
                <p className="bg-[#3d3d3d] rounded-sm text-white text-sm text-center px-1 py-0.5 whitespace-nowrap">{manga.total_chapters} chapters</p>
              </div>
              <Button variant="ghost">
                <AddReadingModal />
              </Button>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
