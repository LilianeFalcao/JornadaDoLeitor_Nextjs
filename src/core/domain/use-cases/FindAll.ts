import { Mangas } from "../entity/Mangas"
import { IMangasRepository } from "../repositories/IMangasRepository"

export class FindAll{

    constructor (private readonly mangasRepository : IMangasRepository) {}

    async execute(): Promise<Mangas[]> {
        return this.mangasRepository.findAll();
    }
}