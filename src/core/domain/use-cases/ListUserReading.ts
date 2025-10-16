import { IReadingsRepository } from "../repositories/IReadingsRepository";
import { Readings } from "../entity/Readings";

export class ListUserReading {
    constructor(private readonly readingRepository: IReadingsRepository) {}

    async execute(params: { id_user: string }): Promise<Readings[]> {
        const { id_user } = params;

        const readings = await this.readingRepository.findByUserId(id_user);

        if (!readings || readings.length === 0) {
            throw new Error("No readings found for this user");
        }

        return readings;
    }
}
