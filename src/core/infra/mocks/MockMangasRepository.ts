import { IMangasRepository } from "../../domain/repositories/IMangasRepository";
import { Mangas } from "../../domain/entity/Mangas";

export class MockMangasRepository implements IMangasRepository{
    private static instance: MockMangasRepository;

    private mangas: Mangas[] = [
    Mangas.create(
        "manga-1",
        "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_uj0nprci6p7cb3gmf683i87i0b/-S897-FWEBP",
        "Vinland Saga",
        "Makoto Yukimura",
        "Seinen",
        220
    ),
    Mangas.create(
        "manga-2",
        "https://bancaconect.com.br/wp-content/uploads/2020/12/Naruto-Gold-35-.jpg",
        "Naruto Shippuden",
        "Masashi Kishimoto",
        "Shonen",
        720
    ),
    Mangas.create(
        "manga-3",
        "https://imgs.search.brave.com/2HpKCxP4Au8c04dPeddjea6Y9qo44oxK9e2BM3_jwpY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvcHQvdGh1bWIv/NC80NS9CbGVhY2hf/dm9sLl8wMS5qcGcv/NTEycHgtQmxlYWNo/X3ZvbC5fMDEuanBn",
        "Bleach",
        "Tite Kubo",
        "Shounen",
        686
    ),
    Mangas.create(
        "manga-4",
        "https://imgs.search.brave.com/1yt4EHx9fAln-hJ-yFhYwY2_3kUY9a-WjQTBZOcT2ok/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvcHQvdGh1bWIv/OS85Zi9GdWxsbWV0/YWxfQWxjaGVtaXN0/LmpwZy81MTJweC1G/dWxsbWV0YWxfQWxj/aGVtaXN0LmpwZw",
        "Fullmetal Alchemist",
        "Hiromu Arakawa",
        "Shounen",
        108
    ),
    ];

    public static getInstance(): MockMangasRepository{
        if(!MockMangasRepository.instance){
            MockMangasRepository.instance = new MockMangasRepository();
        }
        return MockMangasRepository.instance;
    }

    async findByAuthorName(author_name: string): Promise<Mangas[]> {
        return this.mangas.filter( 
            (mangas) => mangas.author_name === author_name
        )
    }

    async findById(id: string): Promise<Mangas | null> {
        return this.mangas.find(manga => manga.id === id) || null;
    }

    async findByTitle(title: string): Promise<Mangas | null> {
        const manga = this.mangas.find(
            (m) => m.title === title
        )
        
        return manga ?? null
    }

    async findAll(): Promise<Mangas[]> {
        return [...this.mangas];
    }


}