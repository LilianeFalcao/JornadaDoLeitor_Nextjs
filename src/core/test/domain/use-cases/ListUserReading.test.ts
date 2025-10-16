import { Reading_Status, Readings } from "../../../domain/entity/Readings";
import { FindByUserId } from "../../../domain/use-cases/FindByUserId";
import { MockReadingsRepository } from "../../../infra/mocks/MockReadingsRepository"

describe("List user reading", () => {
    it("must list a reading by user", async() => {
        const readingRepository = MockReadingsRepository.getInstance();
        const findByUserId = new FindByUserId(readingRepository)

        const userId = "user_1";
        const reading1 = Readings.create(
            '1',
            userId,
            'manga-24',
            new Date(),
            25,
            15,
            Reading_Status.READING,
            'Muito engraçado'
        );
        const reading2 = Readings.create(
            '2',
            userId,
            "manga_2",
            new Date(),
            50,
            100,
            Reading_Status.READING,
            "Gostando muito até agora!"
        )

        await readingRepository.save(reading1)
        await readingRepository.save(reading2)

        const result = await findByUserId.execute({userId})
        
        expect(result.readings).toHaveLength(2);
        expect(result.readings[0].id_user).toBe(userId);
        expect(result.readings[1].id_user).toBe(userId);
    })
})