import { makeMangaUseCases } from "../../factories/makeMangaUseCases";


describe('make Manga UseCases', () => {
    it('should create and return all manga use cases', () => {
        const useCases = makeMangaUseCases();

        expect(useCases.findAll).toBeDefined();
        expect(useCases.findByAuthorName).toBeDefined();
        expect(useCases.findByTitle).toBeDefined();
    });
});