import Image from "next/image";
//Images
import Kimetsu from "@/assets/Manga_Kimetsu_No_Yaiba.jpg"
import Lixeira from "@/assets/Icon_Delete.png"
import Up from "@/assets/Icon_Edit.png"
import Doll from "@/assets/SonoBisqueDoll_Manga.jpg"
import { 
        Card, CardsContainer,CardImage , CardText, 
        MainContainer , Progress, Filtros, Search,
        FiltrosContainder} from "@/components/MainIndex/styles";
import {CardActions} from "@/app/(site)/myProgress/styles"
//import do modal em shadcn
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
} from "@/components/ui/alert-dialog"



export default function MyProgress ( ) {
    return (
        <>
           <MainContainer>
                <h1>Meu Progresso de Leitura</h1>
                <p>Acompanhe e gerencie sua coleção de mangás</p>

                <FiltrosContainder>
                    <Search>
                        <input type="search" 
                        placeholder="Buscar Mangás" />
                    </Search>
                    <Filtros>
                        <button type="button">Todos</button>
                        <button type="button">Completos</button>
                        <button type="button">Lendo...</button>
                    </Filtros>
                </FiltrosContainder>

                <CardsContainer>
                    <Card>
                        <CardImage>
                            <Image 
                                src= {Kimetsu} 
                                alt="Capa do Mangá Kimetsu no Yaiba" />
                        </CardImage>
                        <CardText>
                            <h4>Kimetsu no Yaiba</h4>
                            <p>Completo</p>
                            <p>Capítulos 205 de 205</p>
                            <label htmlFor="progresso">Progresso</label>
                            <Progress id="progresso" value="205" max="205">100%</Progress>
                            <p>Atualizado em: 28-08-2025</p>
                            <CardActions>
                                <button>
                                    <Image 
                                        src= {Up} 
                                        alt="Editar" />
                                </button>
                                <button>
                                    <Image 
                                        src={Lixeira} 
                                        alt="Excluir" />
                                </button>
                            </CardActions>
                        </CardText>
                    </Card>

                    <Card>
                        <CardImage>
                            <Image 
                                src={Doll} 
                                alt="Capa do Mangá Sono Bisque Doll wa Koi wo Suru" />
                        </CardImage>
                        <CardText>
                            <h4>Sono Bisque Doll wa Koi wo Suru</h4>
                            <p>Completo</p>
                            <p>Capítulos 115.50 de 115.50</p>
                            <label htmlFor="progresso1">Progresso</label>
                            <Progress id="progresso1" value="115.50" max="115.50">
                                100%
                            </Progress>
                            <p>Atualizado em: 01-09-2025</p>
                            <CardActions>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                    <button>
                                        <Image 
                                        src={Up} 
                                        alt="Editar" 
                                        />
                                    </button>
                                    </DialogTrigger>

                                    <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Editar Progresso</DialogTitle>
                                        <DialogDescription>
                                            Atualize seu progresso abaixo:
                                        </DialogDescription>
                                    </DialogHeader>

                                    <form className="flex flex-col gap-3 mt-2">
                                        <Label htmlFor="capituloAtual">Capítulo Atual</Label>
                                        <Input 
                                        type="number" 
                                        id="capituloAtual" 
                                        name="capituloAtual"
                                        placeholder="Digite o capítulo" 
                                        />

                                        <Label htmlFor="statusLeitura">Status de Leitura</Label>
                                        <select 
                                        id="statusLeitura" 
                                        name="statusLeitura" 
                                        className="border rounded p-2"
                                        >
                                        <option value="Completo">Completo</option>
                                        <option value="Lendo">Lendo</option>
                                        </select>

                                        <Label htmlFor="notas">Notas</Label>
                                        <Input 
                                        id="notas" 
                                        name="notas"
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
                                        <Image 
                                        src={Lixeira}
                                        alt="Excluir"
                                        />
                                    </button>
                                    </AlertDialogTrigger>

                                    <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                        <AlertDialogDescription>
                                        Tem certeza que deseja excluir este mangá?
                                        Esta ação não poderá ser desfeita.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>

                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction >
                                        Excluir
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </CardActions>
                        </CardText>
                    </Card>
                </CardsContainer>
            </MainContainer>
        </>
    );
}