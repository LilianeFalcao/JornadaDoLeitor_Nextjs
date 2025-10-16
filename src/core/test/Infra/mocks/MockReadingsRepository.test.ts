import { MockReadingsRepository } from "../../../infra/mocks/MockReadingsRepository";
import { 
    Reading_Status,
    Readings
} from "../../../domain/entity/Readings";

describe ('MockReadingsRepository', () => {
    it ("should not update a non-existent reading" , async () => {
        const readingRepository = new MockReadingsRepository();

        const reading = Readings.create('1', 'user-1', 'manga-24', new Date(), 25, 15, Reading_Status.READING, 'Muito engraçado' );

        await expect(readingRepository.update(reading)).resolves.not.toThrow();
    });
});