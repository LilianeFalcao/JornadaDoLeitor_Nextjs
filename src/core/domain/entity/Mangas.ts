export class Mangas{
    private constructor (
        readonly id: string,
        readonly img_URL: string,
        readonly title:string,
        readonly author_name: string,
        readonly gender: string,
        readonly total_chapters: number
    ){  }
    static create(
        id: string,
        img_URL: string,
        title:string,
        author_name: string,
        gender: string,
        total_chapters: number
    ): Mangas{
        return new Mangas(id, img_URL,title, author_name, gender, total_chapters)
    }
}