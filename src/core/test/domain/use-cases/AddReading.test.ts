import { AddReading } from "../../../domain/use-cases/AddReading";
import { Reading_Status, Readings } from "../../../domain/entity/Readings";
import { MockReadingsRepository } from "../../../infra/mocks/MockReadingsRepository";
import { MockUserRepository } from "../../../infra/mocks/MockUserRepository";
import { MockMangasRepository } from "../../../infra/mocks/MockMangasRepository";
import { User } from "../../../domain/entity/User";
import { Mangas } from "../../../domain/entity/Mangas";

describe("Add reading", () => {
    let userRepository: MockUserRepository;
    let mangaRepository: MockMangasRepository;
    let readingRepository: MockReadingsRepository;
    let addReading: AddReading;
    const manga = Mangas.create(
        "manga-1",
        "Jujutsu Kaisen",
        "Gege Akutami",
        "https://www.manga-jujutsu-kaisen.com",
        "Shounen",
        220,
        "Em andamento"
    );
    const user = User.create(
        "user-1",
        "Lilia",
        "lilia@gmail.com",
        "password"
    );
    beforeEach(async () => {
        userRepository = MockUserRepository.getInstance();
        mangaRepository = MockMangasRepository.getInstance();
        readingRepository = MockReadingsRepository.getInstance();
        addReading = new AddReading(
            readingRepository,
            userRepository,
            mangaRepository
        );
        await userRepository.save(user);
        await mangaRepository.save(manga);
        readingRepository.clear();
    });
    it("must add a new reading successfully", async () => {

        const userId = "user-1"; 
        const mangaId = "manga-1"

        const result = await addReading.execute({
            id_user: userId,
            id_manga: mangaId,
            current_chapter: 50,
            notes: "Gostando até agora!"
        });

        expect(result).toBeInstanceOf(Readings);
        expect(result.id_user).toBe(userId);
        expect(result.id_manga).toBe(mangaId);
        expect(result.status).toBe(Reading_Status.READING);
        expect(result.progress).toBeCloseTo((50 / 220) * 100, 2);
    });

    it("should throw an error if user does not exist", async () => {

        await expect(
            addReading.execute({
                id_user: "non_existent_user",
                id_manga: "manga-1",
                current_chapter: 10
            })
        ).rejects.toThrow("User not found");
    });

    it("should throw an error if manga does not exist", async () => {

        await expect(
            addReading.execute({
                id_user: "user-1",
                id_manga: "manga-999",
                current_chapter: 10
            })
        ).rejects.toThrow("Manga not found");
    });


    it("should update an existing reading if it already exists", async () => {
    const userId = "user-1";
    const mangaId = "manga-1";

    const initialReading = Readings.create(
        "existing_id",
        userId,
        mangaId,
        new Date(),
        10,
        (10 / 220) * 100,
        Reading_Status.READING,
        "Primeira nota"
    );
    await readingRepository.save(initialReading);
    
    const updatedReading = await addReading.execute({
        id_user: userId,
        id_manga: mangaId,
        current_chapter: 50,
        notes: "Atualizado!"
    });

    expect(updatedReading.id).toBe("existing_id"); 
    expect(updatedReading.current_chapter).toBe(50);
    expect(updatedReading.progress).toBeCloseTo((50 / 220) * 100, 2);
    expect(updatedReading.notes).toBe("Atualizado!");
    expect(updatedReading.status).toBe(Reading_Status.READING);
});

});
