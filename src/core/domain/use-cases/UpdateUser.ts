import { User } from '../entity/User';
import { IUserRepository } from '../repositories/IUserRepository';
import { Email } from '../value-objects/Email';
import { Nickname } from '../value-objects/Nickname';
import { Password } from '../value-objects/Password';

export class UpdateUser {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(params: {
        id: string;
        nickname?: string;
        email?: string;
    }): Promise<User> {
        const { id, nickname, email } = params;

        const user = await this.userRepository.findById(id);

        if (!user) {
        throw new Error('User not found');
        }

        const newNickname = nickname ? Nickname.create(nickname) : user.nickname;
        const newEmail = email ? Email.create(email) : user.email;

        const updatedUser = User.create(
        user.id,
        newNickname,
        newEmail,
        user.password, // Password is not updated here for security reasons
        );

        await this.userRepository.update(updatedUser);

        return updatedUser;
    }
}