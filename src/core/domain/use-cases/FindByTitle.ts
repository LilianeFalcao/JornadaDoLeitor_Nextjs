import { Mangas } from "../entity/Mangas"
import { IMangasRepository } from "../repositories/IMangasRepository"

export class FindByTitle{

    constructor (private readonly mangasRepository : IMangasRepository) {}

    async execute(params: {title: string}): Promise<Mangas | null>{
        return this.mangasRepository.findByTitle(params.title);
    }

}