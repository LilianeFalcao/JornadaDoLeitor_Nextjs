import { IReadingsRepository } from "../../domain/repositories/IReadingsRepository";
import { Readings } from "../../domain/entity/Readings";
import { Reading_Status } from "../../domain/entity/Readings";

export class MockReadingsRepository implements IReadingsRepository {
    private static instance: MockReadingsRepository;

    private readings: Readings[] = [
        Readings.create(
        "read-1",
        "user-1",
        "manga-1",
        new Date("2025-10-30"),
        150,
        2,
        Reading_Status.READING,
        "Estou adorando"
        ),
        Readings.create(
        "read-2",
        "user-1",
        "manga-3",
        new Date("2025-10-30"),
        150,
        2,
        Reading_Status.READING,
        "Estou adorando"
        )];

    async save(reading: Readings): Promise<void>{
        this.readings.push(reading)
    }

    async update(reading: Readings): Promise<void>{
        const readingIndex = this.readings.findIndex(r => r.id === reading.id);

        if(readingIndex !== -1) {
            this.readings[readingIndex] = reading;
        }
    }

    async delete (id_manga: string, id_user: string): Promise<void>{
        this.readings = this.readings.filter(
            (reading) => !(reading.id_user === id_user && reading.id_manga === id_manga)
        )
    }

    async findByUserId(id_user: string): Promise<Readings[]>{
        return this.readings.filter(
            (reading) => reading.id_user === id_user
        )
    }

    async findByStatus( status: Reading_Status ): Promise<Readings[]>{
        return this.readings.filter(
            (reading) => reading.status === status
        )
    }

    async findByUserAndManga(id_manga: string, id_user: string): Promise<Readings | null>{
        const reading = this.readings.find(
            (r) => r.id_user === id_user && r.id_manga === id_manga
        );

        return reading || null;
    }

    
    public static getInstance(): MockReadingsRepository{
        if(!MockReadingsRepository.instance){
            MockReadingsRepository.instance = new MockReadingsRepository();
        }
        return MockReadingsRepository.instance;
    }
    
}