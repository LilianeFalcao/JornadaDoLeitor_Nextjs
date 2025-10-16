import { Mangas } from "../../../domain/entity/Mangas";

describe ('Mangas' , () => {
    it("should create a valid Manga", () => {
        const url = "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_p4uugvjt7p6e93tqi1hh3kkt7p/-S897-FWEBP"
        
        const manga = Mangas.create(
            '1',
            url,
            "Vinland Saga",
            "Makoto Yukimura",
            "Seinen",
            220
        )
        
        expect(manga.id).toBe('1');
        expect(manga.img_URL).toBe(url);
        expect(manga.title).toBe('Vinland Saga');
        expect(manga.author_name).toBe('Makoto Yukimura');
        expect(manga.gender).toBe('Seinen');
        expect(manga.total_chapters).toBe(220);
    })
})