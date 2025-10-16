import { Readings, Reading_Status  } from "../entity/Readings";
import { IMangasRepository } from "../repositories/IMangasRepository";
import { IReadingsRepository } from "../repositories/IReadingsRepository";
import { IUserRepository } from "../repositories/IUserRepository";


function generateId(): string {
        return Math.random().toString(36).substring(2, 10); 
    }

export class AddReading{
    constructor (
        private readonly readingRepository: IReadingsRepository,
        private readonly userRepository: IUserRepository,
        private readonly mangaRepository: IMangasRepository
    ) { }
    
    async execute(params: {
        id_user: string;
        id_manga: string;
        current_chapter: number;
        notes?: string;
    }): Promise<Readings> {
    const { id_user, id_manga, current_chapter, notes } = params;

    const user = await this.userRepository.findById(id_user);
    if (!user) throw new Error("User not found");

    const manga = await this.mangaRepository.findById(id_manga);
    if (!manga) throw new Error("Manga not found");

    const existingReading = await this.readingRepository.findByUserAndManga(
        id_user,
        id_manga
    );

    const status: Reading_Status =
        current_chapter >= manga.total_chapters
        ? Reading_Status.COMPLETED
        : Reading_Status.READING;

    const progress = (current_chapter / manga.total_chapters) * 100;

    if (existingReading) {
        existingReading.updateProgress(current_chapter, progress, status);
        if (notes) existingReading.updateNotes(notes);

        await this.readingRepository.update(existingReading);
        return existingReading;
    }
        
    const newReading = Readings.create(
        generateId(),
        id_user,
        id_manga,
        new Date(),
        current_chapter,
        progress,
        status,
        notes || "",
    );

    await this.readingRepository.save(newReading);
    return newReading;
    }
}