import { render, screen,  fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { AddMangaModal } from "@/components/AddMangaModal/AddMangaModal";

// mock do next/image (Jest não suporta)
jest.mock("next/image", () => {
  return function MockedImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return <img {...props} />;
  };
});

// mock do contexto de auth
jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    user: { id: "user-1", nickname: { value: "Hawks" } },
  }),
}));

jest.mock("@/core/factories/makeMangaUseCases", () => ({
  makeMangaUseCases: () => ({
    findAll: {
      execute: jest.fn().mockResolvedValue([
        { 
          id: "manga-4",
          img_URL:"https://imgs.search.brave.com/1yt4EHx9fAln-hJ-yFhYwY2_3kUY9a-WjQTBZOcT2ok/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvcHQvdGh1bWIv/OS85Zi9GdWxsbWV0/YWxfQWxjaGVtaXN0/LmpwZy81MTJweC1G/dWxsbWV0YWxfQWxj/aGVtaXN0LmpwZw",
          title: "Fullmetal Alchemist",
          author_name: "Hiromu Arakawa",
          gender: "Shonen",
          total_chapters: 108,
        },
      ]),
    },
  }),
}));

describe("Add Manga modal component", () => {
    it("must open the modal and render the list of manga", async () => {
        render(<AddMangaModal />);

        const openButton = screen.getByText("Adicionar Progresso");
        expect(openButton).toBeInTheDocument();
        
        fireEvent.click(openButton);

        expect(
        await screen.findByText("Adicionar Mangá à sua Lista")
        ).toBeInTheDocument();

        expect(
        screen.getByPlaceholderText("Buscar títulos ou autores...")
        ).toBeInTheDocument();

        await waitFor(() => {
        expect(screen.getByText("Fullmetal Alchemist")).toBeInTheDocument();
        expect(screen.getByText("Hiromu Arakawa")).toBeInTheDocument();
        expect(screen.getByText("108 chapters")).toBeInTheDocument();
        });
    });
})

it("filtra mangás pelo campo de busca", async () => {
  render(<AddMangaModal />);

  // abre modal
  fireEvent.click(screen.getByText("Adicionar Progresso"));

  await screen.findByText("Fullmetal Alchemist");

  const input = screen.getByPlaceholderText("Buscar títulos ou autores...");

  fireEvent.change(input, { target: { value: "Full" } });

  expect(screen.getByText("Fullmetal Alchemist")).toBeInTheDocument();
});


it("abre o AddReadingModal ao clicar no botão +", async () => {
  render(<AddMangaModal />);

  fireEvent.click(screen.getByText("Adicionar Progresso"));

  await screen.findByText("Fullmetal Alchemist");

  const addButton = screen.getByText("+");

  fireEvent.click(addButton);

  // o modal interno deve aparecer (se tiver título)
  expect(screen.getByText(/Adicionar leitura/i)).toBeInTheDocument();
});

it("fecha o AddReadingModal ao chamar onClose", async () => {
  render(<AddMangaModal />);

  fireEvent.click(screen.getByText("Adicionar Progresso"));

  await screen.findByText("Fullmetal Alchemist");

  fireEvent.click(screen.getByText("+"));

  const closeButton = screen.getByText(/cancelar/i);

  fireEvent.click(closeButton);

  expect(closeButton).not.toBeInTheDocument();
});
