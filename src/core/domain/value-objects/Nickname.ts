export class Nickname {
    private constructor(readonly value: string) {}

    static create(nickname: string): Nickname {
        if (!this.validate(nickname)) {
        throw new Error('Invalid nickname');
        }
        return new Nickname(nickname);
    }

    private static validate(nickname: string): boolean {
        return nickname.length > 0;
    }
}