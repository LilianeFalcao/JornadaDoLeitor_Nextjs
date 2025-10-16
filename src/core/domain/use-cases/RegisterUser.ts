import { User } from "../entity/User";
import { IUserRepository } from "../repositories/IUserRepository";
import { Email } from "../value-objects/Email";
import { Nickname } from "../value-objects/Nickname";
import { Password } from "../value-objects/Password";

export class RegisterUser {
    constructor (private readonly userRepository: IUserRepository) {}

    async execute( params: {
        nickname: string;
        email: string;
        password: string
    }): Promise<User> {
        const {nickname, email, password} = params;

        const userExists = await this.userRepository.findByEmail(email);

        if (userExists) {
            throw new Error("User already exists");
        }

        const hashedPassword = await this.hashPassword(password);

        const user = User.create(
            Math.random().toString(),
            Nickname.create(nickname),
            Email.create(email),
            Password.create(hashedPassword),
        )

        await this.userRepository.save(user);

        return user;
    } 

    private async hashPassword(password: string): Promise<string> {
    return `hashed_${password}`;
    }
    
}