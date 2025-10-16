import { Reading_Status, Readings } from "../entity/Readings";

export interface IReadingsRepository {
    save (reading: Readings): Promise<void>; 
    update (reading: Readings): Promise<void>;
    delete (id_manga: string, id_user: string): Promise<void>;
    findByUserId(id_user: string): Promise<Readings[]>;
    findByStatus( status: Reading_Status ): Promise<Readings[]>;
    findByUserAndManga(id_user: string, id_manga:string): Promise<Readings | null>
}