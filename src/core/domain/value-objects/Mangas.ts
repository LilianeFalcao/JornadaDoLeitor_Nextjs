export class Mangas{
    private constructor (
        readonly value: string,
        readonly img_URL: string,
        readonly total_chapters: number
    ) {   }

    static create(mangas: string, img_URL:string, total_chapters: number): Mangas {
        if (!this.validateManga(mangas)) {
            throw new Error("Manga title is invalid.");
        }
        if(!this.validateUrl(img_URL)) {
            throw new Error("The URL of the passed image is invalid.");
        }

        if(!this.validateTotalCap(total_chapters) ) {
            throw new Error ("Past chapter is not valid.")
        }
        return new Mangas(mangas, img_URL, total_chapters);
    }

    private static validateManga(mangas: string): boolean{
        if (!mangas) return false; 
        if (mangas.trim().length === 0) return false;
        if (mangas.length > 200) return false; 
        return true;
    }

    private static validateUrl(img_URL: string): boolean{
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(img_URL);
    }

    private static validateTotalCap(total_chapters: number): boolean{
        return total_chapters >= 0
    }
}