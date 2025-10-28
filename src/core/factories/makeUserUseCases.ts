import { IUserRepository } from "../domain/repositories/IUserRepository";
import { DeleteUser } from "../domain/use-cases/DeleteUser";
import { FindUser } from "../domain/use-cases/FindUser";
import { FindUserByEmail } from "../domain/use-cases/FindUserByEmail";
import { LoginUser } from "../domain/use-cases/LoginUser";
import { RegisterUser } from "../domain/use-cases/RegisterUser";
import { UpdateUser } from "../domain/use-cases/UpdateUser";
import { MockUserRepository } from "../infra/mocks/MockUserRepository";

export function makeUserUseCases() {
    const userRepository: IUserRepository = MockUserRepository.getInstance();

    const registerUser = new RegisterUser(userRepository)
    const loginUser = new LoginUser(userRepository)
    const updateUser = new UpdateUser(userRepository)
    const deleteUser = new DeleteUser(userRepository)
<<<<<<< HEAD
    const findUser = new FindUser(userRepository)
    const findByEmail = new FindUserByEmail(userRepository)
=======
    const findByEmail = new FindUserByEmail(userRepository)
    const findUser = new FindUser(userRepository)
>>>>>>> 55a7e8956e83ca4fef89d7bec2cbce7faed2f279

    return{
        registerUser,
        loginUser,
        updateUser,
        deleteUser,
<<<<<<< HEAD
        findUser,
        findByEmail
=======
        findByEmail,
        findUser
>>>>>>> 55a7e8956e83ca4fef89d7bec2cbce7faed2f279
    }
}