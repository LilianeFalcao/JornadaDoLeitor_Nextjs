export class Current_Chapter {
    private constructor(readonly value: number) {}

    static create(value: number): Current_Chapter {
        if (!this.validate(value)) {
            throw new Error("O capítulo atual é inválido.");
        }
        return new Current_Chapter(value);
    }

    private static validate(value: number): boolean {
        return value >= 0;
    }

}
