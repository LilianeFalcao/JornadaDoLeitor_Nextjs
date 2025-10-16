import { LoginUser } from "../../../domain/use-cases/LoginUser"
import { RegisterUser } from "../../../domain/use-cases/RegisterUser"
import { MockUserRepository } from "../../../infra/mocks/MockUserRepository"


describe("LoginUser", () => {
    beforeEach(() => {
        MockUserRepository.getInstance().reset();
    });

    it("Should login a user", async () => {
        const userRepository = MockUserRepository.getInstance();
        const registerUser = new RegisterUser(userRepository)
        const loginUser = new LoginUser(userRepository);

        await registerUser.execute({
                nickname: 'Hawks',
                email: 'linnyohan@gmail.com',
                password: 'passw@RD123'
        })

        const user = await loginUser.execute({
            email: 'linnyohan@gmail.com',
            password: 'passw@RD123'
        });

        expect(user).toBeDefined();
        expect(user.email.value).toBe('linnyohan@gmail.com');
    });

    it('should throw an error for non-existent user', async () => {
    const userRepository = MockUserRepository.getInstance();
    const loginUser = new LoginUser(userRepository);

    await expect(
        loginUser.execute({
            email: 'non.existent@example.com',
            password: 'passw@RD123',
        })
        ).rejects.toThrow('Invalid credentials');
    });

    it('should throw an error for incorrect password', async () => {
    const userRepository = MockUserRepository.getInstance();
    const registerUser = new RegisterUser(userRepository);
    const loginUser = new LoginUser(userRepository);

    await registerUser.execute({
        nickname: 'Hawks',
        email: 'linnyohan@gmail.com',
        password: 'passw@RD123'
        });

        await expect(
        loginUser.execute({
            email: 'linnyohan@gmail.com',
            password: 'wrongpassword',
        })
        ).rejects.toThrow('Invalid credentials');
    });
})