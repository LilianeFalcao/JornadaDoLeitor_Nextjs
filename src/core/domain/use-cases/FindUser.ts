import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "../entity/User";

export class FindUser {
    constructor (private readonly userRepository: IUserRepository) {}

    async execute(params: {id: string}): Promise<User| null>{
        return this.userRepository.findById(params.id);
    }
}

