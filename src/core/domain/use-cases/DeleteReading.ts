import { IReadingsRepository } from "../repositories/IReadingsRepository";


export class DeleteReading{
    constructor (private readonly readingRepository: IReadingsRepository) {}

    async execute(params: {
        id_user: string,
        id_manga: string
    }): Promise<void>{
    
    const { id_user, id_manga } = params;

        await this.readingRepository.delete(
            id_manga,
            id_user
        )
    }

}