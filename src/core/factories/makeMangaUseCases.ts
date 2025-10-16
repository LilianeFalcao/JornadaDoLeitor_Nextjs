import { IMangasRepository } from "../domain/repositories/IMangasRepository";
import { FindAll } from "../domain/use-cases/FindAll";
import { FindByAuthorName } from "../domain/use-cases/FindByAuthorName";
import { FindByTitle } from "../domain/use-cases/FindByTitle";
import { MockMangasRepository } from "../infra/mocks/MockMangasRepository";

export function makeMangaUseCases() {
    const mangaRepository: IMangasRepository = MockMangasRepository.getInstance()

    const findByAuthorName = new FindByAuthorName(mangaRepository);
    const findByTitle = new FindByTitle(mangaRepository);
    const findAll = new FindAll(mangaRepository);

    return{
        findByAuthorName,
        findByTitle,
        findAll
    }
}