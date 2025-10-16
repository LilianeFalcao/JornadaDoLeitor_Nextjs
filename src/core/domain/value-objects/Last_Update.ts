export class Last_Update {
    private constructor(readonly value: number) {}

    static create(value: number, capituloAtual: number): Last_Update {
        if (!this.validate(value, capituloAtual)) {
            throw new Error(
                "A última atualização não pode ser menor que o capítulo atual."
            );
        }
        return new Last_Update(value);
    }

    private static validate(value: number, capituloAtual: number): boolean {
        return value >= capituloAtual;
    }
}
