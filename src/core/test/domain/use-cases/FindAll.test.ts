import { FindAll } from "../../../domain/use-cases/FindAll";
import { MockMangasRepository } from "../../../infra/mocks/MockMangasRepository";

describe('Find all Mangas in catalog', () => {

    it('should find all mangas in catalog disponibile ', async () => {

        const mangasRepository = new MockMangasRepository();

        const findAllManga = new FindAll(mangasRepository)

        const foundManga = await findAllManga.execute( );

        expect(foundManga).toHaveLength(3);
    })
})