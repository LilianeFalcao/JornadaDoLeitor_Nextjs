import { Mangas } from "../entity/Mangas";
import { IMangasRepository } from "../repositories/IMangasRepository";

export class FindByAuthorName {

    constructor (private readonly mangasRepository: IMangasRepository) {}

    async execute (params: {author_name: string }): Promise<Mangas[]>{
        return this.mangasRepository.findByAuthorName(params.author_name);
    }

}