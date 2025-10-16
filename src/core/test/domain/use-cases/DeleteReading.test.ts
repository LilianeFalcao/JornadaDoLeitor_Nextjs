import { Reading_Status, Readings } from "../../../domain/entity/Readings"
import { DeleteReading } from "../../../domain/use-cases/DeleteReading"
import { MockMangasRepository } from "../../../infra/mocks/MockMangasRepository"
import { MockReadingsRepository } from "../../../infra/mocks/MockReadingsRepository"
import { MockUserRepository } from "../../../infra/mocks/MockUserRepository"

describe("Delete reading", ()=>{
    it("should delete a reading by user", async () => {
        const readingRepository = MockReadingsRepository.getInstance()
        const mangaRepository = MockMangasRepository.getInstance()
        const userRepository = MockUserRepository.getInstance();

        const deleteReading = new DeleteReading(readingRepository)

        const userId = "user_1";
        const mangaId = "1";

        const reading = Readings.create(
            "reading_1",
            userId,
            mangaId,
            new Date(),
            15,
            10,
            Reading_Status.READING,
            "Capítulo engraçado"
        );

        await readingRepository.save(reading);
        
        let beforeDelete = await readingRepository.findByUserAndManga(userId, mangaId);
        expect(beforeDelete).not.toBeNull();

        await deleteReading.execute({ id_user: userId, id_manga: mangaId });
        
        const afterDelete = await readingRepository.findByUserAndManga(userId, mangaId);
        expect(afterDelete).toBeNull();
    });

    it("should not throw an error if reading does not exist", async () => {
        const readingRepository = MockReadingsRepository.getInstance();
        const deleteReading = new DeleteReading(readingRepository);

        // 🔹 Executar mesmo sem leitura
        await expect(deleteReading.execute({
            id_user: "user_999",
            id_manga: "manga_999"
        })).resolves.not.toThrow();
    });
})