import { FindByTitle } from "../../../domain/use-cases/FindByTitle";
import { MockMangasRepository } from "../../../infra/mocks/MockMangasRepository";

describe("Find by manga title", () => {
    it("should find a manga by title", async ()=> {
        const mangasRepository = MockMangasRepository.getInstance();
        const findByTitle = new FindByTitle(mangasRepository)
        const result = await findByTitle.execute({ title: "Naruto" });

        expect(result).not.toBeNull();
        expect(result?.title).toBe("Naruto");
        expect(result?.author_name).toBe("Masashi Kishimoto");
        expect(result?.total_chapters).toBe(720);
    });

    it("should return null if manga title does not exist", async () => {
        const mangasRepository = MockMangasRepository.getInstance();
        const findByTitle = new FindByTitle(mangasRepository);

        const result = await findByTitle.execute({ title: "Dragon Ball" });

        expect(result).toBeNull();
    });
});