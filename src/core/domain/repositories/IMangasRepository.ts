import { Mangas } from "../entity/Mangas";

export interface IMangasRepository {
    findByAuthorName (author_name: string): Promise <Mangas[]>;
    findByTitle (title: string): Promise<Mangas | null>;
    findById(id: string): Promise< Mangas| null>;
    findAll(): Promise<Mangas[]>;
}