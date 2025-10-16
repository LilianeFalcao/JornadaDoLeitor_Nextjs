import { Reading_Status, Readings } from "../../../domain/entity/Readings";
import { ListReadingByStatus } from "../../../domain/use-cases/ListReadingByStatus";
import { MockReadingsRepository } from "../../../infra/mocks/MockReadingsRepository"

describe("List reading by status" , () => {
    it("should list readings by status" , async() => {
        const readingRepository = MockReadingsRepository.getInstance()
        
        const reading1 =Readings.create(
            '1',
            "user-1",
            'manga-24',
            new Date(),
            25,
            15,
            Reading_Status.READING,
            'Muito engraçado'
        );
        const reading2 =Readings.create(
            '1',
            "user-2",
            'manga-24',
            new Date(),
            25,
            15,
            Reading_Status.COMPLETED,
            'Muito engraçado'
        );
        const reading3 =Readings.create(
            '1',
            "user-3",
            'manga-24',
            new Date(),
            25,
            15,
            Reading_Status.READING,
            'Muito engraçado'
        );
        
        readingRepository.save(reading1);
        readingRepository.save(reading2);
        readingRepository.save(reading3);

        const listReadingByStatus = new ListReadingByStatus(readingRepository);

        const result = await listReadingByStatus.execute({
            status: Reading_Status.READING
        });

        expect(result).toHaveLength(2);
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: "user-1" }),
                expect.objectContaining({ id: "user-3" }),
            ])
        )

    })
})