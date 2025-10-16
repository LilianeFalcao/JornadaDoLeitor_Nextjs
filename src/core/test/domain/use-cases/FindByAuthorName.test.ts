import { Mangas } from "../../../domain/entity/Mangas";
import { FindByAuthorName } from "../../../domain/use-cases/FindByAuthorName";
import { MockMangasRepository } from "../../../infra/mocks/MockMangasRepository";

describe ("Find by author name", () => {
    it("Find manga by author name", async () => {
        const mangaRepository = MockMangasRepository.getInstance();
        const findByAuthorName = new FindByAuthorName(mangaRepository)

        const authorName = "Makoto Yukimura"

        const result = await findByAuthorName.execute({author_name: authorName});

        expect(Array.isArray(result)).toBe(true)
        expect(result.length).toBeGreaterThan(0);
        result.forEach((manga: Mangas) => {
            expect(manga.author_name).toBe(authorName);
        });
    });

    it("should return empty array if author does not exist", async () => {
        const mangaRepository = MockMangasRepository.getInstance();
        const findByAuthorName = new FindByAuthorName(mangaRepository);

        const authorName = "Autor Inexistente";

        const result = await findByAuthorName.execute({ author_name: authorName });

        expect(Array.isArray(result)).toBe(true);
        expect(result).toHaveLength(0);
    });
})