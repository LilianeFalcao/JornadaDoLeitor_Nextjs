import { render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "@/components/Header";
import React from "react";

// mocks simples e curtos
jest.mock("next/image", () => {
  return function MockedImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return <img {...props} />;
  };
});

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    user: null,
    logout: jest.fn(),
  }),
}));

jest.mock("@/components/AddMangaModal/AddMangaModal", () => ({
  AddMangaModal: () => <button>Adicionar Progresso</button>,
}));

{/*Testando mudança no Header com user autenticado */}
jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    user: null,
    logout: jest.fn(),
  }),
}));

describe("Header component", () => {
  it("Should render Login when user is not authenticated", () => {
    render(<Header />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});

jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    user: { nickname: { value: "Hawks" } },
    logout: jest.fn(),
  }),
}));

describe("Header component autenticado", () => {
  it("should show username when authenticated", () => {
    render(<Header />);

    expect(screen.getByText("Olá, Hawks")).toBeInTheDocument();
  });
});