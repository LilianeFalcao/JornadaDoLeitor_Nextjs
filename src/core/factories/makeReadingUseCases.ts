import { IReadingsRepository } from "../domain/repositories/IReadingsRepository";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IMangasRepository } from "../domain/repositories/IMangasRepository";

import { AddReading } from "../domain/use-cases/AddReading";
import { DeleteReading } from "../domain/use-cases/DeleteReading";

import { MockReadingsRepository } from "../infra/mocks/MockReadingsRepository";
import { MockUserRepository } from "../infra/mocks/MockUserRepository";
import { MockMangasRepository } from "../infra/mocks/MockMangasRepository";
import { ListUserReading } from "../domain/use-cases/ListUserReading";
import { ListReadingByStatus } from "../domain/use-cases/ListReadingByStatus";

export function makeReadingUseCases() {
    const readingsRepository: IReadingsRepository = MockReadingsRepository.getInstance();
    const userRepository: IUserRepository = MockUserRepository.getInstance();
    const mangaRepository: IMangasRepository = MockMangasRepository.getInstance();

    const addReading = new AddReading(
        readingsRepository,
        userRepository,
        mangaRepository,
    );

    const deleteReading = new DeleteReading(readingsRepository);
    const listUserReading = new ListUserReading(readingsRepository);
    const listReadingByStatus = new ListReadingByStatus(readingsRepository)

    return {
        addReading,
        deleteReading,
        listUserReading,
        listReadingByStatus
    };
}
