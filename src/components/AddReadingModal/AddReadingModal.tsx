
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"


export function AddReadingModal(){
    return(
        <Dialog>
        <DialogTrigger asChild>
            <Button>+</Button>
        </DialogTrigger>

        <DialogContent className="max-w-lg">
            <DialogHeader>
            <DialogTitle>Adicionar Mangá à sua Lista</DialogTitle>
            <p>Procure um título de mangá para adicionar à sua lista de leitura</p>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    );
} 