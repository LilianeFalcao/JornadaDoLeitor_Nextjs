import { MockUserRepository } from "../../../infra/mocks/MockUserRepository";
import { User } from "../../../domain/entity/User";
import { Email } from "../../../domain/value-objects/Email";
import { Password } from "../../../domain/value-objects/Password";
import { Nickname } from "../../../domain/value-objects/Nickname";

describe('MockUserRepository', () => {
    it('should not throw when updating a non-existent user', async () => {
        const userRepository = MockUserRepository.getInstance();
        const user = User.create(
        '1',
        Nickname.create("Hawks"),
        Email.create("linnYohan@gmail.com"),
        Password.create ('P@ssword1'),
        );

        await expect(userRepository.update(user)).resolves.not.toThrow();
    });
});