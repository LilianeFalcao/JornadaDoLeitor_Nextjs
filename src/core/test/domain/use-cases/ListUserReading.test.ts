import { ListUserReading } from "../../../domain/use-cases/ListUserReading";
import { MockReadingsRepository } from "../../../infra/mocks/MockReadingsRepository";
import { Readings, Reading_Status } from "../../../domain/entity/Readings";

describe("ListUserReading Use Case", () => {
  let repository: MockReadingsRepository;
  let listUserReading: ListUserReading;

  beforeEach(() => {
    repository = MockReadingsRepository.getInstance();
    repository.clear(); // importante para resetar o estado entre testes
    listUserReading = new ListUserReading(repository);
  });

  it("should list readings for the user", async () => {
    const reading1 = Readings.create(
      "1",
      "user_1",
      "manga_1",
      new Date(),
      10,
      20,
      Reading_Status.READING,
      "Boa leitura"
    );

    const reading2 = Readings.create(
      "2",
      "user_1",
      "manga_2",
      new Date(),
      50,
      100,
      Reading_Status.READING,
      "Excelente até agora"
    );

    await repository.save(reading1);
    await repository.save(reading2);

    const result = await listUserReading.execute({ id_user: "user_1" });

    expect(result).toHaveLength(2);
    expect(result[0].id_user).toBe("user_1");
    expect(result[1].id_user).toBe("user_1");
  });

  it("should throw if no readings exist for this user (empty array)", async () => {
    // nenhum save → findByUserId() retorna []
    await expect(
      listUserReading.execute({ id_user: "usuario_inexistente" })
    ).rejects.toThrow("No readings found for this user");
  });
});
