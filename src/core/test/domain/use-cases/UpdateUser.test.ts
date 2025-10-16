import { UpdateUser } from '../../../domain/use-cases/UpdateUser';
import { RegisterUser } from '../../../domain/use-cases/RegisterUser';
import { MockUserRepository } from '../../../infra/mocks/MockUserRepository';

describe('UpdateUser', () => {
    it('should update a user', async () => {
        const userRepository = MockUserRepository.getInstance();
        const registerUser = new RegisterUser(userRepository);
        const updateUser = new UpdateUser(userRepository);

        const user = await registerUser.execute({
            nickname: 'Hawks',
            email: 'linnHawks@example.com',
            password: 'P@ssword1',
        });

        const updatedUser = await updateUser.execute({
        id: user.id,
        nickname: 'Hawks Updated',
        });

        expect(updatedUser.nickname.value).toBe('Hawks Updated');
    });

    it('should throw an error if the user is not found', async () => {
        const userRepository = MockUserRepository.getInstance();
        const updateUser = new UpdateUser(userRepository);

        await expect(
        updateUser.execute({
            id: '1',
            nickname: 'Hawks Updated',
        })
        ).rejects.toThrow('User not found');
    });

    it('should update only the email', async () => {
        const userRepository = MockUserRepository.getInstance();
        const registerUser = new RegisterUser(userRepository);
        const updateUser = new UpdateUser(userRepository);

        const user = await registerUser.execute({
        nickname: 'Hawks',
        email: 'linnHawks@example.com',
        password: 'P@ssword1',
        });

        const updatedUser = await updateUser.execute({
        id: user.id,
        email: 'updated.email@example.com',
        });

        expect(updatedUser.nickname.value).toBe('Hawks');
        expect(updatedUser.email.value).toBe('updated.email@example.com');
    });

});