import { Current_Chapter } from "./Current_Chapter";
import { Last_Update } from "./Last_Update";

export class Readings {
    private constructor(
        readonly current_chapter: Current_Chapter,
        readonly last_update: Last_Update
    ) {}

    static create(capitulo: number, ultima: number): Readings {
        const capituloAtual = Current_Chapter.create(capitulo);
        const ultimaAtualizacao = Last_Update.create(ultima, capitulo);
        return new Readings (capituloAtual, ultimaAtualizacao);
    }
}