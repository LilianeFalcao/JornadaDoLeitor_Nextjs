import { IReadingsRepository } from "../repositories/IReadingsRepository";
import { Readings, Reading_Status } from "../entity/Readings";

export class ListReadingByStatus {
    constructor(private readonly readingRepository: IReadingsRepository) {}

    async execute(params: { status: Reading_Status }): Promise<Readings[]> {
        const { status } = params;

        const readings = await this.readingRepository.findByStatus(status);
        if (!readings || readings.length === 0) {
            throw new Error(`No readings found with status: ${status}`);
        }
        return readings;
    }
}
