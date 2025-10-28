import { IReadingsRepository } from "../domain/repositories/IReadingsRepository";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IMangasRepository } from "../domain/repositories/IMangasRepository";

import { AddReading } from "../domain/use-cases/AddReading";
import { DeleteReading } from "../domain/use-cases/DeleteReading";

import { MockReadingsRepository } from "../infra/mocks/MockReadingsRepository";
import { MockUserRepository } from "../infra/mocks/MockUserRepository";
import { MockMangasRepository } from "../infra/mocks/MockMangasRepository";

export function makeReadingUseCases() {
    const readingsRepository: IReadingsRepository = MockReadingsRepository.getInstance();
    const userRepository: IUserRepository = MockUserRepository.getInstance();
    const mangaRepository: IMangasRepository = MockMangasRepository.getInstance();

    const addReading = new AddReading(
        readingsRepository,
        userRepository,
<<<<<<< HEAD
        mangaRepository,
=======
        mangaRepository
>>>>>>> 55a7e8956e83ca4fef89d7bec2cbce7faed2f279
    );

    const deleteReading = new DeleteReading(readingsRepository);


    return {
        addReading,
        deleteReading,
    };
}
