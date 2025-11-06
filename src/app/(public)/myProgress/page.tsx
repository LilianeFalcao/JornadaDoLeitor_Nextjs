'use client'


import Image from "next/image";
// Images
import Kimetsu from "@/assets/Manga_Kimetsu_No_Yaiba.jpg";
import Lixeira from "@/assets/delete.png";
import Up from "@/assets/Icon_Edit.png";
//import Doll from "@/assets/SonoBisqueDoll_Manga.jpg";

import {
    Card,
    CardsContainer,
    CardImage,
    CardText,
    MainContainer,
    Progress,
    Filtros,
    Search,
    FiltrosContainder,
} from "@/components/MainIndex/styles";
import { CardActions } from "@/app/(public)/myProgress/styles";

// Imports do Shadcn UI
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { makeReadingUseCases } from "@/core/factories/makeReadingUseCases";
import { useCallback, useEffect, useState } from "react";
import { Readings } from "@/core/domain/entity/Readings";
import { toast } from "sonner";

export default function MyProgress() {
 const [readings, setReadings] = useState<Readings[]>([]);
  
  const readingsUseCases = makeReadingUseCases(); // Nome correto da variável
  const userId = "user-1"; // ID do usuário (exemplo)

  // Função para carregar as leituras
  const loadReadings = useCallback(async () => {
    try {
      // Certifique-se de passar o parâmetro correto aqui
      const data = await readingsUseCases.listUserReading.execute({ id_user: userId });
      setReadings(data); // Atualiza o estado com as leituras
    } catch (error) {
      console.error(error);
      setReadings([]); // Se algo der errado, limpa a lista
    }
  }, [readingsUseCases, userId]); // Certifique-se de ter as dependências corretas

  // Chama a função loadReadings assim que o componente for montado
  useEffect(() => {
    loadReadings();
  }, [loadReadings]); 

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
    <div className="flex flex-row gap-6">
      {/* Renderiza as leituras */}
      {readings.length > 0 ? (
        readings.map((reading) => (
          <div key={reading.id_manga}>
            <p>{reading.id_manga}</p>
            <p>Progresso: {reading.progress}</p>
            <p>Status: {reading.status}</p>
          </div>
        ))
      ) : (
        <p>Nenhuma leitura encontrada.</p>
      )}
    </div>

    <Card>
    <CardImage>
        <Image src={Kimetsu} alt="Capa do Mangá Kimetsu no Yaiba" />
    </CardImage>
    <CardText>
        <h4>Kimetsu no Yaiba</h4>
        <p>Completo</p>
        <p>Capítulos 205 de 205</p>
        <label htmlFor="progresso">Progresso</label>
        <Progress id="progresso" value="205" max="205">100%</Progress>
        <p>Atualizado em: 28-08-2025</p>

        <CardActions>
        <Dialog>
            <DialogTrigger asChild>
            <button>
                <Image src={Up} alt="Editar" />
            </button>
            </DialogTrigger>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Editar Progresso</DialogTitle>
                <DialogDescription>
                Atualize seu progresso abaixo para **Kimetsu no Yaiba**:
                </DialogDescription>
            </DialogHeader>
            <form className="flex flex-col gap-3 mt-2">
                <Label htmlFor="capituloAtualKimetsu">Capítulo Atual</Label>
                <Input
                type="number"
                id="capituloAtualKimetsu"
                name="capituloAtualKimetsu"
                placeholder="Digite o capítulo"
                />

                <Label htmlFor="statusLeituraKimetsu">Status de Leitura</Label>
                <select
                id="statusLeituraKimetsu"
                name="statusLeituraKimetsu"
                className="border rounded p-2"
                >
                <option value="Completo">Completo</option>
                <option value="Lendo">Lendo</option>
                </select>

                <Label htmlFor="notasKimetsu">Notas</Label>
                <Textarea
                id="notasKimetsu"
                name="notasKimetsu"
                placeholder="Adicione notas sobre seus momentos favoritos"
                />
                <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancelar</Button>
                </DialogClose>
                <Button type="submit">Atualizar progresso</Button>
                </DialogFooter>
            </form>
            </DialogContent>
        </Dialog>

        <AlertDialog>
            <AlertDialogTrigger asChild>
            <button>
                <Image src={Lixeira} alt="Excluir" />
            </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                Tem certeza que deseja excluir este mangá Kimetsu no Yaiba? Esta ação não poderá ser desfeita.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction>Excluir</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </CardActions>
    </CardText>
    </Card>
</CardsContainer>
</MainContainer>
);
}
