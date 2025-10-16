import { RegisterUser } from '../../../domain/use-cases/RegisterUser';
import { MockUserRepository } from '../../../infra/mocks/MockUserRepository';

describe('RegisterUser', () => {
    it('should register a new user', async () => {
        const userRepository = MockUserRepository.getInstance();
        const registerUser = new RegisterUser(userRepository);

        const user = await registerUser.execute({
            nickname: 'Hawks',
            email: 'linnHawks@example.com',
            password: 'P@ssword1',
        });

        expect(user).toBeDefined();
        expect(user.nickname.value).toBe('Hawks');
        expect(user.email.value).toBe('linnHawks@example.com');

        const foundUser = await userRepository.findByEmail('linnHawks@example.com');
        expect(foundUser).toBe(user);
    });

    it('should throw an error if the user already exists', async () => {
        const userRepository = MockUserRepository.getInstance();
        const registerUser = new RegisterUser(userRepository);

        await registerUser.execute({
            nickname: 'Hawks',
            email: 'linnHawks@example.com',
            password: 'P@ssword1',
        });

        await expect(
        registerUser.execute({
            nickname: 'Hawks',
            email: 'linnHawks@example.com',
            password: 'P@ssword1',
        })
        ).rejects.toThrow('User already exists');
    });
});