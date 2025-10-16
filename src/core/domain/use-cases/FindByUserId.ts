import { Readings} from "../entity/Readings";
import { IReadingsRepository } from "../repositories/IReadingsRepository";

interface FindByUserIdRequest {
    userId: string;
}

interface FindByUserIdResponse {
    readings: Readings[];
}

export class FindByUserId {
    constructor(private readingsRepository: IReadingsRepository) {}

    async execute({ userId }: FindByUserIdRequest): Promise<FindByUserIdResponse> {
        const readings = await this.readingsRepository.findByUserId(userId);

        if (!readings || readings.length === 0) {
        throw new Error("Nenhuma leitura encontrada para este usuário.");
        }

        return { readings };
    }
}
