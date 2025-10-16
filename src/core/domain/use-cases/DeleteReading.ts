import { IReadingsRepository } from "../repositories/IReadingsRepository";


export class DeleteReading{
    constructor (private readonly readingRepository: IReadingsRepository) {}

    async execute(params: {
        id_user: string,
        id_manga: string
    }): Promise<void>{
    
    const { id_user, id_manga } = params;

        const reading = await this.readingRepository.findByUserAndManga(
            id_user,
            id_manga
        )

        if (!reading) {
            throw new Error('Reading does not exist');
        }

        await this.readingRepository.delete(
            id_user,
            id_manga
        )
    }

}