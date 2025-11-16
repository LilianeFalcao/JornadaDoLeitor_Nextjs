import { render, screen } from "@testing-library/react";
import Home from "@/app/(public)/page";
import { makeReadingUseCases } from "@/core/factories/makeReadingUseCases";
import { makeMangaUseCases } from "@/core/factories/makeMangaUseCases";

// Mock next/image (ESM)
jest.mock("next/image", () => {
  return function MockedImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return <img {...props} />;
  };
});

// Mocks dos use cases
jest.mock("@/core/factories/makeReadingUseCases");
jest.mock("@/core/factories/makeMangaUseCases");

describe("Home Page", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renderiza mensagem quando não há leituras", async () => {
    (makeReadingUseCases as jest.Mock).mockReturnValue({
      listUserReading: { execute: jest.fn().mockResolvedValue([]) },
    });

    (makeMangaUseCases as jest.Mock).mockReturnValue({
      findAll: { execute: jest.fn().mockResolvedValue([]) },
    });

    render(await Home());

    expect(
      screen.getByText("Nenhuma leitura encontrada.")
    ).toBeInTheDocument();
  });
});
