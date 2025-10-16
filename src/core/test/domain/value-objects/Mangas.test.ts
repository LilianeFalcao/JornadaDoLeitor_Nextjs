import { Mangas } from "../../../domain/value-objects/Mangas";

describe("Mangas", () => {
    it("Add valid title.", () => {
        const mangas = Mangas.create("One Piece", "https://site.com/onepiece.jpg", 2);
        expect(mangas.value).toBe("One Piece");
    });

    it("Add valid URL", () => {
        const mangas = Mangas.create("One Piece", "https://site.com/onepiece.jpg", 2);
        expect(mangas.img_URL).toBe("https://site.com/onepiece.jpg");
    });

    it("Does not allow invalid title", () => {
        expect(() => Mangas.create("", "https://site.com/onepiece.jpg", 2))
            .toThrow("The manga title is invalid.");
    });

    it("Does not allow invalid URL", () => {
        expect(() => Mangas.create("Naruto", "invalid-url", 2))
            .toThrow("Image URL is invalid..");
    });
    
    it("Empty title, please fill in the field", () => {
        expect(() => Mangas.create("          ", "https://site.com/onepiece.jpg", 2))
            .toThrow("The manga title is invalid.");
    });
    it("Does not allow very long title", () => {
        const longTitle = "a".repeat(201);
        expect(() => Mangas.create(longTitle, "https://site.com/onepiece.jpg", 2))
            .toThrow("The manga title is invalid.");
    });

    it("Number of chapters cannot be less than zero", () => {
        expect(() => Mangas.create("Naruto", "https://site.com/onepiece.jpg", -2 ))
            .toThrow("Invalid number of chapters");
    });

});